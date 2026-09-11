export type PaperFigure = {
  src: string;
  label: string;
  caption: string;
  credit: string;
};

const gb = (short: string, year: string) =>
  `${short} · Genome Biology ${year} · CC BY 4.0`;
const bmc = (short: string, year: string) =>
  `${short} · BMC Genomics ${year} · CC BY 4.0`;
const gm = (short: string, year: string) =>
  `${short} · Genome Medicine ${year} · CC BY 4.0`;
const nbt = (short: string, year: string) =>
  `${short} · Nat Biotechnol ${year} · 原论文图`;
const sci = (short: string, year: string) =>
  `${short} · Science ${year} · PMC 作者稿`;
const sa = (short: string, year: string) =>
  `${short} · Sci Adv ${year} · CC BY-NC`;
const bioinf = (short: string, year: string) =>
  `${short} · Bioinformatics ${year} · 原论文图`;
const gr = (short: string, year: string) =>
  `${short} · Genome Res ${year} · 原论文图`;
const front = (short: string, year: string) =>
  `${short} · Front. Aging ${year} · CC BY 4.0`;
const brx = (short: string, year: string) =>
  `${short} · bioRxiv ${year} · CC BY`;

/** Map paper id → structure section n → figures shown in that chapter. */
export const FIGURES: Record<string, Record<string, PaperFigure[]>> = {
  liu2019: {
    "00": [
      {
        src: "/figures/liu2019/fig1.png",
        label: "Fig. 1",
        caption:
          "七个 bulk/RNA caller 被直接接到 scRNA-seq 上的流水线：同一份 BAM，默认参数为主实验。这是整篇基准的输入契约图——后面所有 TPR/FDR 都从这里出发。",
        credit: gb("Liu et al.", "2019"),
      },
    ],
    "01": [
      {
        src: "/figures/liu2019/fig2.png",
        label: "Fig. 2",
        caption:
          "模拟实验把 supporting reads 与 VAF 拆开：reads 从 2 到 ≥10，VAF 25/50/75%。看的是 TPR 与 FDR 两条曲线，而不是一个总分。SAMtools 在低 reads 最灵敏，FreeBayes 在高 VAF 才站得住。",
        credit: gb("Liu et al.", "2019"),
      },
    ],
    "02": [
      {
        src: "/figures/liu2019/fig5.png",
        label: "Fig. 5",
        caption:
          "两例结直肠癌真实 scRNA-seq（P1115 / P1116）：与配对 DNA 的位点交集、基因组区域分布。模拟里的排名在真实覆盖与表达偏差下被复现——也暴露内含子/高同一性区域的特异性问题。",
        credit: gb("Liu et al.", "2019"),
      },
    ],
    "03": [
      {
        src: "/figures/liu2019/fig4.png",
        label: "Fig. 4",
        caption:
          "GATK Best Practices 的 LOD 扫描：阈值一动，检出集合与假阳性一起移动。参数敏感性本身就是结果——所以这篇不宣布总冠军。",
        credit: gb("Liu et al.", "2019"),
      },
    ],
    "04": [
      {
        src: "/figures/liu2019/fig6.png",
        label: "Fig. 6",
        caption:
          "条件化推荐菜单：低覆盖用 SAMtools，读数充足用 Strelka2，高 VAF 用 FreeBayes。比较文章的终点不是排行榜，是使用说明书。",
        credit: gb("Liu et al.", "2019"),
      },
    ],
  },

  vu2019: {
    "00": [
      {
        src: "/figures/vu2019/fig2.jpg",
        label: "Fig. 2",
        caption:
          "把 Mutect、VarScan2、Monovar 直接打在 scRNA-seq 上：假阳性不可接受。这一张图完成「证伪现有工具」，后面才能正当化缩小问题定义。",
        credit: bioinf("Vu et al.", "2019"),
      },
    ],
    "01": [
      {
        src: "/figures/vu2019/fig1.jpg",
        label: "Fig. 1",
        caption:
          "SCmut 的两步：bulk 肿瘤/正常 DNA 先收集体细胞突变，再与单细胞 RNA SNV 联合，用二维 local FDR 判定哪些细胞携带该突变。任务从 de novo calling 改写成细胞分型。",
        credit: bioinf("Vu et al.", "2019"),
      },
    ],
    "02": [
      {
        src: "/figures/vu2019/fig3.jpg",
        label: "Fig. 3",
        caption:
          "乳腺癌等数据集上的 FPR 对照。主指标是假阳性率，不是敏感度——有配对 DNA 当先验时，这是统计闸门问题。",
        credit: bioinf("Vu et al.", "2019"),
      },
    ],
    "03": [
      {
        src: "/figures/vu2019/fig4.jpg",
        label: "Fig. 4",
        caption:
          "把通过 FDR 闸门的突变映射回单个细胞：克隆与表达表型开始能连在同一批细胞上。这是方法论文用应用节收尾的早期模板。",
        credit: bioinf("Vu et al.", "2019"),
      },
    ],
  },

  yizhak2019: {
    "00": [
      {
        src: "/figures/yizhak2019/fig1.jpg",
        label: "Fig. 1",
        caption:
          "GTEx 规模的正常组织突变计数：皮肤、食管、肺明显高于其他组织。生物学主张先于方法——RNA-seq 能看见宏观克隆扩增。",
        credit: sci("Yizhak et al.", "2019"),
      },
    ],
    "01": [
      {
        src: "/figures/yizhak2019/fig2.jpg",
        label: "Fig. 2",
        caption:
          "RNA-MuTect 的核心图：RNA 候选位点对照配对 DNA，切开 RNA editing、胚系多态与等位基因表达偏倚。后续 SComatic / RESA 的过滤清单几乎都从这里继承。",
        credit: sci("Yizhak et al.", "2019"),
      },
    ],
    "02": [
      {
        src: "/figures/yizhak2019/fig3.jpg",
        label: "Fig. 3",
        caption:
          "与 DNA 测序交叉验证，以及组织/年龄相关的突变负荷。金标准是配对 DNA，终点是克隆扩增，不是 caller 排名。",
        credit: sci("Yizhak et al.", "2019"),
      },
    ],
  },

  zhou2020: {
    "00": [
      {
        src: "/figures/zhou2020/fig1.png",
        label: "Fig. 1",
        caption:
          "DENDRO 把任务从「检出每个 SNV」改写成「用转录的点突变重建系统发育树」。评价指标从 F1 换成 ARI / capture / purity——问题改写本身就是论文。",
        credit: gb("Zhou et al.", "2020"),
      },
    ],
    "01": [
      {
        src: "/figures/zhou2020/fig2.png",
        label: "Fig. 2",
        caption:
          "Beta-Binomial 处理爆发式表达、dropout 与测序错误，计算细胞间遗传距离。统计噪声模型是方法卖点，不是又一套 pileup 阈值。",
        credit: gb("Zhou et al.", "2020"),
      },
    ],
    "02": [
      {
        src: "/figures/zhou2020/fig3.png",
        label: "Fig. 3",
        caption:
          "转移性肾细胞癌等有已知亚群标签的数据：遗传距离聚类 vs 纯表达聚类。看 ARI 与亚克隆纯度，而不是位点级 F1。",
        credit: gb("Zhou et al.", "2020"),
      },
    ],
    "03": [
      {
        src: "/figures/zhou2020/fig4.png",
        label: "Fig. 4",
        caption:
          "小鼠黑色素瘤免疫治疗：同一批细胞同时有突变谱与表达谱，才能把新抗原与治疗反应连起来。应用节决定这篇文章能发到 Genome Biology。",
        credit: gb("Zhou et al.", "2020"),
      },
    ],
  },

  prashant2021: {
    "00": [
      {
        src: "/figures/prashant2021/fig1.png",
        label: "Fig. 1",
        caption:
          "工具论文骨架：barcode BAM + 位点列表 → 细胞×位点的 ref/alt 计数与 VAFRNA 矩阵。不宣称自己是 somatic caller，矩阵是中间件。",
        credit: bmc("Prashant et al.", "2021"),
      },
    ],
    "01": [
      {
        src: "/figures/prashant2021/fig2.png",
        label: "Fig. 2",
        caption:
          "三种用法并排：已知体细胞/editing 的细胞表达、双等位基因的等位表达、无先验的 discovery。软件文章用案例而不是 F1 竞赛来说服人。",
        credit: bmc("Prashant et al.", "2021"),
      },
    ],
    "02": [
      {
        src: "/figures/prashant2021/fig3.png",
        label: "Fig. 3",
        caption:
          "7 个神经母细胞瘤、59,884 个细胞：COSMIC 位点在至少 4 个细胞中回收 450 个。合并 BAM calling 会漏掉只在少数细胞出现的位点。",
        credit: bmc("Prashant et al.", "2021"),
      },
    ],
  },

  qin2022: {
    "00": [
      {
        src: "/figures/qin2022/fig1.jpg",
        label: "Fig. 1",
        caption:
          "读段级 de Bruijn 图检出 SNV / 微 indel，再用 GLM 打分，并计算变异等位基因与剪接异构体的互信息。比较的是「变异 + 剪接连锁」，不只是体细胞 F1。",
        credit: sa("Qin et al.", "2022"),
      },
    ],
    "01": [
      {
        src: "/figures/qin2022/fig3.jpg",
        label: "Fig. 3",
        caption:
          "肺癌 Smart-seq2：部分变异–剪接连锁在癌细胞特异、富集癌症通路。切入可以是同一变异的功能读出，不一定是更高的 somatic F1。",
        credit: sa("Qin et al.", "2022"),
      },
    ],
  },

  gao2022: {
    "00": [
      {
        src: "/figures/gao2022/fig1.png",
        label: "Fig. 1",
        caption:
          "Numbat 联合模型：表达倍数 × BAF × 群体单倍型 × 亚克隆进化，迭代推断。SNV caller 的平行世界——从 scRNA 读的是体细胞 CNA。",
        credit: nbt("Gao et al.", "2022"),
      },
    ],
    "01": [
      {
        src: "/figures/gao2022/fig2.png",
        label: "Fig. 2",
        caption:
          "22 个肿瘤样本：与 WGS 拷贝数剖面并置，恶性/正常分类对比 CopyKAT。比较的是分类准确率与剖面一致性，不是 SNV F1。",
        credit: nbt("Gao et al.", "2022"),
      },
    ],
  },

  xu2022: {
    "00": [
      {
        src: "/figures/xu2022/fig1.jpg",
        label: "Fig. 1",
        caption:
          "综述最有用的结构决策：按 bulk DNA / scDNA / bulk RNA / scRNA 切分类学。能力矩阵比排行榜更适合 review——「是否需要配对对照」是第一分类轴。",
        credit: front("Huang & Lee", "2022"),
      },
    ],
  },

  zhang2023: {
    "01": [
      {
        src: "/figures/zhang2023/fig1.png",
        label: "Fig. 1",
        caption:
          "三阶段：双 pipeline 共识降比对偏差 → 跨细胞复发分成高可信突变 / 噪声 / 待判 → 联合逻辑回归扩大敏感度。精度优先的 de novo 框架。",
        credit: gm("Zhang et al.", "2023"),
      },
    ],
    "02": [
      {
        src: "/figures/zhang2023/fig3.png",
        label: "Fig. 3",
        caption:
          "人胰腺组织 in silico spike-in：先在可控假阳性下报 precision。三组织、十细胞系的误差条说明过滤器按设计工作——还不是真实性能宣称。",
        credit: gm("Zhang et al.", "2023"),
      },
    ],
    "03": [
      {
        src: "/figures/zhang2023/fig4.png",
        label: "Fig. 4",
        caption:
          "15 个细胞系 scRNA-seq，WES 作金标准。箱线是 precision / sensitivity，散点是 F0.5——显式把权重偏向精度。RESA 在这一张上宣布领先。",
        credit: gm("Zhang et al.", "2023"),
      },
    ],
    "04": [
      {
        src: "/figures/zhang2023/fig6.png",
        label: "Fig. 6",
        caption:
          "黑色素瘤耐药时间序列：回收 BRAF V600E，追踪治疗时间点的突变–表达关系。应用节把 caller 变成可以讲肿瘤故事的工具。",
        credit: gm("Zhang et al.", "2023"),
      },
    ],
  },

  muyas2024: {
    "01": [
      {
        src: "/figures/muyas2024/fig1.png",
        label: "Fig. 1",
        caption:
          "SComatic 概览：按细胞类型堆 reads → 记录 alt 在细胞类型间的出现 → Beta-Binomial 相对背景噪声 → 去多态、去 editing、PoN、深度过滤。无需配对 DNA。",
        credit: nbt("Muyas et al.", "2024"),
      },
    ],
    "02": [
      {
        src: "/figures/muyas2024/fig2.png",
        label: "Fig. 2",
        caption:
          "cSCC 上皮细胞 vs 配对 WES：突变负荷相关、SBS7 UV 签名、谱 cosine、Venn。评估限制在 RNA 可覆盖位点。生物学一致性与 F1 同时出场。",
        credit: nbt("Muyas et al.", "2024"),
      },
    ],
    "03": [
      {
        src: "/figures/muyas2024/fig3.png",
        label: "Fig. 3",
        caption:
          "与 Strelka2、SAMtools、VarScan2、Monovar、SCReadCounts 对打。精度 0.67–0.87 vs Strelka2 的 0.06–0.24；F1 0.6–0.7 vs 第二名 0.2–0.4。50 次 bootstrap + t 检验。",
        credit: nbt("Muyas et al.", "2024"),
      },
    ],
    "04": [
      {
        src: "/figures/muyas2024/fig4.png",
        label: "Fig. 4",
        caption:
          "结直肠 MSI/MSS/POLE：突变负荷与 TCGA WES 同量级，MMRd / POLE 签名可分解出来。第二裁判是「看起来像该类肿瘤的突变」。",
        credit: nbt("Muyas et al.", "2024"),
      },
    ],
    "05": [
      {
        src: "/figures/muyas2024/fig5.png",
        label: "Fig. 5",
        caption:
          "低负荷样本：MPN 造血干细胞、心肌、GTEx。以前做不到的分化细胞与多克隆组织——这是「无需配对 DNA」真正打开的应用。",
        credit: nbt("Muyas et al.", "2024"),
      },
    ],
  },

  dou2024: {
    "00": [
      {
        src: "/figures/dou2024/fig1.png",
        label: "Fig. 1",
        caption:
          "两个模块：胚系用 1KG 等面板的 LD 精炼（分型准确率 95%）；体细胞用 SVM 去低质量 + 细胞群体共分离。稀疏短读不是信息不足，是需要外部 LD。",
        credit: nbt("Dou et al.", "2024"),
      },
    ],
    "01": [
      {
        src: "/figures/dou2024/fig2.png",
        label: "Fig. 2",
        caption:
          "与配对 WGS 比 genotyping accuracy 与检出数量（100K–3M）。比较语言是「分型准确率 + 规模」，不是对 SComatic 的 F1 对打。",
        credit: nbt("Dou et al.", "2024"),
      },
    ],
    "02": [
      {
        src: "/figures/dou2024/fig3.png",
        label: "Fig. 3",
        caption:
          "体细胞模块：期望除亚群中改变的位点外，等位基因与邻近位点完美 LD。违反者即候选体细胞。体细胞是「打破 LD 的位点」。",
        credit: nbt("Dou et al.", "2024"),
      },
    ],
    "03": [
      {
        src: "/figures/dou2024/fig4.png",
        label: "Fig. 4",
        caption:
          "祖先推断、心肌代谢相关变异、图谱规模队列。同一年 Nat Biotech 的另一条路：证明单细胞数据里藏着可用的群体遗传信号。",
        credit: nbt("Dou et al.", "2024"),
      },
    ],
  },

  dondi2025: {
    "00": [
      {
        src: "/figures/dondi2025/fig1.jpg",
        label: "Fig. 1",
        caption:
          "LongSom 概览：BAM + 细胞类型 → 用突变谱重注释 → 调 SNV / mtSNV / 融合 / CNA → BnpC 重建克隆。把 SComatic 思路迁到长读长，并加上融合与拷贝数。",
        credit: gr("Dondi et al.", "2025"),
      },
    ],
    "01": [
      {
        src: "/figures/dondi2025/fig2.jpg",
        label: "Fig. 2",
        caption:
          "错误的细胞类型会让体细胞位点被当成胚系过滤。重注释可提升敏感度至 31%——细胞类型不是小预处理细节，是假阴性来源。",
        credit: gr("Dondi et al.", "2025"),
      },
    ],
    "02": [
      {
        src: "/figures/dondi2025/fig5.jpg",
        label: "Fig. 5",
        caption:
          "同一长读长数据上对打 SComatic：Venn、scWGS 支持、precision / sensitivity / F1。精度相近，敏感度显著更高。2025 年的比较已经从「对 GATK」升级到「对 SComatic」。",
        credit: gr("Dondi et al.", "2025"),
      },
    ],
    "03": [
      {
        src: "/figures/dondi2025/fig4.jpg",
        label: "Fig. 4",
        caption:
          "同一批细胞的短读 vs 长读：短读 SComatic 只得到约 1/7 的位点，交集极小。方法差距有时小于模态差距。",
        credit: gr("Dondi et al.", "2025"),
      },
    ],
    "04": [
      {
        src: "/figures/dondi2025/fig6.jpg",
        label: "Fig. 6",
        caption:
          "SNV + 融合定义的亚克隆有不同的预测治疗结局。金标准升级为 scWGS，克隆一致性成为第三种语言。",
        credit: gr("Dondi et al.", "2025"),
      },
    ],
  },

  esophagus2026: {
    "00": [
      {
        src: "/figures/esophagus2026/fig1.jpg",
        label: "Fig. 1",
        caption:
          "先按官方流程跑 SComatic，再用同窝小鼠做对照：跨文库共享的位点更像 SNP/伪差。批判文章的第一步是复现，不是另发明一个 caller。",
        credit: brx("Esophagus survey", "2026"),
      },
    ],
    "01": [
      {
        src: "/figures/esophagus2026/fig3.jpg",
        label: "Fig. 3",
        caption:
          "人类同一供体多活检：germline 应跨片段共享，体细胞应局限。过滤前后的共现热图是检测 germline 泄漏的廉价正交轴。",
        credit: brx("Esophagus survey", "2026"),
      },
    ],
    "02": [
      {
        src: "/figures/esophagus2026/fig2.jpg",
        label: "Fig. 2",
        caption:
          "跨测序 run 的位点交集很低；共享位点的支持读数与克隆大小也不同。约 30% 与 dbSNP / gnomAD 重叠——原论文 F1 可能高估。",
        credit: brx("Esophagus survey", "2026"),
      },
    ],
    "03": [
      {
        src: "/figures/esophagus2026/fig4.jpg",
        label: "Fig. 4",
        caption:
          "额外过滤后约 70% 可视为较可信体细胞；未知位点的克隆大小与基因结构类似已知体细胞。SComatic 仍是起点，但必须加跨样本对照。",
        credit: brx("Esophagus survey", "2026"),
      },
    ],
  },
};

export function figuresFor(paperId: string, sectionN: string): PaperFigure[] {
  return FIGURES[paperId]?.[sectionN] ?? [];
}

export function figureCount(paperId: string): number {
  const bag = FIGURES[paperId];
  if (!bag) return 0;
  return Object.values(bag).reduce((n, arr) => n + arr.length, 0);
}
