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

export type ThumbBox = {
  bbox: { west: number; east: number; south: number; north: number };
  pins?: { lon: number; lat: number }[];
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
  /** Optional: generates a live mini-map preview on the index card. */
  thumb?: ThumbBox;
  /** Optional readable BibTeX key. Falls back to {lastname}{year}{slug-first-word}. */
  citeKey?: string;
};

export const entries: Entry[] = [
  {
    slug: "2026-04-17-does-ai-know-your-city",
    date: "2026-04-17",
    title: {
      en: "Does the AI Really Know Your City?",
      zh: "AI 真的懂你的城市吗？",
    },
    subtitle: {
      en: "Asked to draw Seattle's neighborhoods from memory, GPT-5.5 Thinking returned a city twice the size, with a median IoU of zero. The right ocean — almost everything else wrong.",
      zh: "让 GPT-5.5 Thinking 凭记忆画出西雅图的邻里边界，它给出的城市面积是真实的两倍，同名邻里的 IoU 中位数等于零。海是对的，剩下的几乎全错了。",
    },
    place: {
      en: "Seattle, WA · Neighborhood Map Atlas vs. GPT-5.5 Thinking",
      zh: "西雅图 · 《邻里地图集》对照 GPT-5.5 Thinking",
    },
    techniques: ["anti-map", "palimpsest"],
    kind: "anti-map",
    author: "Bo Zhao",
    citeKey: "zhao2026memory",
    thumb: {
      bbox: { west: -122.46, east: -122.22, south: 47.49, north: 47.74 },
      pins: [
        { lon: -122.385, lat: 47.668 },   // Ballard
        { lon: -122.320, lat: 47.621 },   // Capitol Hill
        { lon: -122.336, lat: 47.605 },   // Downtown
      ],
    },
  },
  {
    slug: "2026-04-14-anacortes-to-friday-harbor",
    date: "2026-04-14",
    title: {
      en: "Anacortes — Friday Harbor",
      zh: "阿纳科蒂斯 — 周五港",
    },
    subtitle: {
      en: "The route the column is named for. Live ferry positions, thirty-three years of running, twelve percent of last year's sailings cancelled.",
      zh: "本栏目命名所自的那条航线。船位实时更新；这条线运行 33 年；去年航次中有约 12% 被取消。",
    },
    place: {
      en: "Salish Sea · Washington State Ferries",
      zh: "萨利什海 · 华盛顿州渡轮系统",
    },
    techniques: ["field-note"],
    kind: "cartographer-led",
    author: "Bo Zhao",
    citeKey: "zhao2026anacortes",
    thumb: {
      bbox: { west: -123.15, east: -122.45, south: 48.40, north: 48.75 },
      pins: [
        { lon: -123.012, lat: 48.535 },   // Friday Harbor
        { lon: -122.674, lat: 48.506 },   // Anacortes
      ],
    },
  },
  {
    slug: "2026-04-24-1-23-million-eviction-filings",
    date: "2026-04-24",
    title: {
      en: "1.23 Million Eviction Filings",
      zh: "123 万次驱逐",
    },
    subtitle: {
      en: "Last year's eviction filings, mapped by the city. The geography is not the geography of housing-market pressure — it is the geography of law.",
      zh: "去年全美的驱逐起诉，按城市标在地图上。这片分布不是租房市场压力的地理，而是法律的地理。",
    },
    place: {
      en: "United States · 41 cities tracked by the Eviction Lab",
      zh: "美国 · Eviction Lab 跟踪的 41 个城市",
    },
    techniques: ["cartogram", "field-note"],
    kind: "cartographer-led",
    author: "Bo Zhao",
    citeKey: "zhao2026evictions",
    thumb: {
      bbox: { west: -125, east: -66, south: 24, north: 50 },
      pins: [
        { lon: -84.39, lat: 33.75 },   // Atlanta
        { lon: -86.16, lat: 39.77 },   // Indianapolis
        { lon: -77.43, lat: 37.54 },   // Richmond
      ],
    },
  },
  {
    slug: "2026-04-21-where-the-cloud-touches-ground",
    date: "2026-04-21",
    title: {
      en: "Where the Cloud Touches Ground",
      zh: "云落在哪里",
    },
    subtitle: {
      en: "Every prompt typed into ChatGPT or Gemini takes a path through specific buildings on specific land. The cloud is geography. These are the dots.",
      zh: "你在 ChatGPT 或 Gemini 里敲下的每一句话，都要经过具体土地上的一栋具体建筑。「云」是一种地理事实。这些就是它落地的点。",
    },
    place: {
      en: "Continental United States · 11 hyperscaler clusters",
      zh: "美国本土 · 11 处超大规模数据中心集群",
    },
    techniques: ["cartogram", "field-note"],
    kind: "cartographer-led",
    author: "Bo Zhao",
    citeKey: "zhao2026cloud",
    thumb: {
      bbox: { west: -125, east: -66, south: 24, north: 50 },
      pins: [
        { lon: -77.55,  lat: 39.05 },   // Loudoun, VA
        { lon: -111.95, lat: 33.45 },   // Phoenix
        { lon: -96.80,  lat: 32.78 },   // Dallas
      ],
    },
  },
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
    citeKey: "zhao2026hormuz",
    thumb: {
      bbox: { west: 53.0, east: 58.4, south: 23.0, north: 27.4 },
      pins: [
        { lon: 56.20, lat: 26.40 },
        { lon: 56.55, lat: 26.55 },
      ],
    },
  },
];

