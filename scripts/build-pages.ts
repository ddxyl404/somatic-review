/**
 * Build a self-contained Swiss static site into docs/ for GitHub Pages.
 * Run: node --experimental-strip-types --no-warnings scripts/build-pages.ts
 */
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ANGLES,
  BENCHMARK_ROWS,
  CHART_F1,
  CNV_METHODS,
  FAMILIES,
  HOWTO,
  KIND_LABEL,
  METRICS,
  NOISE,
  PAPERS,
  PROTOCOL,
  STATS,
  STRUCTURE_TEMPLATE,
} from "../src/data/corpus.ts";
import { PAPER_ESSAYS } from "../src/data/essays.ts";
import {
  ANGLES_COPY,
  ATLAS_COPY,
  CORPUS_COPY,
  HERO,
  HOWTO_COPY,
  METRIC_TRAPS,
  METRICS_COPY,
  PITFALLS,
  PROBLEM_COPY,
  PROTOCOL_COPY,
  PROTOCOL_FAILS,
  STRUCTURE_COPY,
  STRUCTURE_FILLS,
  TIMELINE,
} from "../src/data/survey.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "docs");
mkdirSync(outDir, { recursive: true });

const DATA = {
  papers: PAPERS,
  essays: PAPER_ESSAYS,
  kindLabel: KIND_LABEL,
  metrics: METRICS,
  angles: ANGLES,
  structure: STRUCTURE_TEMPLATE,
  protocol: PROTOCOL,
  stats: STATS,
  noise: NOISE,
  families: FAMILIES,
  howto: HOWTO,
  cnv: CNV_METHODS,
  bench: BENCHMARK_ROWS,
  chart: CHART_F1,
  hero: HERO,
  problem: PROBLEM_COPY,
  corpus: CORPUS_COPY,
  timeline: TIMELINE,
  structureCopy: STRUCTURE_COPY,
  fills: STRUCTURE_FILLS,
  protocolCopy: PROTOCOL_COPY,
  fails: PROTOCOL_FAILS,
  metricsCopy: METRICS_COPY,
  traps: METRIC_TRAPS,
  anglesCopy: ANGLES_COPY,
  atlasCopy: ATLAS_COPY,
  howtoCopy: HOWTO_COPY,
  pitfalls: PITFALLS,
};

const json = JSON.stringify(DATA).replace(/</g, "\\u003c");

