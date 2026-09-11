/** Per-paper long essays answering the four survey questions. */
export type FourQuestions = {
  structure: string;
  compare: string;
  metrics: string;
  angle: string;
};

export type PaperEssay = {
  essay: string;
  readFor: string;
  four: FourQuestions;
};

export const PAPER_ESSAYS: Record<string, PaperEssay> = {
  liu2019: {
    readFor: "比较文章的原型：模拟控变量 → 真实数据 → 参数扫描 → 按场景推荐，而不是宣布总冠军。",
    essay:
      "2019 年之前，人们把 bulk DNA / RNA 的 caller 直接接到 scRNA-seq 上，却几乎没有人系统问过：这些工具在单细胞覆盖、表达偏倚和等位基因脱落下还剩多少可信度。Liu 等人做的不是新算法，而是把七个当时常用的检测器（SAMtools、GATK Best Practices、CTAT、FreeBayes、MuTect2、Strelka2、VarScan2）放进同一份 BAM，用模拟数据把 supporting reads 与 VAF 拆开，再用真实 scRNA-seq 复现。它给出的不是排行榜，而是一张条件化菜单：低覆盖用 SAMtools，读数充足用 Strelka2，高 VAF 用 FreeBayes。后续几乎所有方法论文都把这篇当作「bulk caller 直接套用不够」的起点——SComatic 的基线选择、RESA 的精度叙事，都可以从这里读出来。",
    four: {
      structure:
        "典型基准论文骨架：Background 提出「尚无 scRNA 专用 caller」→ Results 先模拟后真实 → 超参扫描证明排名会动 → Discussion 按使用条件给菜单。没有 Figure 1 算法阶梯，因为作者不是在卖新方法。",
      compare:
        "统一输入 BAM、默认参数为主实验，再对 MuTect2 的 LOD 等关键阈值做敏感性分析。比较对象是同代 bulk/RNA caller，不是后来的 SComatic。金标准在模拟中完全已知，真实数据则以期望位点与深度分层。",
      metrics:
        "主报 TPR 与 FDR，并按 supporting reads（>2、≥10）和 VAF（25/50/75%）切片。≥10 reads 时中位敏感度可 >99%、中位 FDR ≤0.2%，但 SAMtools 在 VAF 25% 时 TPR 掉到 76.6%。单一平均会把这些条件依赖性抹掉。",
      angle:
        "工具迁移：bulk 世界的检测器能否直接用于 scRNA-seq。切入点是覆盖深度、VAF 与基因组区域（外显子 / 内含子 / 高同一性），而不是发明新统计量。",
    },
  },
  vu2019: {
    readFor: "把问题从「发现突变」改写成「已知突变的细胞归属」，用更严的 FDR 换可信的单细胞基因型。",
    essay:
      "SCmut 几乎是和 Liu 2019 同时出现的另一条路。Vu 等人先用实验证明：为 bulk 或 scDNA 设计的 Mutect、VarScan2、Monovar 直接跑 scRNA-seq，假阳性高到不可用。他们不试图修好 de novo calling，而是缩小问题：先用配对 bulk 肿瘤/正常 DNA 收集体细胞突变集合，再把每个位点基因型化到每一个细胞，用二维局部 FDR 做判定。比较的主指标因此变成 FPR，而不是敏感度——因为任务已经从「找新位点」变成「把已知位点投到细胞」。这篇把「有没有配对 DNA」写成了输入契约：有配对时，细胞水平检出是统计问题；没有配对时，这条路走不通。2022 年 Xu 综述仍把当时的 scRNA 体细胞分析概括为「DNA 突变的再捕获」，指的就是这一传统。",
    four: {
      structure:
        "证伪 → 重定义任务 → 统计方法 → 在乳腺癌 scRNA 上比 FPR → 把突变映射回细胞连表达。这是「先证明别人不能用，再证明缩小问题后能用」的方法论文模板。",
      compare:
        "把 Mutect / VarScan2 / Monovar 当作「直接在 scRNA 上 calling」的基线，目的是展示 FPR 不可接受，从而正当化两阶段设计。不是在同一 de novo 任务上比 F1。",
      metrics:
        "2D local FDR 与 FPR。敏感度受限于 bulk DNA 已经发现的集合，所以作者几乎不把它当主指标。与 bulk VAF 的相关性（原文约 r = 0.89）用来证明细胞水平信号不是随机噪声。",
      angle:
        "任务重定义。假阳性控制是方法核心，发现力被主动放弃。必须有配对 bulk DNA 作为先验——这是和 SComatic / RESA 分家的第一刀。",
    },
  },
  yizhak2019: {
    readFor: "不是单细胞论文，却给后来所有 scRNA caller 提供了噪声本体：editing、germline、等位基因表达必须切开。",
    essay:
      "RNA-MuTect 做的是 bulk RNA-seq：在 GTEx 规模上证明正常组织存在宏观克隆扩增。对 scRNA 方法学来说，它的贡献不是分数，而是一张噪声分类表。RNA 候选位点必须对照配对 DNA，并显式过滤 RNA editing、胚系多态和等位基因表达偏倚（ASE），剩下的才可能是体细胞突变。SComatic 的 REDIportal / dbSNP / panel of normals，RESA 的双 pipeline 共识，几乎都从这条思路继承。写 scRNA 突变论文的引言，通常会先承认「RNA 能看到突变」（RNA-MuTect），再指出「单细胞使问题难一个数量级」（稀疏、dropout、细胞类型）。生物学终点是克隆扩增与组织/年龄相关的突变负荷，而不是 caller 排名——这一点也预告了后来「生物学第二裁判」的写法。",
    four: {
      structure:
        "生物学主张（正常组织有宏观克隆）→ 方法（RNA 候选 vs 配对 DNA，去 editing / germline）→ 与 DNA 交叉验证。综述式方法前体，没有工具竞赛节。",
      compare:
        "不以工具对打为主，而以「RNA 候选 vs DNA 证实」定义真阳性。比较的是分子证据链，不是 F1 柱状图。",
      metrics:
        "与 DNA 的一致性、突变负荷、克隆扩增规模。这些后来分别演变成 SComatic 的 cosine / burden 和第二裁判。",
      angle:
        "先给 RNA 特有噪声源分类，再谈检测。配对 DNA 是金标准。终点是生物学（克隆），不是算法排行。",
    },
  },
  zhou2020: {
    readFor: "承认点突变检出不可靠，把任务改成亚克隆树；评价指标从 F1 换成 ARI / capture / purity。",
    essay:
      "DENDRO 做了一个很多后继者仍在重复的决定：与其在不可靠的单细胞 SNV 上硬比 F1，不如问「这些噪声位点能不能仍把细胞分成对的亚克隆」。Zhou 等人用 Beta-Binomial 同时处理爆发式表达、技术 dropout 和测序错误，计算细胞间遗传距离，再聚类。比较对象因此不是 GATK，而是基于表达的聚类和既有遗传距离方法。在有已知亚群标签的转移性肾细胞癌上，遗传距离的 ARI 显著高于纯表达聚类（原文约 0.932 vs 0.489）。应用节把同一批细胞的突变谱与表达谱连起来，解释小鼠黑色素瘤免疫治疗中的新抗原与反应。附带的 DENDROplan 还把比较推到实验设计层：给定树结构、细胞数和深度，预测你能得到怎样的 ARI。读这篇是为了记住——任务一变，基线、指标、金标准全部重选。",
    four: {
      structure:
        "问题改写（检出不可靠但亚克隆可能稳健）→ Beta-Binomial 距离模型 → 模拟 + 已知亚群的真实数据 → 免疫治疗应用 → 实验设计工具 DENDROplan。应用节决定它能发在 Genome Biology 而不是纯软件笔记。",
      compare:
        "对的是亚克隆检测 / 聚类方法，不是 variant caller。用 ARI 衡量全局正确性，用 capture 与 purity 衡量每个亚克隆。DENDROplan 把「细胞数 × 深度」也纳入比较。",
      metrics:
        "ARI、capture rate、purity、clustering accuracy。位点级 precision 几乎不出场。如果你把 DENDRO 放进 SComatic 的 F1 表，就是在比较两种不同的科学问题。",
      angle:
        "下游任务替代上游检出。统计噪声模型（Beta-Binomial）是方法卖点。基因型与转录组必须在同一批细胞上联合解读，才有治疗故事。",
    },
  },
  prashant2021: {
    readFor: "软件/资源论文：输出细胞×位点的计数矩阵，而不是判定「这是不是体细胞」。",
    essay:
      "SCReadCounts 不宣称自己是 somatic caller。它吃 barcode BAM 和一份位点列表，吐出细胞×位点的 ref/alt 计数与 VAFRNA 矩阵。三个应用案例撑起文章：已知体细胞/editing 的细胞表达、双等位基因的等位表达、以及无先验的 discovery 模式。在 7 个神经母细胞瘤、59,884 个细胞里，它在至少 4 个细胞中回收了 450 个不同的 COSMIC 突变。论证方式几乎不做 F1 竞赛，而是指出：对合并 BAM 做 variant calling 会漏掉只在少数细胞出现的位点。SComatic 后来把它当作「单细胞特异方法」基线之一——此时它往往敏感度高、精度低，因为发现模式没有 SComatic/RESA 那样的统计闸门。读这篇是为了把「量化工具」和「判定工具」分开：矩阵是中间件，caller 是闸门。",
    four: {
      structure:
        "典型 software/resource 骨架：输入契约 → 输出矩阵 → 三个应用 → 一个大队列案例。没有配对 DNA 金标准大表，也没有消融。",
      compare:
        "概念上对比「合并 BAM 的 variant calling」，证明细胞水平计数能找回低比例细胞中的位点。几乎不报与 GATK 的 F1。",
      metrics:
        "检出突变数、细胞覆盖、VAFRNA、minR（默认 3）。这些是资源可用性指标，不是分类性能指标。",
      angle:
        "量化 vs 判定。坚持细胞水平计数，把「无表达」与「纯参考等位基因」区分开。低比例嵌合 SNV 是合并 calling 的盲区。",
    },
  },
  huang2021: {
    readFor: "基础设施短文。比较的是速度、内存和与 cellSNP 的一致性；mode 2 不能直接当 somatic 结果。",
    essay:
      "cellsnp-lite 不算 somatic caller，却是半个领域的基础设施。它输出细胞×位点的等位基因计数，供 demux（vireo）、CNA（Numbat）、线粒体谱系（MQuad）使用。文章是 Bioinformatics 的 Application Note：动机是速度和内存，四种 mode 覆盖「给定 SNP vs 发现」以及「10x vs SMART-seq」。作者明确警告 mode 2（全基因组发现）会输出体细胞或 RNA editing 假阳性，不适合直接当 somatic 结果。比较对象是 cellSNP 和 pysam pileup，指标是工程量而非 F1。后续 SComatic、Numbat 流水线经常把它当 pileup 前端。写方法论文时如果把它放进 somatic F1 表，就是在把中间件和判定器当成同一类工具。",
    four: {
      structure:
        "短文：动机（速度/内存）→ 四种 mode 的输入契约 → 与 cellSNP 一致性。合同写在正文里：发现模式会混入体细胞与 editing。",
      compare:
        "几乎不做 somatic 精度评估。比的是吞吐、峰值内存、以及与前代 cellSNP 的位点一致性。",
      metrics:
        "速度、内存、与 cellSNP 一致性。没有 precision / recall。",
      angle:
        "把「分型」从「判定体细胞」里拆出去。中间件论文用工程指标说话，才能避免被后来的 caller 论文误读。",
    },
  },
  qin2022: {
    readFor: "把变异从基因型延伸到 RNA 表型：SNV/微 indel 连到等位基因特异性剪接。",
    essay:
      "scAllele 的卖点不是更高的癌症体细胞 F1，而是读段级检出 SNV 与微 indel，并把它连到等位基因特异性剪接。Qin 等人先在低覆盖下与常用 SNV caller 对打，再展示别人做不到的功能读出：变异等位基因与剪接异构体的连锁。肺癌 Smart-seq2（TH179 / TH238，574 细胞）上，部分连锁事件在癌细胞特异、并富集癌症通路。读段级 haplotype 过滤（含 editing）是方法的技术核心。切入可以是「同一变异的功能读出」，不一定是更高的 somatic F1——这为后来想发 Science Advances / 系统生物学向的文章提供了另一条结构：caller 只是前半，表型连锁才是 Results D。",
    four: {
      structure:
        "Caller + phenotype 两段式：先证明低覆盖下 SNV/indel 优于常用工具，再展示变异–剪接连锁，最后落到肺癌的癌症通路。",
      compare:
        "强调低覆盖与微 indel，以及别人做不到的等位基因特异性剪接，而不是与同期 SComatic 比 F1（SComatic 还没出来）。",
      metrics:
        "SNV/indel 检出性能，加上等位基因–剪接关联的富集。后一项没有标准 F1，用的是功能一致性。",
      angle:
        "基因型到 RNA 表型的延伸。读段级 haplotype 既是过滤也是新信号。功能读出可以替代「再高 0.03 的 F1」。",
    },
  },
  gao2022: {
    readFor: "SNV caller 的平行世界：从表达+等位基因+单倍型读体细胞拷贝数。完整调研必须把 CNA 家族写进去。",
    essay:
      "许多「从 scRNA 读体细胞突变」的论文，实际比较的不是 GATK，而是 Numbat。Gao 等人把表达倍数、BAF、群体单倍型与亚克隆进化放进一个迭代模型，在 22 个肿瘤样本上与配对 WGS 拷贝数剖面并置，恶性/正常分类对比 CopyKAT。联合模型优于纯表达；可在微环境中精确识别恶性细胞并重建克隆。SComatic 自己也用 Numbat 做克隆对照。2025 年的独立 CNA 基准仍然把 Numbat 列为多数任务第一，CopyKAT 在只有表达矩阵时更稳，inferCNV 擅长单平台亚克隆。读这篇是为了给调研补上第二张地图：点突变和拷贝数是两条平行的「scRNA 体细胞」线索，混用指标会把综述写乱。",
    four: {
      structure:
        "联合模型（表达+BAF+单倍型+进化）→ 22 样本对 WGS 的基准 → 恶性/正常分类与亚克隆恢复。这是方法+基准混合结构，金标准是拷贝数剖面而非 SNV VCF。",
      compare:
        "与 CopyKAT、表达-only 模型、配对 WGS 比。比的是分类准确率和 CNA 剖面一致性，显式不是 SNV F1。",
      metrics:
        "恶性/正常分类准确率、与 WGS 剖面一致性、亚克隆恢复、cnLOH 检出。需要群体相位信息是它的输入契约，也是 CopyKAT 可以在「纯表达」场景赢回去的原因。",
      angle:
        "CNA 是另一类「从 scRNA 读体细胞改变」。单倍型把等位基因不平衡变成可计算信号。完整的方法学调研不能只写 SNV。",
    },
  },
  xu2022: {
    readFor: "综述最有用的结构决策：按数据模态切，用能力表而不是 F1 排行榜来比较工具。",
    essay:
      "Xu 等人把 DNA / RNA、bulk / 单细胞 caller 放进一张特征表：测序类型、可检测突变、是否需要 matched control、是否 joint calling、是否对非癌优化。这是综述文章最清楚的一刀——比较的是工具契约（输入、输出、假设），不是在同一数据集上的分数。scRNA 专节写明当时的限制：多数分析只能「回捕」DNA 已发现的突变（如 SCmut），de novo 仍稀缺。线粒体突变被单独指出：它是当时少数能在 scRNA/scATAC 上稳健用作谱系标记的信号。方法论文后来的 Table 1，几乎都在模仿这张能力表。若你要写 review，一张「输入假设表」比十张柱状图更清楚；若你要写新方法，先把自己填进这张表的一个空格。",
    four: {
      structure:
        "分类学：按 bulk DNA / scDNA / bulk RNA / scRNA 切章节 → 每个工具一行的特征表 → scRNA 专节写限制 → mtDNA 旁路。没有新金标准。",
      compare:
        "比较工具契约，不是分数。第一分类轴是「是否需要配对对照」。这种特征表后来被方法论文反复模仿。",
      metrics:
        "定性能力表，非数值 F1。综述如果硬排 F1，会把不同任务、不同分母的数字放在同一列。",
      angle:
        "能力矩阵比排行榜更适合综述。「是否需要配对对照」是第一分类轴；mtDNA 作为谱系标记是旁路切入。",
    },
  },
  zhang2023: {
    readFor: "精度优先的 de novo 模板：双 pipeline 共识 + 跨细胞复发 + 联合逻辑回归；主报 F0.5 本身就是论点。",
    essay:
      "RESA 是 2023 年底把「scRNA de novo」写成可重复框架的关键一篇。Zhang 等人的三阶段很清楚：两组独立 mapping + calling 降 pipeline bias；按跨细胞复发分成高可信突变 / 噪声 / 待判；联合逻辑回归（jLR）扩大敏感度。指标选择毫不含糊——F0.5，把权重偏向 precision，等于在论文里声明假阳性比假阴性更不可接受。评估阶梯也是后来的标准动作：人胰腺 spike-in 先在可控假阳性下报精度 0.77；15 个癌症细胞系 + 4 个 PDX 用 WES 作金标准，均精度约 0.75，显著高于五种已发表流程；自身消融 RESA vs RESA-jLR 证明回归器提高敏感度、略降精度（AUC 0.79–0.98）。应用节在黑色素瘤耐药时间序列里回收 BRAF V600E，做瘤内异质性。这就是标准「新方法」论文模板：示意图 → 模拟/spike-in → 配对 DNA 金标准大表 → 自身消融 → 一个能讲故事的肿瘤应用。",
    four: {
      structure:
        "Abstract 公式（问题 → 方法名 → precision 0.77 / 19 数据集 → 耐药应用）→ 三阶段算法 → spike-in → 细胞系/PDX vs WES → 黑色素瘤。难度递增：细胞系（高 VAF、克隆）→ PDX → 原发。",
      compare:
        "对所有方法施加相似过滤参数。金标准是 WES 体细胞 SNV，但只在 scRNA 可覆盖位点上计分。主图是 15 数据集的 precision/sensitivity 箱线与 F0.5 散点。基线是 Enge 2017、Maynard 2020、Hovestadt 2019、BCFtools、VarScan——仍是「前 SComatic」世代。",
      metrics:
        "Precision、Sensitivity、F0.5、AUC、与 bulk RNA-seq 的 VAF 相关。F0.5 而不是 F1，是这篇最重要的修辞决定。",
      angle:
        "精度是瓶颈：现有方法不是找不到位点，而是假阳性淹没。双 pipeline 对抗比对/caller 偏差；跨细胞复发把「单细胞稀疏」变成「群体证据」。",
    },
  },
  muyas2024: {
    readFor: "当前短读锚点。细胞类型聚合 + Beta-Binomial + PoN + editing；F1 0.6–0.7，第二名 0.2–0.4。",
    essay:
      "SComatic 是这条线索里被引用最多的一篇，也是后续 LongSom 与食管批判预印本共同的对照。Muyas 等人的核心假设写得很硬：大多数体细胞突变发生在同一分化轨迹的细胞类型中，因此可以把同一细胞类型的 reads 堆起来，用 Beta-Binomial 相对背景噪声打分，再去多态、去 RNA editing、过 panel of normals 和深度过滤。不需要配对 DNA——这一点打开了分化细胞与多克隆组织。比较协议几乎是教科书：基线按 Liu 2019 里「scRNA 上最好的 bulk pipeline」来选，加上 Monovar 与 SCReadCounts；所有 caller 在可比的最小 alt 支持（3 reads）下运行；只在 RNA 可调用位点上算 sensitivity / precision / F1；50 次 bootstrap + 双侧 t 检验、FDR 校正。数字很刺眼：F1 0.6–0.7 vs 第二名 0.2–0.4，precision 0.67–0.87 vs Strelka2 的 0.06–0.24。但敏感度并不总是最高（0.33–0.56），Strelka2 / VarScan2 / SCReadCounts 可以更灵敏，精度却崩溃。生物学第二裁判同样完整：cSCC 中 77% 突变归到 SBS7a–d，与 WES 谱 cosine 0.98；突变负荷对照 TCGA；方法再推到 scATAC，证明不是 RNA 特化 hack。规模数字（688 个数据集、>260 万细胞）让摘要能写得很满。限制也写在 Discussion：稀疏与深度决定敏感度上限；细胞类型错误会把体细胞当成胚系过滤——这正是 LongSom 和食管调查后来打进去的缝。",
    four: {
      structure:
        "黄金九格几乎被填满：Introduction 的分化细胞 gap → Fig.1 过滤阶梯 → 配对 WGS/WES 的 F1 → Fig.3 对打 → 签名 cosine 与负荷 → 克隆/非肿瘤细胞应用 → 承认稀疏。这是目前方法论文的默认骨架。",
      compare:
        "基线分代清楚（bulk 最优 + 两个单细胞工具）。输入契约对齐（同一最小 alt 支持）。callable 定义为 scRNA 至少 1 read。统计有区间和多重检验。次图用突变谱防止「高 F1 但生物学荒谬」。",
      metrics:
        "Sensitivity、Precision、F1 是主表；cosine similarity、mutational signatures、mutation burden 是第二裁判。F1 用来宣布全面领先，但正文承认精度才是拉开差距的轴。",
      angle:
        "无需配对 DNA；细胞类型是突变的自然聚合单位；精度碾压式领先、敏感度可让；生物学一致性作质控；推广到 scATAC。五条切入叠在一篇里，所以它成为锚点。",
    },
  },
  dou2024: {
    readFor: "同一年 Nat Biotech 的另一条路：不跟 SComatic 抢 F1，用参考面板 LD 救稀疏覆盖下的胚系分型。",
    essay:
      "Monopogen 把群体遗传学搬进单细胞。Dou 等人拆成两个模块：胚系部分与 1KG 等面板重叠，用连锁不平衡精炼，分型准确率约 95%，规模 100K–3M SNV；体细胞部分先用 SVM 去低质量，再看细胞群体共分离——期望除亚群中体细胞改变的位点外，等位基因与邻近位点完美 LD，违反者即候选体细胞。平台声称无关：scRNA / snRNA / scATAC / scDNA 都能跑。比较语言与 SComatic 完全不同：胚系有硬金标准（与配对 WGS 的 genotyping accuracy），体细胞更审慎，报的是数量级（数百）与生物学可用性（祖先推断、心肌代谢相关变异），而不是 precision-recall。用 Monovar 做簇水平新 SNV 的后端。读这篇是为了看见「不抢同一张 F1 表」也可以发在同一本期刊——前提是你把任务、金标准、指标全部换成另一套自洽的语言。",
    four: {
      structure:
        "两模块设计 → 胚系对 WGS 的准确率与数量 → 体细胞的 LD 违反逻辑 → 图谱规模应用。体细胞没有独立的大 F1 表，这是有意的。",
      compare:
        "胚系对配对 WGS；体细胞不与 SComatic 对打。Monovar 只作为簇水平新位点的后端。比较角度是「分型准确率 + 规模」。",
      metrics:
        "Genotyping accuracy、SNV count、祖先推断可用性。把这些数字放进 SComatic 的 precision 列，是范畴错误。",
      angle:
        "稀疏短读不是信息不足，而是需要外部 LD。胚系与体细胞必须拆成两个统计问题。体细胞被重新定义为「打破 LD 的位点」。",
    },
  },
  dondi2025: {
    readFor: "2025 年的比较已经从「对 GATK」升级到「对 SComatic」。长读 + 细胞类型重注释 + scWGS 金标准。",
    essay:
      "LongSom 把 SComatic 的思路迁到高质量长读长 scRNA-seq，并加上四件短读很难同时给的东西：用突变谱重注释细胞类型、融合、CNA、mtSNV，再用 BnpC 重建克隆。Dondi 等人最锋利的一刀是重注释——错误的细胞类型会让体细胞位点被当成胚系过滤，重注释可把敏感度提升约 31%。比较协议专门为挑战锚点而写：同一长读数据上对打 SComatic；为公平把 LongSom 的 10 kb 簇过滤也加到对方上；报告每患者 Venn（重叠仅 40–72%）；对 scWGS 支持的位点算 precision 0.44–0.50 vs 0.41–0.46，sensitivity 0.19–0.55 vs 0–0.13。同一批细胞的短读对照更刺眼：短读 SComatic 只得到 114 个位点，约为长读的 1/7.3，交集仅 9——方法差距有时小于模态差距。临床读出是 SNV+融合定义的亚克隆有不同的预测治疗结局。2025 年再写 scRNA 体细胞方法，基线必须分代：只打 Strelka2 已经不够。",
    four: {
      structure:
        "总览（BAM + 细胞类型 → 重注释 → SNV/mtSNV/融合/CNA → 克隆）→ 为何必须重注释 → vs SComatic 的 Venn/F1 → 长读 vs 短读模态对照 → 治疗分层。多了 Venn 和模态对比，F1 不再是唯一语言。",
      compare:
        "直接挑战领域锚点。对齐过滤（10 kb 簇），升级金标准到 scWGS，并加一个「同一细胞、不同模态」的自身对照。重叠低本身就是结果：caller 仍在抓不同的真/假集。",
      metrics:
        "Precision、Sensitivity、F1、call overlap、scWGS support、clone recovery。敏感度是拉开差距的轴；精度与 SComatic 相近。短读位点倍数（×1/7.3）是模态指标，不是算法指标。",
      angle:
        "细胞类型错误是假阴性来源，不是小预处理细节。长读同时给 SNV、融合、CNA，克隆重建不再只靠点突变。金标准从 bulk WES 升到 scWGS。",
    },
  },
  nrc2025: {
    readFor: "两栏短评的价值：把长文的假设提取成可证伪清单，方便你在自己的论文里引用或反驳。",
    essay:
      "Nature Reviews Cancer 的 Tools of the Trade 用两栏篇幅把 SComatic 写清楚。它几乎不做新实验，而是把原论文散落在 Methods 里的假设整理成「挑战–对策」配对：稀疏、胚系污染、表达导致的深度不均、RNA editing、伪差，每一条对应一个算法动作（轨迹假设→按细胞类型堆 reads；假阳性→多态/editing/PoN/深度）。核心假设被写成一句可证伪的话：大多数体细胞突变发生在同一分化轨迹的细胞类型中。2026 年的食管调查和 LongSom 的重注释，打的就是这句。短评型文章在调研里常常被忽略，但它是写 Introduction 最好的提纲——也是批判文章最容易找到的缝。",
    four: {
      structure:
        "问题清单 → 算法如何一对一作答。没有 Results 数字节。体裁决定结构：短、可引用、把假设暴露出来。",
      compare:
        "不比较分数，比较「挑战–对策」配对。适合作为他人 Introduction 的提纲，而不是基准表的一行。",
      metrics:
        "定性。它的「值」是假设是否写清，不是 F1。",
      angle:
        "把方法的假设写成可证伪清单。这正是后续批判与复现文章的切入点。",
    },
  },
  esophagus2026: {
    readFor: "领域第二阶段：不再发明 caller，而是用正交对照压力测试当前最佳。比较的值从 F1 换成共享率。",
    essay:
      "这篇 bioRxiv 调查代表方法学进入第二阶段。作者先承认 SComatic 是目前最稳健的工具，按官方教程跑完，再用同窝小鼠和同一人类供体的多活检做正交对照。发现很不舒服：跨文库共享的位点更像 SNP 或扩增/测序伪差，而不是体细胞；约 30% 与 dbSNP 且在 1KG/gnomAD 有频率的位点重叠。额外过滤后约 70% 可视为较可信体细胞；未知位点的克隆大小与基因结构类似已知体细胞。原论文报告的 DNA 回收大约在 40–70%——F1 可能在同一分子逻辑里被高估，因为金标准与过滤共享许多假设。比较的值从 F1 换成跨个体共享率、数据库重叠、克隆大小和基因结构注释。它不重跑 Liu 的七个 caller，只对「当前最佳」做外部效度检验。结论也不是推翻：SComatic 仍被当作目前最可用的起点，只是必须加跨样本对照。审稿人现在会问 germline 泄漏，这篇就是原因。",
    four: {
      structure:
        "复现 → 正交胚系对照（同窝 / 多活检）→ 数据库交集 → 过滤后的救援与生物学合理性。批判/复现文章的典型顺序：先承认工具，再设计它的假设无法内部消化的对照。",
      compare:
        "不对打旧基线，而对「当前最佳」做外部效度。金标准不是第二套 WGS，而是跨个体共享与群体数据库。这避免了与原论文用同一套逻辑互相证明。",
      metrics:
        "跨个体共享率、dbSNP/gnomAD 重叠、克隆大小、基因结构。~30% 可疑、过滤后 ~70% 较可信。这些数字无法放进 F1 柱状图，却直接打在假阳性分类表上。",
      angle:
        "原论文 F1 可能高估。跨样本共享是检测 germline 泄漏的廉价正交轴。内含子/基因间突变比例高不一定是伪差（scATAC 也有）——要靠对照，而不是区域先验一刀切。",
    },
  },
};

export function essayById(id: string): PaperEssay | undefined {
  return PAPER_ESSAYS[id];
}
