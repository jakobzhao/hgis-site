#!/usr/bin/env node
// Revise Friday Harbor entry prose using OpenAI's chat completions API.
//
// Examples:
//   node scripts/revise-fh.mjs --file src/pages/friday-harbor/2026-04-24-1-23-million-eviction-filings.astro
//   node scripts/revise-fh.mjs --all
//   node scripts/revise-fh.mjs --file <path> --apply        # overwrite source
//   node scripts/revise-fh.mjs --file <path> --model gpt-5  # override model
//
// Default mode is DRY-RUN: revisions are written to *.revised.astro next to
// the source so you can `git diff --no-index` against the original. Pass
// --apply to overwrite. Reads OPENAI_API_KEY from environment or .env.

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FH_DIR = path.join(ROOT, 'src', 'pages', 'friday-harbor');
const STYLE_BRIEF_PATH = path.join(ROOT, 'scripts', 'revise-fh-style.md');

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (k) => args.includes(k);
const opt = (k, def = null) => {
  const i = args.indexOf(k);
  return i < 0 ? def : args[i + 1];
};
const FILE_FLAG = opt('--file');
const ALL = flag('--all');
const APPLY = flag('--apply');
const MODEL = opt('--model', process.env.OPENAI_MODEL || 'gpt-5');
// Reasoning models (gpt-5*, o1*, o3*) reject custom temperature. Default
// is "don't send"; pass --temperature 0.4 explicitly for legacy models.
const TEMP_RAW = opt('--temperature', null);
const TEMPERATURE = TEMP_RAW == null ? null : parseFloat(TEMP_RAW);

if (!FILE_FLAG && !ALL) {
  console.error('usage: --file <path> | --all  [--apply] [--model gpt-5] [--temperature 0.4]');
  process.exit(1);
}

// Load .env. Project-scoped values OVERRIDE shell env so a stale shell
// export can't shadow the key the user just set in this project.
try {
  const env = await fs.readFile(path.join(ROOT, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY not set. Add it to .env');
  process.exit(1);
}

const STYLE_BRIEF = await fs.readFile(STYLE_BRIEF_PATH, 'utf8');

// ---------------------------------------------------------------------------
// OpenAI call (raw fetch — no SDK dependency)
// ---------------------------------------------------------------------------
async function callOpenAI(messages) {
  const body = {
    model: MODEL,
    messages,
    response_format: { type: 'json_object' },
  };
  if (TEMPERATURE != null && Number.isFinite(TEMPERATURE)) body.temperature = TEMPERATURE;

  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`OpenAI ${r.status}: ${text.slice(0, 400)}`);
  }
  const data = await r.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('OpenAI returned no content');
  return content;
}

async function reviseBilingual(kind, enHtml, zhHtml) {
  const user = [
    `Block kind: ${kind}.`,
    'Rewrite the EN and ZH versions according to the style brief.',
    'Preserve every HTML tag exactly. Preserve every number, name, URL, citation.',
    'Output a JSON object: {"en": "<rewritten EN HTML>", "zh": "<rewritten ZH HTML>"}.',
    '',
    '----- EN INPUT -----',
    enHtml,
    '----- END EN INPUT -----',
    '',
    '----- ZH INPUT -----',
    zhHtml,
    '----- END ZH INPUT -----',
  ].join('\n');

  const raw = await callOpenAI([
    { role: 'system', content: STYLE_BRIEF },
    { role: 'user', content: user },
  ]);
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`LLM did not return JSON. First 200 chars: ${raw.slice(0, 200)}`);
  }
  if (typeof parsed.en !== 'string' || typeof parsed.zh !== 'string') {
    throw new Error('LLM JSON missing string fields {en, zh}');
  }
  return parsed;
}

// Split leading + trailing whitespace from a block. The model is bad at
// preserving boundary whitespace (it eats the newline right after `<tag>`
// and the indent before `</tag>`), so we slice it off, send only the
// meaningful inner content, and stitch the original padding back on.
function splitBoundaryWhitespace(s) {
  const lead = s.match(/^\s*/)[0];
  const trail = s.match(/\s*$/)[0];
  // Edge case: whole string is whitespace -> body becomes empty.
  const body = s.slice(lead.length, Math.max(lead.length, s.length - trail.length));
  return { lead, body, trail };
}