const html = `<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Somatic / Review</title>
<meta name="description" content="scRNA-seq 体细胞突变算法文献调研：文章结构、比较协议、指标与切入角度。"/>
<meta name="theme-color" content="#e30613"/>
<link rel="icon" href="./favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet"/>
<style>
:root{--bg:#f7f5f0;--paper:#fff;--ink:#111;--muted:#5a5a5a;--faint:#8a8a8a;--accent:#e30613;--wash:#eceae4}
*{box-sizing:border-box;border-radius:0}
html,body{margin:0;background:var(--bg);color:var(--ink);font-family:Inter,"Noto Sans SC",Helvetica,Arial,sans-serif}
button,a{cursor:pointer}
::selection{background:var(--accent);color:#fff}
.wrap{max-width:1280px;margin:0 auto}
.g{display:grid;grid-template-columns:repeat(12,1fr)}
header{position:sticky;top:0;z-index:40;background:var(--bg);border-bottom:1px solid var(--ink)}
header .brand{grid-column:span 12;display:flex;align-items:center;justify-content:space-between;min-height:48px;padding:12px 16px;border-bottom:1px solid var(--ink);font-family:"Inter Tight",sans-serif;font-size:13px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;color:var(--ink)}
header nav{grid-column:span 12;display:flex;overflow-x:auto}
header nav a{flex:0 0 auto;min-height:48px;display:flex;align-items:center;padding:12px;border-left:1px solid var(--ink);font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:var(--ink)}
header nav a:first-child{border-left:0}
header nav a:hover,header nav a:focus{background:var(--ink);color:var(--bg)}
h1,h2,h3{font-family:"Inter Tight",sans-serif;font-weight:600;letter-spacing:-.02em}
.slash{color:var(--accent)}
.hero-l{grid-column:span 12;padding:40px 16px;border-bottom:1px solid var(--ink)}
.kicker{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--accent)}
h1{margin:24px 0 0;font-size:clamp(2.4rem,7vw,5.6rem);line-height:.95}
.lede{margin-top:24px;max-width:36rem;font-size:1.125rem;line-height:1.5}
.sub{margin-top:16px;max-width:36rem;font-size:15px;line-height:1.65;color:var(--muted)}
.stats{grid-column:span 12;display:grid;grid-template-columns:1fr 1fr}
.stat{padding:24px 16px;border-bottom:1px solid var(--ink);border-right:1px solid var(--ink)}
.stats .stat:nth-child(2n){border-right:0}
.stat b{display:block;font-family:"Inter Tight",sans-serif;font-size:1.875rem}
.stat span{display:block;margin-top:8px;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
section{border-bottom:1px solid var(--ink)}
.sec-k{grid-column:span 12;padding:24px 16px;border-bottom:1px solid var(--ink)}
.sec-b{grid-column:span 12;padding:32px 16px}
.idx{font-family:"IBM Plex Mono",monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
.en{margin-top:12px;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
h2{margin:0;font-size:clamp(1.75rem,4vw,3rem);line-height:1.05}
.muted{color:var(--muted);line-height:1.65;font-size:15px;max-width:48rem}
.box{border:1px solid var(--ink);margin-top:32px}
.row{display:grid;grid-template-columns:repeat(12,1fr);border-bottom:1px solid var(--ink)}
.row:last-child{border-bottom:0}
.num{grid-column:span 3;padding:20px 16px;border-right:1px solid var(--ink);font-family:"Inter Tight",sans-serif;font-size:1.75rem;color:var(--accent)}
.body{grid-column:span 9;padding:20px 16px}
.filters{display:flex;flex-wrap:wrap;border:1px solid var(--ink);margin-top:24px}
.filters button{min-height:44px;border:0;border-right:1px solid var(--ink);background:var(--paper);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:12px 16px;color:var(--ink)}
.filters button.on{background:var(--ink);color:var(--bg)}
.paper{display:grid;grid-template-columns:repeat(12,1fr);border:1px solid var(--ink);border-top:0;text-decoration:none;color:inherit}
.paper:hover{background:var(--wash)}
.paper .y{grid-column:span 3;padding:20px 16px;border-right:1px solid var(--ink);font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
.paper .y em{display:block;margin-top:8px;color:var(--accent);font-style:normal}
.paper .t{grid-column:span 9;padding:20px 16px}
.paper h3{margin:0;font-size:1.15rem}
.cols{display:grid;grid-template-columns:1fr;border:1px solid var(--ink);margin-top:32px}
.cell{padding:20px 16px;border-bottom:1px solid var(--ink)}
.cell:last-child{border-bottom:0}
.mono{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
.small{font-size:13px;line-height:1.65;color:var(--muted);max-width:48rem}
.h3{font-family:"Inter Tight",sans-serif;font-size:1.5rem;margin:48px 0 8px}
table{width:100%;border-collapse:collapse;font-size:14px;margin-top:32px;border:1px solid var(--ink)}
th{background:var(--ink);color:var(--bg);font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:12px;text-align:left;border-right:1px solid rgba(255,255,255,.2)}
td{padding:12px;border-top:1px solid var(--ink);border-right:1px solid var(--ink);vertical-align:top}
.bars{margin-top:32px;border:1px solid var(--ink);padding:16px;background:var(--paper)}
.bar-row{display:grid;grid-template-columns:88px 1fr 40px;gap:8px;align-items:center;margin:8px 0;font-family:"IBM Plex Mono",monospace;font-size:11px}
.bar{height:10px;background:#111;position:relative}
.bar i{display:block;height:100%;background:var(--accent)}
footer{background:var(--ink);color:var(--bg)}
footer .a{grid-column:span 12;padding:40px 16px;border-bottom:1px solid rgba(255,255,255,.2)}
footer .b{grid-column:span 12;padding:40px 16px;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.7}
.btn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border:1px solid var(--ink);text-decoration:none;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin-right:8px;margin-top:8px}
.btn.solid{background:var(--ink);color:var(--bg)}
.btn.solid:hover{background:var(--accent)}
.chip{display:inline-block;border:1px solid var(--ink);padding:10px 14px;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin:0 -1px -1px 0}
.faint{color:var(--faint);font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
@media(min-width:768px){
header .brand{grid-column:span 4;border-bottom:0;border-right:1px solid var(--ink);padding:12px 24px}
header nav{grid-column:span 8}
.hero-l{grid-column:span 8;border-bottom:0;border-right:1px solid var(--ink);padding:80px 24px}
.stats{grid-column:span 4;grid-template-columns:1fr}
.stat{border-right:0;padding:24px 32px}
.sec-k{grid-column:span 3;border-bottom:0;border-right:1px solid var(--ink);padding:64px 24px}
.sec-b{grid-column:span 9;padding:64px 40px}
.num{grid-column:span 2;padding:20px 24px}
.body{grid-column:span 10;padding:20px 32px}
.paper .y{grid-column:span 2;padding:20px 24px}
.paper .t{grid-column:span 10;padding:20px 32px}
.cols-2{grid-template-columns:1fr 1fr}
.cols-2 .cell{border-right:1px solid var(--ink)}
.cols-2 .cell:nth-child(2n){border-right:0}
.cols-3{grid-template-columns:1fr 1fr 1fr}
.cols-3 .cell{border-right:1px solid var(--ink)}
.cols-3 .cell:nth-child(3n){border-right:0}
.cols-4{grid-template-columns:1fr 1fr 1fr 1fr}
.cols-4 .cell{border-right:1px solid var(--ink)}
.cols-4 .cell:nth-child(4n){border-right:0}
footer .a{grid-column:span 6;border-bottom:0;border-right:1px solid rgba(255,255,255,.2);padding:40px 24px}
footer .b{grid-column:span 6;padding:40px 40px}
}
</style>
</head>
<body>
<div id="app"></div>
<script src="./app.js?v=2"></script>
</body>
</html>
`;

