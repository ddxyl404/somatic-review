# Somatic / Review

使用单细胞 RNA-seq 研究体细胞突变的算法文献调研。

站点风格：Swiss International Typographic Style（黑 / 纸白 / 信号红、1px 网格、左齐、无圆角）。

- GitHub Pages：[https://ddxyl404.github.io/somatic-review/](https://ddxyl404.github.io/somatic-review/)
- 仓库：[https://github.com/ddxyl404/somatic-review](https://github.com/ddxyl404/somatic-review)

本页回答四个问题：

1. 这类算法文章的结构是怎么样的
2. 它们如何与其他方法进行比较
3. 比较的是什么值
4. 从什么角度切入

十五篇文献每一篇都按同一组问题拆开，并附长文说明它在方法学线索里的位置。

---

## 问题

scDNA-seq 能看到每个细胞的突变，但贵、扩增误差大，并且拿不到同一细胞的转录组。scRNA-seq 已经是常规武器——如果能从中读出体细胞突变，就可以在同一批细胞上同时做基因型与表型。

代价是一套特有噪声：表达稀疏、等位基因脱落、RNA editing、胚系泄漏、文库批次、细胞类型污染。2019 年以来的算法文章，本质上都在给这张噪声表配过滤器，并证明过滤器之后仍能做生物学。

同一份 scRNA-seq 可以被写成四个任务。任务一变，基线、指标、金标准全部重选：

| 任务 | 在问什么 | 代表 | 比较语言 |
|---|---|---|---|
| 发现 | de novo 体细胞 SNV | SComatic, RESA, LongSom | Precision / F1 / F0.5 |
| 分型 | 把已知突变投到细胞 | SCmut, SCReadCounts | FPR、细胞覆盖 |
| 克隆 | 亚克隆树与归属 | DENDRO, BnpC | ARI / capture / purity |
| 过程 | 负荷、签名、CNA | SComatic 签名；Numbat | cosine、剖面一致性 |

点突变和拷贝数是两条平行线。本调研主线是 SNV 的文章结构与比较协议；CNA 作为必须写进调研的平行家族，不用 SNV 的 F1 去理解 CNA 的剖面。

---

## 文章怎么组织

方法论文几乎共用同一副骨架。差别在每一格填什么证据，以及有些文章故意留空。

| 节 | 写什么 |
|---|---|
| Title / Abstract | 问题 → 现有失败点 → 方法名 + 规模数字 → 一个分数 + 一个生物学能力 |
| Introduction | 体细胞突变为何重要 → scRNA 的噪声 → Gap |
| Figure 1 | BAM + 细胞类型 → 过滤阶梯 → 统计检验。每一步对应一种假阳性 |
| Results A | Spike-in / 模拟，证明过滤器按设计工作 |
| Results B | 配对 WES/WGS ∩ RNA 可覆盖位点，报 sensitivity / precision / F1 |
| Results C | 突变谱 cosine、COSMIC 签名、驱动突变、负荷 |
| Results D | 以前做不到的事（分化细胞、耐药、长读融合） |
| Discussion | 立刻写限制：表达区域、深度、细胞类型错误、germline 泄漏 |
| Methods | 基线版本、最小 alt 支持、callable 定义、bootstrap |

同一骨架的六种填法：

- **SComatic** 九格几乎填满，所以成为短读锚点。
- **RESA** 的 spike-in 与 F0.5 特别完整；当时还没有 SComatic 可对打。
- **DENDRO** 故意不上位点 F1，改报 ARI。
- **LongSom** 多两格：细胞类型重注释，以及同一细胞的长读/短读对照。
- **Liu 2019** 没有算法示意图，终点是菜单不是冠军。
- **食管调查** 不上新方法，整篇是对锚点的压力测试。

---

## 如何比较、比较什么值

比较是一套六步协议，不是「把别人的工具跑一遍」：

1. 选定任务
2. 构造金标准（主流：配对 WES/WGS ∩ RNA callable；LongSom 升到 scWGS；批判文章改用跨样本共享）
3. 对齐输入契约（同一 BAM、同一最小 alt 支持）
4. 分层报告（reads、VAF、外显子/内含子、短读/长读）
5. 统计与消融
6. 生物学第二裁判（签名、驱动突变、克隆）

漏掉任何一层，F1 都不可引用。基线还要分代：2019 对 GATK，2024 对 SComatic，2025 对 SComatic + 模态。

| 指标 | 在说什么 | 典型使用者 |
|---|---|---|
| Sensitivity / Recall | 金标准里召回多少；必须限制在 RNA 可覆盖位点 | Liu, SComatic, RESA, LongSom |
| Precision | 报出来的有多少为真。scRNA 的主战场 | SComatic, RESA, LongSom |
| F1 | 两边都要。SComatic 0.6–0.7 vs 第二名 0.2–0.4 | SComatic, LongSom |
| F0.5 | 假阳性比假阴性更不可接受 | RESA |
| FDR / FPR | 没有完整金标准时更自然 | Liu, SCmut |
| Cosine of spectra | 统计上对，生物学上也必须像突变 | SComatic |
| Genotyping accuracy | 胚系分型，不是体细胞 F1 | Monopogen |
| ARI / capture / purity | 比较的是细胞分区，不是位点 | DENDRO |
| Call overlap / Venn | 低重叠本身就是结果 | LongSom |
| Cross-sample sharing | germline 泄漏或批次伪差 | Esophagus 2026 |

跨论文数字**不是一次联合重跑**。SComatic 的精度来自原文 Fig. 3；LongSom 的分母已经换成 scWGS 可覆盖位点。

---

## 从什么角度切入

1. **问题改写** — SCmut 做细胞分型，DENDRO 做克隆树，SComatic/RESA 做 de novo
2. **精度 vs 敏感度** — bulk caller 敏感度可以很高，精度可以低到 0.06
3. **金标准的构造** — callable 定义必须写进 Methods
4. **噪声本体** — 多态 / editing / 比对 / 批次 / 细胞类型，一类一个过滤器
5. **聚合尺度** — 细胞类型（SComatic）vs 跨细胞复发（RESA）vs LD（Monopogen）
6. **生物学第二裁判** — 签名、BRAF V600E、负荷、克隆
7. **输入契约** — 是否需要配对 DNA 是第一分类轴
8. **模态跃迁** — 短读 → 长读的方法差距有时小于模态差距（7.3 倍位点差）

普通方法论文选一条主切入、一条第二裁判就够。把八条写成购物清单，每一条的证据都会不够。

---

## 文献线索（2019–2026）

| 年 | 工具 / 文章 | 期刊 | 一句话 |
|---|---|---|---|
| 2019 | Liu et al. 基准 | Genome Biology | 七个 bulk caller 打在 scRNA 上；条件化推荐 |
| 2019 | SCmut | Bioinformatics | 已知突变的细胞分型；2D local FDR |
| 2019 | RNA-MuTect | Science | bulk RNA 前体：editing / germline / ASE 必须切开 |
| 2020 | DENDRO | Genome Biology | 任务改成克隆树；ARI 取代 F1 |
| 2021 | SCReadCounts | BMC Genomics | 细胞×位点计数矩阵；不是 caller |
| 2021 | cellsnp-lite | Bioinformatics | pileup 基础设施；mode 2 会混入体细胞与 editing |
| 2022 | Xu et al. 综述 | Front. Genet. | 能力表：模态 × 是否需要配对对照 |
| 2022 | scAllele | Sci. Adv. | SNV/indel + 等位基因特异性剪接 |
| 2022 | Numbat | Nat. Biotech. | 单倍型感知 CNA；SComatic 自己也用它做克隆对照 |
| 2023 | RESA | Genome Med. | de novo；precision 0.75–0.87；主报 F0.5 |
| 2024 | **SComatic** | Nat. Biotech. | 当前短读锚点；F1 0.6–0.7；precision 0.67–0.87 |
| 2024 | Monopogen | Nat. Biotech. | LD 救胚系分型（95% 准确）；体细胞是打破 LD 的位点 |
| 2025 | LongSom | Genome Res. | 长读 + 细胞类型重注释；直接挑战 SComatic |
| 2025 | Nat Rev Cancer | NRC | 把 SComatic 假设写成可证伪清单 |
| 2026 | Esophagus survey | bioRxiv | 官方流程的压力测试：~30% 仍像 SNP |

### 代表数字（摘自原文）

- SComatic vs Strelka2：precision 0.67–0.87 vs 0.06–0.24；F1 0.6–0.7 vs 0.2–0.4
- RESA：spike-in 均精度 0.77；15 数据集 0.75
- LongSom vs SComatic（同一长读）：sensitivity 0.19–0.55 vs 0–0.13；短读只得到 114 个位点（约 1/7.3）
- Monopogen：胚系 100K–3M SNV，分型准确率 95%
- DENDRO：肾癌 ARI 约 0.932 vs 表达 0.489
- 食管调查：约 30% 与 dbSNP/gnomAD 重叠；额外过滤后约 70% 较可信

---

## 算法家族

| 家族 | 代表 | 比较语言 |
|---|---|---|
| Bulk caller 迁到 scRNA | SAMtools, Strelka2, GATK, VarScan2 | TPR / FDR；精度通常崩溃 |
| 已知突变细胞分型 | SCmut, SCReadCounts, cellsnp-lite | FPR；不能 de novo |
| scRNA de novo SNV | RESA, SComatic, LongSom, scAllele | Precision / F1 / F0.5 |
| 群体遗传 / LD | Monopogen | genotyping accuracy，不对打 F1 |
| 亚克隆树 | DENDRO, BnpC | ARI |
| 表达推断 CNA | inferCNV, CopyKAT, Numbat, CaSpER | 恶性/正常分类、WGS 剖面 |

CNA 独立基准的稳定结论：Numbat 多数任务总分第一；CopyKAT 在只有表达矩阵时更稳；inferCNV 擅长单平台亚克隆。

---

## 若要写下一篇

1. 先写 Table 1（模态、de novo、是否需 DNA、聚合尺度、主指标）
2. 基线要分代：2019 对 GATK，2024 对 SComatic，2025 对 SComatic + 模态
3. F1 不是唯一语言
4. Callable 必须写进 Methods
5. 给假阳性一张分类表并做消融
6. 必须有生物学第二裁判

常见误区：把中间件放进 caller 排行榜；引用跨论文 F1 而不对齐分母；只用配对 DNA、从不用正交对照；把细胞类型当作无误差输入；Discussion 不写适用边界；综述用一张 F1 表结束所有家族。

---

## 仓库结构

```
docs/                 GitHub Pages 静态站
  index.html          含全部长文与十五篇文献页（hash 路由）
  favicon.svg
src/data/
  corpus.ts           十五篇结构化语料、指标、协议、九格骨架
  essays.ts           每篇长文 + 四个问题的逐条回答
  survey.ts           首页长文：时间线、填法、漏层后果、误区
```

数字摘自公开论文；跨论文柱状图/表格为便于对照的代表性区间，不是一次联合重跑。
