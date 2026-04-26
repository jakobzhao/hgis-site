// Registry of Friday Harbor entries.
// Each entry is one .astro page under src/pages/friday-harbor/.
// Keep this list in reverse chronological order (newest first).
//
// Every reader-facing string is bilingual { en, zh }. The site renders
// both versions in the DOM and hides one via CSS, switched by a toggle.

export type Bi = { en: string; zh: string };

export type Technique =
  | "chokepoint"
  | "anti-map"
  | "isochrone"
  | "cartogram"
  | "palimpsest"
  | "projection-critique"
  | "border-watch"
  | "field-note";

export const TECH_LABELS: Record<Technique, Bi> = {
  "chokepoint":          { en: "chokepoint",          zh: "咽喉" },
  "anti-map":            { en: "anti-map",            zh: "反图" },
  "isochrone":           { en: "isochrone",           zh: "等时线" },
  "cartogram":           { en: "cartogram",           zh: "变形图" },
  "palimpsest":          { en: "palimpsest",          zh: "重写本" },
  "projection-critique": { en: "projection critique", zh: "投影批评" },
  "border-watch":        { en: "border watch",        zh: "边界观察" },
  "field-note":          { en: "field note",          zh: "田野札记" },
};

export type Kind = "news-led" | "cartographer-led" | "anti-map";
export const KIND_LABELS: Record<Kind, Bi> = {
  "news-led":         { en: "news · led",         zh: "新闻型" },
  "cartographer-led": { en: "cartographer · led", zh: "制图型" },
  "anti-map":         { en: "anti-map",           zh: "反图" },
};

export type Entry = {
  slug: string;
  date: string;
  title: Bi;
  subtitle: Bi;
  place: Bi;
  techniques: Technique[];
  kind: Kind;
  author: string;
};

export const entries: Entry[] = [
  {
    slug: "2026-04-25-eye-of-the-needle",
    date: "2026-04-25",
    title: {
      en: "The Eye of the Needle",
      zh: "针眼",
    },
    subtitle: {
      en: "Roughly a fifth of the world's seaborne oil threads through a 39-kilometre channel. This week, two ships did not make it through.",
      zh: "全球大约五分之一的海运原油，每天挤过一道 39 公里宽的水道。这一周，有两艘船没能过去。",
    },
    place: {
      en: "Strait of Hormuz · 26.5° N, 56.5° E",
      zh: "霍尔木兹海峡 · 北纬 26.5°，东经 56.5°",
    },
    techniques: ["chokepoint", "field-note"],
    kind: "news-led",
    author: "Bo Zhao",
  },
];

export const UI: Record<string, Bi> = {
  rubric:     { en: "Friday Harbor",   zh: "周五港" },
  manifesto: {
    en:
      "Two pieces a week, written from a small port. Every entry is one map plus three things the headlines won't give you next to it: the choices that built the map, the data underneath, and a citation you can carry into a paper or a classroom. The harbor borrows its name from the field station the geographers have kept since 1904 — this is field work too.",
    zh:
      "每周两篇，写于一座小港。每一篇是一张地图——再加上头版不会顺带给你的三件事：制图时做了哪些选择、地图底下用的是什么数据、以及一段可以直接放进论文或课堂的引用。"
      + "港的名字借自地理学家从 1904 年守护至今的同名田野站——这里做的也是田野的事。",
  },
  notebook:    { en: "The notebook",        zh: "札记" },
  provenance:  { en: "The provenance",      zh: "出处" },
  howToCite:   { en: "How to cite",         zh: "引用格式" },
  back:        { en: "← back to the harbor", zh: "← 返回港口" },
  byline:      { en: "HGIS Lab",            zh: "HGIS 实验室" },
  shareEN:     { en: "Share",               zh: "Share" },
  shareZH:     { en: "分享",                zh: "分享" },
  shareCopy:   { en: "Copy link",           zh: "复制链接" },
  shareCopied: { en: "Link copied",         zh: "链接已复制" },
  shareWechat: { en: "WeChat",              zh: "微信" },
  shareWeibo:  { en: "Weibo",               zh: "微博" },
  shareXhs:    { en: "Xiaohongshu",         zh: "小红书" },
  shareEmail:  { en: "Email",               zh: "邮件" },
  wechatTip:   {
    en: "Scan with the WeChat camera. The page link is below.",
    zh: "用微信扫一扫。下方为页面链接。",
  },
  xhsTip:      {
    en: "Xiaohongshu has no web share — copy the link, then paste in the app.",
    zh: "小红书没有网页直接分享 —— 链接已复制，回到 App 内粘贴即可。",
  },
};