const js = `const DATA = ${json};
const $ = (s) => document.querySelector(s);
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, function (c) {
    if (c === "&") return "&" + "amp;";
    if (c === "<") return "&" + "lt;";
    if (c === ">") return "&" + "gt;";
    if (c === '"') return "&" + "quot;";
    if (c === "'") return "&" + "#39;";
    return c;
  });
}
function header() {
  const nav = [
    ["#problem","01 问题"],["#corpus","02 文献"],["#structure","03 结构"],
    ["#protocol","04 比较"],["#metrics","05 指标"],["#angles","06 角度"],
    ["#atlas","07 算法"],["#howto","08 写法"]
  ].map(([h,l]) => \`<a href="\${h}">\${l}</a>\`).join("");
  return \`<header><div class="wrap g">
    <a class="brand" href="#">Somatic <span class="slash">/</span> Review</a>
    <nav aria-label="章节">\${nav}</nav>
  </div></header>\`;
}
function footer() {
  return \`<footer><div class="wrap g">
    <div class="a">
      <p style="font-family:'Inter Tight',sans-serif;font-size:1.5rem;margin:0">Somatic <span class="slash">/</span> Review</p>
      <p style="margin:16px 0 0;max-width:28rem;font-size:14px;line-height:1.65;opacity:.75">针对使用单细胞 RNA-seq 研究体细胞突变的算法文献调研。结构、比较协议、指标与切入角度整理自 2019–2026 年公开论文。每篇文献都按同一组四个问题拆开。</p>
    </div>
    <div class="b">
      <p>Grid is the argument.</p>
      <p>Helvetica lineage · Signal red · Flush left</p>
      <p style="margin-top:32px;opacity:.5">数字摘自原文；跨论文对照为代表性区间，不是一次联合重跑。</p>
    </div>
  </div></footer>\`;
}
function section(id, n, kicker, title, inner) {
  return \`<section id="\${id}"><div class="wrap g">
    <div class="sec-k"><div class="idx">\${n}</div><div class="en">\${kicker}</div></div>
    <div class="sec-b"><h2>\${title}</h2><div style="margin-top:32px">\${inner}</div></div>
  </div></section>\`;
}
function bars() {
  const max = 1;
  return \`<div class="bars">
    <p class="mono" style="margin:0 0 12px">代表性区间 · 非联合重跑</p>
    \${DATA.chart.map(r => \`<div class="bar-row"><span>\${esc(r.name)}</span><div class="bar"><i style="width:\${(r.f1/max)*100}%"></i></div><span>\${r.f1}</span></div>\`).join("")}
    <p class="faint" style="margin:16px 0 0;text-transform:none;letter-spacing:0;font-family:Inter,sans-serif;font-size:12px;line-height:1.6">SComatic 精度来自原文 Fig. 3。RESA 主报 F0.5，这里的 F1 为并排示意。LongSom 分母已换成 scWGS 可覆盖位点。</p>
  </div>\`;
}
let kind = "all";
function papersList() {
  const list = kind === "all" ? DATA.papers : DATA.papers.filter(p => p.kind === kind);
  const kinds = ["all","method","benchmark","review","critique","precursor"];
  const filters = kinds.map(k => \`<button data-k="\${k}" class="\${k===kind?"on":""}">\${k==="all"?"全部":DATA.kindLabel[k]}</button>\`).join("");
  const items = list.map(p => \`<a class="paper" href="#/p/\${p.id}">
    <div class="y">\${p.year}<em>\${esc(DATA.kindLabel[p.kind])}</em></div>
    <div class="t"><h3>\${p.tool ? esc(p.tool)+"  ·  " : ""}\${esc(p.titleZh)}</h3>
    <p class="small" style="margin:8px 0 0">\${esc(p.oneLiner)}</p>
    <p class="faint" style="margin:12px 0 0">\${esc(p.short)}  ·  \${esc(p.journal)}</p></div>
  </a>\`).join("");
  return \`<div class="filters">\${filters}</div>\${items}\`;
}
function home() {
  const P = DATA.problem;
  const tasks = P.tasks.map(x => \`<div class="cell"><p class="mono">\${x.n}</p><p style="font-family:'Inter Tight',sans-serif;font-size:1.5rem;margin:12px 0 0">\${esc(x.t)}</p><p style="margin:8px 0 0">\${esc(x.d)}</p><p class="small" style="margin:12px 0 0">\${esc(x.note)}</p></div>\`).join("");
  const timeline = DATA.timeline.map(r => \`<div class="row"><div class="num">\${esc(r.year)}</div><div class="body"><h3 style="margin:0">\${esc(r.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(r.body)}</p></div></div>\`).join("");
  const struct = DATA.structure.map(r => \`<div class="row"><div class="num">\${r.n}</div><div class="body"><h3 style="margin:0">\${esc(r.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(r.body)}</p></div></div>\`).join("");
  const fills = DATA.fills.map(r => \`<div class="row"><div class="num" style="font-size:1.1rem;color:var(--ink)">\${esc(r.paper)}</div><div class="body"><p class="small" style="margin:0">\${esc(r.fill)}</p></div></div>\`).join("");
  const proto = DATA.protocol.map(s => \`<div class="cell"><p class="mono">\${s.n}</p><h3 style="margin:12px 0 0">\${esc(s.title)}</h3><p class="small" style="margin:12px 0 0">\${esc(s.body)}</p></div>\`).join("");
  const fails = DATA.fails.map(r => \`<div class="row"><div class="num" style="font-size:1rem;color:var(--ink)"><p class="mono" style="margin:0">Skip</p>\${esc(r.skip)}</div><div class="body"><p class="small" style="margin:0">\${esc(r.fail)}</p></div></div>\`).join("");
  const metrics = DATA.metrics.map(m => \`<div class="row"><div class="num" style="font-size:1.05rem;color:var(--ink)">\${esc(m.name)}<p class="faint" style="margin:8px 0 0">\${esc(m.usedBy.join(" · "))}</p></div><div class="body"><p class="small" style="margin:0">\${esc(m.what)}</p></div></div>\`).join("");
  const traps = DATA.traps.map(t => \`<div class="cell"><h3 style="margin:0">\${esc(t.name)}</h3><p class="small" style="margin:8px 0 0">\${esc(t.trap)}</p></div>\`).join("");
  const angles = DATA.angles.map(a => \`<div class="cell"><p class="mono">\${a.n}  ·  \${esc(a.en)}</p><h3 style="margin:12px 0 0">\${esc(a.title)}</h3><p class="small" style="margin:12px 0 0">\${esc(a.body)}</p></div>\`).join("");
  const noise = DATA.noise.map(n => \`<div class="cell"><p class="mono">\${n.n}</p><h3 style="margin:8px 0 0">\${esc(n.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(n.filter)}</p><p class="faint" style="margin:12px 0 0">\${esc(n.papers)}</p></div>\`).join("");
  const fam = DATA.families.map(f => \`<div class="cell"><p class="mono">\${esc(f.job)}</p><h3 style="margin:8px 0 0">\${esc(f.title)}</h3><p style="font-family:'IBM Plex Mono',monospace;font-size:11px;margin:12px 0 0">\${esc(f.methods)}</p><p class="small" style="margin:12px 0 0">\${esc(f.verdict)}</p></div>\`).join("");
  const rows = DATA.bench.map(r => \`<tr><td>\${esc(r.method)}</td><td>\${esc(r.role)}</td><td>\${esc(r.precision)}</td><td>\${esc(r.sensitivity)}</td><td>\${esc(r.f1)}</td><td>\${esc(r.needsDna)}</td><td>\${esc(r.note)}</td></tr>\`).join("");
  const cnv = DATA.cnv.map(m => \`<div class="cell"><p class="mono">\${esc(m.year)}</p><h3 style="margin:8px 0 0">\${esc(m.name)}</h3><p class="small" style="margin:8px 0 0">\${esc(m.idea)}</p><p class="faint" style="margin:12px 0 0">胜 · \${esc(m.win)}</p><p class="faint">限 · \${esc(m.lose)}</p></div>\`).join("");
  const howto = DATA.howto.map(h => \`<div class="row"><div class="num">\${h.n}</div><div class="body"><h3 style="margin:0">\${esc(h.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(h.body)}</p></div></div>\`).join("");
  const pits = DATA.pitfalls.map(p => \`<div class="row"><div class="num">\${p.n}</div><div class="body"><h3 style="margin:0">\${esc(p.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(p.body)}</p></div></div>\`).join("");
  const stats = DATA.stats.map(s => \`<div class="stat"><b>\${esc(s.k)}</b><span>\${esc(s.v)}</span></div>\`).join("");
  return \`
  \${header()}
  <section><div class="wrap g">
    <div class="hero-l">
      <p class="kicker">\${esc(DATA.hero.kicker)}</p>
      <h1>Somatic<span class="slash"> / </span>Review</h1>
      <p class="lede">\${esc(DATA.hero.lede)}</p>
      <p class="sub">\${esc(DATA.hero.sub)}</p>
    </div>
    <div class="stats">\${stats}</div>
  </div></section>
  \${section("problem","01","Scope","为什么要从 scRNA-seq 读体细胞突变",
    \`<div class="cols cols-2"><div class="cell">\${esc(P.left)}</div><div class="cell" style="color:var(--muted)">\${esc(P.right)}</div></div>
     <p class="muted" style="margin-top:32px">\${esc(P.extra)}</p>
     <div class="cols cols-4">\${tasks}</div>\`)}
  \${section("corpus","02","Corpus","十五篇构成这条方法学线索",
    \`<p class="muted">\${esc(DATA.corpus.intro)}</p>
     <p class="muted" style="margin-top:16px">\${esc(DATA.corpus.howToRead)}</p>
     <div class="box">\${timeline}</div>
     <div id="papers">\${papersList()}</div>\`)}
  \${section("structure","03","Form","算法文章几乎共用同一副骨架",
    \`<p class="muted">\${esc(DATA.structureCopy.intro)}</p>
     <p class="muted" style="margin-top:16px">\${esc(DATA.structureCopy.extra)}</p>
     <div class="box">\${struct}</div>
     <h3 class="h3">同一骨架，六种填法</h3>
     <p class="small">九格不是每篇都填满。看一篇文章，先看它留空了哪一格——那一格通常就是它的方法论立场。</p>
     <div class="box">\${fills}</div>\`)}
  \${section("protocol","04","Protocol","他们如何与其他方法比较",
    \`<p class="muted">\${esc(DATA.protocolCopy.intro)}</p>
     <p class="muted" style="margin-top:16px">\${esc(DATA.protocolCopy.extra)}</p>
     <div class="cols cols-3">\${proto}</div>
     <h3 class="h3">漏掉一层，数字就不可引用</h3>
     <div class="box">\${fails}</div>
     \${bars()}\`)}
  \${section("metrics","05","Values","比较的是哪些值",
    \`<p class="muted">\${esc(DATA.metricsCopy.intro)}</p>
     <p class="muted" style="margin-top:16px">\${esc(DATA.metricsCopy.extra)}</p>
     <div class="box">\${metrics}</div>
     <h3 class="h3">数字会藏什么</h3>
     <div class="cols cols-2">\${traps}</div>\`)}
  \${section("angles","06","Angles","从什么角度切入",
    \`<p class="muted">\${esc(DATA.anglesCopy.intro)}</p>
     <p class="muted" style="margin-top:16px">\${esc(DATA.anglesCopy.extra)}</p>
     <div class="cols cols-2">\${angles}</div>
     <h3 class="h3">假阳性分类表</h3>
     <p class="small">高质量论文先给噪声本体，再为每一类设过滤器。</p>
     <div class="cols cols-3">\${noise}</div>\`)}
  \${section("atlas","07","Atlas","算法家族与对照表",
    \`<p class="muted">\${esc(DATA.atlasCopy.intro)}</p>
     <div class="cols cols-2">\${fam}</div>
     <div style="overflow-x:auto"><table><thead><tr><th>方法</th><th>角色</th><th>Precision</th><th>Sensitivity</th><th>F1</th><th>配对 DNA</th><th>笔记</th></tr></thead><tbody>\${rows}</tbody></table></div>
     <h3 class="h3">平行家族：从表达读体细胞 CNA</h3>
     <p class="small">\${esc(DATA.atlasCopy.cnv)}</p>
     <div class="cols cols-3">\${cnv}</div>\`)}
  \${section("howto","08","Practice","如果你要写下一篇",
    \`<p class="muted">\${esc(DATA.howtoCopy.intro)}</p>
     <div class="box">\${howto}</div>
     <h3 class="h3">六条常见误区</h3>
     <div class="box">\${pits}</div>\`)}
  \${footer()}\`;
}
function paperPage(id) {
  const p = DATA.papers.find(x => x.id === id);
  if (!p) return header() + \`<main class="wrap" style="padding:80px 16px"><p class="mono">404</p><h1>文献未找到</h1><a class="btn" href="#">返回索引</a></main>\` + footer();
  const e = DATA.essays[id];
  const four = e ? [
    ["01","文章结构", e.four.structure],
    ["02","如何比较", e.four.compare],
    ["03","比较什么值", e.four.metrics],
    ["04","从何切入", e.four.angle],
  ].map(([n,t,b]) => \`<div class="row"><div class="num" style="font-size:1rem"><p class="mono" style="margin:0">\${n}</p>\${esc(t)}</div><div class="body"><p class="small" style="margin:0">\${esc(b)}</p></div></div>\`).join("") : "";
  const struct = p.structure.map(s => \`<div class="row"><div class="num">\${s.n}</div><div class="body"><h3 style="margin:0">\${esc(s.title)}</h3><p class="small" style="margin:8px 0 0">\${esc(s.note)}</p></div></div>\`).join("");
  const compared = p.comparedTo.map(c => \`<li style="margin:8px 0">\${esc(c)}</li>\`).join("");
  const datasets = p.datasets.map(d => \`<li style="margin:4px 0;color:var(--muted)">\${esc(d)}</li>\`).join("");
  const metrics = p.metricsUsed.map(m => \`<span class="chip">\${esc(m)}</span>\`).join("");
  const angles = p.angles.map((a,i) => \`<div class="row"><div class="num">\${String(i+1).padStart(2,"0")}</div><div class="body"><p class="small" style="margin:0">\${esc(a)}</p></div></div>\`).join("");
  const findings = p.keyFindings.map((f,i) => \`<div class="row"><div class="num">\${String(i+1).padStart(2,"0")}</div><div class="body"><p class="small" style="margin:0">\${esc(f)}</p></div></div>\`).join("");
  const nums = p.numbers.map(n => \`<div class="cell"><p style="font-family:'Inter Tight',sans-serif;font-size:1.5rem;margin:0">\${esc(n.value)}</p><p class="faint" style="margin:8px 0 0">\${esc(n.label)}</p></div>\`).join("");
  return \`
  \${header()}
  <section><div class="wrap g">
    <div class="sec-k">
      <a class="mono" href="#" style="text-decoration:none">← Index</a>
      <p class="en" style="margin-top:32px">\${p.year}</p>
      <p class="idx" style="margin-top:12px">\${esc(DATA.kindLabel[p.kind])}</p>
      \${p.tool ? \`<p style="font-family:'Inter Tight',sans-serif;font-size:2.2rem;margin:32px 0 0">\${esc(p.tool)}</p>\` : ""}
    </div>
    <div class="sec-b">
      <h2>\${esc(p.titleZh)}</h2>
      <p class="small" style="margin-top:20px">\${esc(p.title)}</p>
      <p class="faint" style="margin-top:20px">\${esc(p.short)}  ·  \${esc(p.journal)}</p>
      <p style="margin-top:28px;max-width:48rem;line-height:1.65;font-size:15px">\${esc(p.oneLiner)}</p>
      \${e ? \`<p class="muted" style="margin-top:20px">\${esc(e.essay)}</p>\` : ""}
      <div style="margin-top:24px">
        <a class="btn solid" href="https://doi.org/\${esc(p.doi)}" target="_blank" rel="noreferrer">DOI \${esc(p.doi)}</a>
        \${p.github ? \`<a class="btn" href="\${esc(p.github)}" target="_blank" rel="noreferrer">Code</a>\` : ""}
      </div>
    </div>
  </div></section>
  <section><div class="wrap g"><div class="sec-k"><p class="idx">Numbers</p></div><div class="sec-b"><div class="cols cols-3">\${nums}</div></div></div></section>
  \${e ? section("four","—","Four questions","这篇文章怎样回答四个问题",
    \`<p class="small" style="margin-bottom:24px">\${esc(e.readFor)}</p><div class="box">\${four}</div>\`) : ""}
  \${section("st","—","Structure","这篇文章怎么组织", \`<div class="box">\${struct}</div>\`)}
  \${section("cmp","—","Comparison","如何与其他方法比较",
    \`<p style="max-width:48rem;line-height:1.65;font-size:15px">\${esc(p.howTheyCompare)}</p>
     <div class="cols cols-2" style="margin-top:32px">
       <div class="cell"><p class="mono">Compared to</p><ul style="padding-left:18px">\${compared}</ul></div>
       <div class="cell"><p class="mono">Ground truth</p><p class="small">\${esc(p.groundTruth)}</p>
         <p class="mono" style="margin-top:24px">Datasets</p><ul style="padding-left:18px">\${datasets}</ul></div>
     </div>\`)}
  \${section("met","—","Metrics","比较什么值", \`<div>\${metrics}</div>\`)}
  \${section("ang","—","Angles","从什么角度切入", \`<div class="box">\${angles}</div>\`)}
  \${section("find","—","Findings","关键发现",
    \`<div class="box">\${findings}</div>
     <p style="margin-top:32px;max-width:48rem;line-height:1.65;border-top:1px solid var(--ink);padding-top:24px"><span class="mono">Takeaway  </span>\${esc(p.takeaway)}</p>\`)}
  \${footer()}\`;
}
function route() {
  const h = location.hash.replace(/^#/, "");
  const m = h.match(/^\\/p\\/([^/]+)/);
  document.getElementById("app").innerHTML = m ? paperPage(m[1]) : home();
  if (!m) {
    document.querySelectorAll(".filters button").forEach(btn => {
      btn.addEventListener("click", () => { kind = btn.getAttribute("data-k"); route(); const el = document.getElementById("corpus"); if (el) el.scrollIntoView({block:"start"}); });
    });
  }
  window.scrollTo(0,0);
}
window.addEventListener("hashchange", route);
route();
`;

writeFileSync(join(outDir, "index.html"), html, "utf8");
writeFileSync(join(outDir, "app.js"), js, "utf8");
writeFileSync(join(outDir, ".nojekyll"), "", "utf8");

const favSrc = join(root, "public", "favicon.svg");
if (existsSync(favSrc)) copyFileSync(favSrc, join(outDir, "favicon.svg"));

console.log("Wrote", join(outDir, "index.html"), "bytes", html.length);
console.log("Wrote", join(outDir, "app.js"), "bytes", js.length);