// ---------------------------------------------------------------------------
// Tag-structure sanity check — count opening tags, refuse if drift > 0.
// Catches the common failure: model accidentally drops or invents a <b>/<a>.
// ---------------------------------------------------------------------------
function tagSignature(html) {
  const counts = {};
  for (const m of html.matchAll(/<([a-zA-Z]+)(\s[^>]*)?>/g)) {
    counts[m[1]] = (counts[m[1]] || 0) + 1;
  }
  return counts;
}
function tagsMatch(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of keys) {
    if ((a[k] || 0) !== (b[k] || 0)) return { ok: false, tag: k, before: a[k] || 0, after: b[k] || 0 };
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Block locators
// ---------------------------------------------------------------------------
// `<figcaption data-lang="en">…</figcaption>` (no nested figcaptions in the
// codebase). Returns [{lang, full, inner, start, end}, …].
function findFigcaptions(src) {
  const re = /<figcaption\s+data-lang="(en|zh)">([\s\S]*?)<\/figcaption>/g;
  const out = [];
  for (const m of src.matchAll(re)) {
    out.push({
      lang: m[1], full: m[0], inner: m[2],
      start: m.index, end: m.index + m[0].length,
    });
  }
  return out;
}

// `<div slot="notebook-en">…</div>` — track div nesting just in case.
function findSlotDiv(src, slotName) {
  const open = `<div slot="${slotName}">`;
  const idx = src.indexOf(open);
  if (idx < 0) return null;
  let depth = 1;
  const re = /<(\/?)div\b[^>]*>/g;
  re.lastIndex = idx + open.length;
  let m;
  while ((m = re.exec(src))) {
    if (m[1] === '/') depth--; else depth++;
    if (depth === 0) {
      const innerStart = idx + open.length;
      const innerEnd = m.index;
      return {
        slot: slotName,
        full: src.slice(idx, m.index + m[0].length),
        inner: src.slice(innerStart, innerEnd),
        start: idx, end: m.index + m[0].length,
        innerStart, innerEnd,
      };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Per-file pipeline
// ---------------------------------------------------------------------------
async function processFile(filePath) {
  const src = await fs.readFile(filePath, 'utf8');
  let out = src;
  const log = [];

  // 1) figcaption pair
  const caps = findFigcaptions(out);
  const enCap = caps.find(c => c.lang === 'en');
  const zhCap = caps.find(c => c.lang === 'zh');
  if (enCap && zhCap) {
    log.push('  · figcaption (en+zh) →');
    const enWS = splitBoundaryWhitespace(enCap.inner);
    const zhWS = splitBoundaryWhitespace(zhCap.inner);
    let { en, zh } = await reviseBilingual('figcaption', enWS.body, zhWS.body);
    // The model often re-pads its output (adds leading indent to match the
    // first <p>, adds a trailing newline). Strip its boundary whitespace
    // and use the original padding instead.
    en = en.replace(/^\s+/, '').replace(/\s+$/, '');
    zh = zh.replace(/^\s+/, '').replace(/\s+$/, '');
    const enChk = tagsMatch(tagSignature(enWS.body), tagSignature(en));
    const zhChk = tagsMatch(tagSignature(zhWS.body), tagSignature(zh));
    if (!enChk.ok) log.push(`     ! EN tag drift on <${enChk.tag}>: ${enChk.before}→${enChk.after} (kept original)`);
    if (!zhChk.ok) log.push(`     ! ZH tag drift on <${zhChk.tag}>: ${zhChk.before}→${zhChk.after} (kept original)`);
    const newEnInner = enChk.ok ? `${enWS.lead}${en}${enWS.trail}` : enCap.inner;
    const newZhInner = zhChk.ok ? `${zhWS.lead}${zh}${zhWS.trail}` : zhCap.inner;
    const newEn = `<figcaption data-lang="en">${newEnInner}</figcaption>`;
    const newZh = `<figcaption data-lang="zh">${newZhInner}</figcaption>`;
    // Replace later one first to keep indices stable.
    if (enCap.start < zhCap.start) {
      out = out.slice(0, zhCap.start) + newZh + out.slice(zhCap.end);
      out = out.slice(0, enCap.start) + newEn + out.slice(enCap.end);
    } else {
      out = out.slice(0, enCap.start) + newEn + out.slice(enCap.end);
      out = out.slice(0, zhCap.start) + newZh + out.slice(zhCap.end);
    }
  } else {
    log.push('  · no figcaption pair, skipped');
  }

  // 2) notebook pair (locate fresh on the updated `out`)
  const enNb = findSlotDiv(out, 'notebook-en');
  const zhNb = findSlotDiv(out, 'notebook-zh');
  if (enNb && zhNb) {
    log.push('  · notebook (en+zh) →');
    const enWS = splitBoundaryWhitespace(enNb.inner);
    const zhWS = splitBoundaryWhitespace(zhNb.inner);
    let { en, zh } = await reviseBilingual('notebook', enWS.body, zhWS.body);
    en = en.replace(/^\s+/, '').replace(/\s+$/, '');
    zh = zh.replace(/^\s+/, '').replace(/\s+$/, '');
    const enChk = tagsMatch(tagSignature(enWS.body), tagSignature(en));
    const zhChk = tagsMatch(tagSignature(zhWS.body), tagSignature(zh));
    if (!enChk.ok) log.push(`     ! EN tag drift on <${enChk.tag}>: ${enChk.before}→${enChk.after} (kept original)`);
    if (!zhChk.ok) log.push(`     ! ZH tag drift on <${zhChk.tag}>: ${zhChk.before}→${zhChk.after} (kept original)`);
    const newEnInner = enChk.ok ? `${enWS.lead}${en}${enWS.trail}` : enNb.inner;
    const newZhInner = zhChk.ok ? `${zhWS.lead}${zh}${zhWS.trail}` : zhNb.inner;
    if (enNb.start < zhNb.start) {
      out = out.slice(0, zhNb.innerStart) + newZhInner + out.slice(zhNb.innerEnd);
      out = out.slice(0, enNb.innerStart) + newEnInner + out.slice(enNb.innerEnd);
    } else {
      out = out.slice(0, enNb.innerStart) + newEnInner + out.slice(enNb.innerEnd);
      out = out.slice(0, zhNb.innerStart) + newZhInner + out.slice(zhNb.innerEnd);
    }
  } else {
    log.push('  · no notebook pair, skipped');
  }

  const target = APPLY ? filePath : filePath.replace(/\.astro$/, '.revised.astro');
  await fs.writeFile(target, out);
  return { target, log, changed: out !== src };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
let files;
if (FILE_FLAG) {
  files = [path.resolve(FILE_FLAG)];
} else {
  const all = await fs.readdir(FH_DIR);
  files = all
    .filter(f => /^\d{4}-\d{2}-\d{2}-.+\.astro$/.test(f))
    .map(f => path.join(FH_DIR, f))
    .sort();
}

console.log(`model:       ${MODEL}`);
console.log(`temperature: ${TEMPERATURE == null ? '(model default)' : TEMPERATURE}`);
console.log(`mode:        ${APPLY ? 'APPLY (overwrites source)' : 'DRY-RUN (writes *.revised.astro)'}`);
console.log(`files (${files.length}):`);
for (const f of files) console.log(`  ${path.relative(ROOT, f)}`);
console.log('');

let okCount = 0, errCount = 0;
for (const f of files) {
  console.log(`> ${path.relative(ROOT, f)}`);
  try {
    const { target, log, changed } = await processFile(f);
    log.forEach(l => console.log(l));
    console.log(`  → ${changed ? 'wrote' : 'no change to'} ${path.relative(ROOT, target)}\n`);
    okCount++;
  } catch (err) {
    console.error(`  ! ${err.message}\n`);
    errCount++;
  }
}
console.log(`done. ${okCount} ok, ${errCount} error`);