export const UI: Record<string, Bi> = {
  rubric:     { en: "Friday Harbor",   zh: "周五港" },
  // Top of the index page — two paragraphs: a one-line statement of
  // what the column is and who edits it, then where the name comes from.
  manifestoTop: {
    en:
      "Friday Harbor is a column from the Humanistic GIS Laboratory, edited by Bo Zhao.\n\nThe name takes two layers. First, the University of Washington's marine field station on San Juan Island, north of Seattle. Second, and more to the point: the 1993 Friday Harbor meeting held there — the first sit-down between GIS scientists and critical social theorists, and the moment that opened the social turn in geographic information science. This column continues that conversation.",
    zh:
      "「周五港」是 HGIS 实验室的一个专栏，由赵博主编。\n\n名字承袭两层。一：华盛顿大学坐落于圣胡安岛上的同名海洋田野站。二，也更要紧：1993 年在那里召开的「周五港会议」——GIS 科学家与批判社会理论学者第一次正式坐到同一张桌前的对话，自此开启了地理信息科学的「社会转向」。这份札记，是那场对话的延续。",
  },
  // Footer of the index page — two paragraphs: the publication cadence
  // and the authorship / vibe-coding disclosure.
  manifestoBottom: {
    en:
      "The column updates roughly two to three times a week.\n\nEach article is selected, researched, and authored by Bo Zhao; vibe coding assists with editorial polishing and cartographic refinement, but the argument — and what the map is willing to claim — remains the cartographer's.",
    zh:
      "本专栏每周更新约两到三篇。\n\n每一篇均由赵博选题、调研与撰写，vibe coding 仅用于辅助文字润色与制图优化；每一篇的论点、以及一张地图愿意做出哪些主张，最终都归制图者。",
  },
  // Index toolbar: search + sort + collapse/expand
  searchPlaceholder: { en: "Search title, place, or theme…", zh: "搜索标题、地点或主题…" },
  sortLabel:         { en: "Sort",            zh: "排序" },
  sortNewest:        { en: "Newest first",    zh: "最新优先" },
  sortOldest:        { en: "Oldest first",    zh: "最早优先" },
  sortAZ:            { en: "A–Z by title",    zh: "按标题字母" },
  showAll:           { en: "Show all {n} articles", zh: "查看全部 {n} 篇" },
  showFewer:         { en: "Show fewer",      zh: "收起" },
  noMatches:         { en: "No articles match — try a shorter query.", zh: "没有匹配的文章——试试更短的关键词。" },
  matchCount:        { en: "{n} matching", zh: "{n} 篇匹配" },

  notebook:    { en: "The notebook",        zh: "札记" },
  endnote:     { en: "Endnote",             zh: "尾注" },
  howToCite:   { en: "How to cite",         zh: "引用格式" },
  citeCopy:    { en: "Copy",                zh: "复制" },
  citeCopied:  { en: "Copied",              zh: "已复制" },
  back:        { en: "← back to the harbor", zh: "← 返回港口" },
  byline:      { en: "HGIS Lab",            zh: "HGIS 实验室" },
  shareEN:     { en: "Share",               zh: "Share" },
  shareZH:     { en: "分享",                zh: "分享" },
  shareNative: { en: "Share…",              zh: "系统分享…" },
  shareCopy:   { en: "Copy link",           zh: "复制链接" },
  shareCopied: { en: "Link copied",         zh: "链接已复制" },
  shareBsky:   { en: "Bluesky",             zh: "Bluesky" },
  shareWechat: { en: "WeChat",              zh: "微信" },
  shareWeibo:  { en: "Weibo",               zh: "微博" },
  shareXhs:    { en: "Xiaohongshu",         zh: "小红书" },
  shareDouban: { en: "Douban",              zh: "豆瓣" },
  shareEmail:  { en: "Email",               zh: "邮件" },
  wechatTip:   {
    en: "Scan with the WeChat camera. The page link is below.",
    zh: "用微信扫一扫。下方为页面链接。",
  },
  wechatCopy:  { en: "Copy URL",            zh: "复制网址" },
  xhsTip:      {
    en: "Link copied — open Xiaohongshu and paste it.",
    zh: "链接已复制 —— 回到小红书 App 内粘贴即可。",
  },
};
