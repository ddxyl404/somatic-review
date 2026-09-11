/** Homepage long-form copy. Keep Swiss: short paragraphs, no slogans. */

export const HERO = {
  kicker: "Survey  ·  2019–2026",
  title: "Somatic / Review",
  lede: "使用单细胞 RNA-seq 研究体细胞突变的算法文献：文章怎么写、如何与其他方法比较、比较什么值、从什么角度切入。十五篇构成一条方法学线索，不是一份工具安装手册。",
  sub: "同一份 BAM 可以被写成四个不同的科学问题。问题一变，基线、指标、金标准和论文骨架全部重选。下面按这个顺序读：先看问题，再看十五篇文章各自填了哪一格。",
};

export const PROBLEM_COPY = {
  left: "单细胞全基因组测序能看到每个细胞的突变，但贵、扩增误差大，并且拿不到同一细胞的转录组。scRNA-seq 已经是肿瘤与组织图谱的常规武器——如果能从中读出体细胞突变，就可以在同一批细胞上同时做基因型与表型：克隆归属、耐药、新抗原、正常组织镶嵌，都不必再另做一套 scDNA。",
  right:
    "代价是一套特有噪声：表达稀疏、等位基因脱落、RNA editing、胚系泄漏、文库批次、细胞类型污染。2019 年以来的算法文章，本质上都在给这张噪声表配过滤器，并证明过滤器之后仍能做生物学。过滤器配完，还要决定你比较的是位点、是细胞、还是过程（负荷与签名）——三者用的不是同一套分数。",
  extra:
    "这条线索有一个容易被忽略的分岔。点突变（SNV/indel）是 SComatic / RESA / LongSom 的主战场；拷贝数（CNA）是 Numbat / CopyKAT / inferCNV 的平行世界。许多综述把它们写进同一节「从 scRNA 读体细胞改变」，却用 SNV 的 F1 去理解 CNA 的剖面一致性。本站把两条线分开：主线是 SNV 的文章结构与比较协议，CNA 只作为必须写进调研的平行家族。",
  tasks: [
    {
      n: "01",
      t: "发现",
      d: "de novo 体细胞 SNV",
      note: "无配对 DNA 找出位点。SComatic、RESA、LongSom。主指标 precision / F1 / F0.5。",
    },
    {
      n: "02",
      t: "分型",
      d: "已知突变投到细胞",
      note: "有位点列表或 bulk DNA。SCmut、SCReadCounts、cellsnp-lite。主指标 FPR、细胞覆盖。",
    },
    {
      n: "03",
      t: "克隆",
      d: "亚克隆树与归属",
      note: "位点是中间产物。DENDRO、BnpC、Numbat。主指标 ARI / capture / purity。",
    },
    {
      n: "04",
      t: "过程",
      d: "负荷、签名、CNA",
      note: "问突变像不像该类肿瘤。SComatic 的 SBS7 cosine、负荷 vs TCGA；CNA 剖面 vs WGS。",
    },
  ],
};

export const CORPUS_COPY = {
  intro:
    "按时间读，会看见问题被改写了三次。2019 年：bulk caller 能不能用，以及有配对 DNA 时如何把突变投到细胞。2020–2022 年：克隆树、计数矩阵、综述能力表、CNA 平行线。2023–2024 年：de novo 爆发，RESA 与 SComatic 把精度写成主叙事，Monopogen 把 LD 写成另一套语言。2025–2026 年：不再只发明 caller，开始挑战锚点（LongSom）和压力测试锚点（食管调查）。",
  howToRead:
    "点进每篇先看四块：章节骨架（它填了九格里的哪几格）、比较协议（和谁比、金标准从哪来）、指标（报的是 F1 还是 ARI）、切入角度（它改写了哪个问题）。有原图的章节把图嵌在对应论证下面，用来核对「这一节实际在比什么」。",
};

export const TIMELINE = [
  {
    year: "2019",
    title: "基准与分型",
    body: "Liu 把七个 bulk caller 打在 scRNA 上，结论是条件化推荐。SCmut 证伪直接 calling，改做已知突变的细胞分型。RNA-MuTect 虽是 bulk，却留下 editing / germline / ASE 必须切开的噪声本体。",
  },
  {
    year: "2020",
    title: "任务改写成树",
    body: "DENDRO 承认点突变检出不可靠，把终点改成亚克隆。ARI 取代 F1。此后凡是「用 scRNA 做克隆」的文章，都可以不再把位点级精度当作第一句。",
  },
  {
    year: "2021–22",
    title: "中间件、能力表、CNA",
    body: "SCReadCounts 与 cellsnp-lite 把计数矩阵从判定器里拆出去。Xu 综述用模态 × 配对对照画能力表，并写明 scRNA de novo 仍稀缺。scAllele 把变异连到剪接。Numbat 打开单倍型 CNA 平行线。",
  },
  {
    year: "2023–24",
    title: "de novo 成为主战场",
    body: "RESA 用 F0.5 声明精度优先；SComatic 用细胞类型聚合 + 无配对 DNA 成为短读锚点；Monopogen 用 LD 走另一条路，故意不对打 F1。同一年两篇 Nat Biotech，比较语言完全不同。",
  },
  {
    year: "2025–26",
    title: "挑战锚点、测试锚点",
    body: "LongSom 把基线从 GATK 升级到 SComatic，金标准升到 scWGS，并证明模态差距可以大于方法差距。NRC 短评把假设写成可证伪清单。食管调查用跨样本共享打 germline 泄漏。领域进入第二阶段。",
  },
];

export const STRUCTURE_COPY = {
  intro:
    "方法论文不是自由散文。SComatic、RESA、LongSom、DENDRO 的章节顺序可以重叠到一张九格表上。差别只在每一格填什么证据，以及有些文章故意留空——DENDRO 几乎不上位点 F1，食管调查不上新算法示意图。",
  extra:
    "审稿人通常按这个顺序抓稿：摘要有没有一个分数加一个生物学能力；Figure 1 的每一步是否对应一种假阳性；Results B 的 callable 是否写清；有没有消融；Discussion 有没有主动写出细胞类型错误和 germline 泄漏。九格不是审美，是答辩顺序。",
};

export const STRUCTURE_FILLS = [
  {
    paper: "SComatic",
    fill: "九格几乎填满。Results B 是三肿瘤对 WES/WGS 的 F1，Results C 是 SBS7 cosine 0.98，Results D 是分化细胞与 scATAC。Discussion 承认稀疏。",
  },
  {
    paper: "RESA",
    fill: "Results A 的 spike-in 特别完整（精度 0.77）。Results B 是 15 细胞系的 F0.5。自身消融占掉通常给「对打 SComatic」的位置——因为当时锚点还没立住。",
  },
  {
    paper: "DENDRO",
    fill: "故意不上位点 F1。Results B 是 ARI，Results D 是免疫治疗新抗原，外加 DENDROplan 把实验设计写成可比较的一层。",
  },
  {
    paper: "LongSom",
    fill: "在 SComatic 骨架上多两格：细胞类型重注释的消融，以及同一细胞的长读/短读模态对照。Venn 成为和 F1 并列的主图。",
  },
  {
    paper: "Liu 2019",
    fill: "没有算法 Figure 1。模拟、真实、参数扫描三节代替 Results A/B。终点是菜单不是冠军。这是基准论文对九格的改写。",
  },
  {
    paper: "Esophagus",
    fill: "不上新方法。整篇是对锚点的 Results B 压力测试，金标准换成正交对照。批判文章可以只填九格里的一格，但必须把这一格做硬。",
  },
];

export const PROTOCOL_COPY = {
  intro:
    "比较不是「把别人的工具跑一遍」。它是一套协议：任务、金标准、输入契约、分层、统计、生物学第二裁判。漏掉任何一层，F1 都不可引用。跨论文柱状图尤其危险——SComatic 的精度来自原文 Fig. 3，LongSom 的分母已经换成 scWGS 可覆盖位点，两者不能直接比大小。",
  extra:
    "协议还有一条隐规则：基线要分代。2019 年对 GATK 是新结果；2024 年再只打 Strelka2，审稿人会问为什么不对 SComatic。2025 年还要对模态（长读/短读）和细胞类型注释质量负责。把「我们比某个已公认失败的 bulk caller 高」写成贡献，现在很难过关。",
};

export const PROTOCOL_FAILS = [
  {
    skip: "选定任务",
    fail: "把 SCmut 的 FPR、SComatic 的 F1、DENDRO 的 ARI 放进同一张表。三个数字都对，但回答的不是同一个问题。",
  },
  {
    skip: "构造金标准",
    fail: "用全基因组当分母，所有方法敏感度都接近 0；或用与过滤同一套逻辑的 DNA caller 当真值，F1 被内部高估。",
  },
  {
    skip: "对齐输入契约",
    fail: "一方最小 alt 支持 3 reads、另一方 5 reads；一方有细胞类型、另一方没有。阈值购物会伪装成方法优势。",
  },
  {
    skip: "分层报告",
    fail: "一个总分掩盖 VAF 25% 时的崩溃、内含子特异性差、短读可检测集合本身很窄。Liu 2019 专门反对这件事。",
  },
  {
    skip: "统计与消融",
    fail: "过滤器堆成黑盒。审稿人无法知道 Beta-Binomial、PoN、重注释哪一步在干活。RESA-jLR 与 LongSom 去重注释就是在回答这个问题。",
  },
  {
    skip: "生物学第二裁判",
    fail: "高精度但谱不像该类肿瘤——可能全是 RNA editing 或批次伪差。SBS7 cosine、BRAF V600E、负荷 vs TCGA 是挡住这类质疑的最小集合。",
  },
];

export const METRICS_COPY = {
  intro:
    "指标选择本身就是论点。报 F1 是在说「两边都要」；报 F0.5 是在说「假阳性更不可接受」；报 ARI 是在说「我比较的不是位点，是细胞分区」；报跨样本共享率是在说「我怀疑你的真阳性里仍有 SNP」。先读指标，再读分数。",
  extra:
    "同一名称在不同论文里分母不同。SComatic 的 sensitivity 限制在 RNA 至少 1 read 的位点；LongSom 进一步要求 scWGS 支持；Liu 的 TPR 在模拟里是植入位点的全体。引用任何数字之前，先抄 callable 的定义。本站图表里的 F1 是便于并排对照的代表性区间，不是一次联合重跑。",
};

export const METRIC_TRAPS = [
  {
    name: "Sensitivity",
    trap: "不限制在 callable 位点时，深度稀疏会把所有方法打到接近 0，看起来像「谁都不行」，其实是分母错了。",
  },
  {
    name: "Precision",
    trap: "会随过滤变严而上升、敏感度下降。只报精度等于允许作者把阈值拧到只剩几个位点。必须和召回一起看，或改用 F0.5 并画出曲线。",
  },
  {
    name: "F1",
    trap: "假定假阳与假阴同等不可接受。SComatic 用它宣布全面领先；RESA 拒绝用它，因为叙事是精度优先。跨模态（短读 vs 长读）的 F1 更不能直接比。",
  },
  {
    name: "F0.5",
    trap: "把权重偏向精度，是诚实的，也会让对敏感度友好的方法看起来更差。选用它时必须在正文里把权衡说出来。",
  },
  {
    name: "Cosine of spectra",
    trap: "对突变数量敏感：位点太少时，签名拟合不稳定。SComatic 限制在该癌种已知过程上拟合，避免过拟合 COSMIC 全集——这步必须写进 Methods。",
  },
  {
    name: "ARI",
    trap: "衡量分区而非位点。两个方法可以位点交集很低，却有相近的 ARI。不能反过来说「ARI 高所以 SNV 准」。",
  },
];

export const ANGLES_COPY = {
  intro:
    "新文章很少再靠「我们 F1 高 0.03」过关。八条反复出现的切入，决定了你和谁比、比什么、金标准从哪来。选切入就是选论文的对手盘：选「问题改写」你的对手是任务定义，选「模态跃迁」你的对手是短读本身，选「正交对照」你的对手是锚点方法的外部效度。",
  extra:
    "一个常见错误是把八条全写进同一篇。SComatic 能叠五条，是因为它是锚点级工作量。普通方法论文选一条主切入、一条第二裁判就够：例如「细胞类型重注释」（LongSom）加「scWGS 支持」；或「F0.5 精度优先」（RESA）加「BRAF 回收」。切入越多，每一条的证据都要配得上，否则像购物清单。",
};

export const ATLAS_COPY = {
  intro:
    "把工具按任务家族排，比按年份排更不容易比错。bulk caller、细胞分型、de novo SNV、LD、亚克隆树、表达推断 CNA，六行用六种比较语言。跨行引用数字，几乎一定错。",
  cnv: "独立基准（2025）的结论相当稳定：Numbat 在多数任务总分第一；CopyKAT 在只有表达矩阵时更稳；inferCNV 擅长单平台亚克隆。SComatic 自己也用 Numbat 做克隆对照。写 SNV 方法论文时，用 CNA 做第二裁判是加分，用 CNA 工具的分数来证明 SNV caller 更好则是加乱。",
};

export const HOWTO_COPY = {
  intro:
    "下面六条是从十五篇文章的 Methods / Discussion 里抽出来的可执行清单。不是风格建议。漏掉 callable 定义或假阳性分类表，现在比漏掉一个基线更容易被拒。",
};

export const PITFALLS = [
  {
    n: "01",
    title: "把中间件放进 caller 排行榜",
    body: "cellsnp-lite 的 mode 2、SCReadCounts 的 discovery 模式，输出的是计数或候选，不是经过体细胞判定的 VCF。拿它们的「敏感度高」对比 SComatic，是在奖励没有闸门的方法。",
  },
  {
    n: "02",
    title: "引用跨论文 F1 而不对齐分母",
    body: "SComatic Fig. 3 的短读 WES 可覆盖位点，和 LongSom 的 scWGS 支持位点，不是同一个集合。本站图表已经标明「非联合重跑」。正文里再引一次数字，仍要写清来源图号。",
  },
  {
    n: "03",
    title: "只用配对 DNA 当金标准、从不用正交对照",
    body: "DNA caller 与 RNA caller 共享比对误差和胚系过滤逻辑时，一致的位点可以同时为假。食管调查用同窝/多活检共享，打的就是这个盲区。",
  },
  {
    n: "04",
    title: "细胞类型当作无误差的输入",
    body: "SComatic 的聚合单位是细胞类型。注错了，体细胞会被当成胚系丢掉。LongSom 证明重注释可换来约 31% 敏感度。Methods 必须写注释来源和是否迭代。",
  },
  {
    n: "05",
    title: "Discussion 不写适用边界",
    body: "有/无配对 DNA、短读/长读、肿瘤/正常组织、10x / SMART-seq / 长读，边界不写就等于暗示方法普遍适用。锚点论文反而写得最清楚——后来者更应该写。",
  },
  {
    n: "06",
    title: "综述用一张 F1 表结束所有家族",
    body: "Xu 2019–2022 的教训是能力表优于排行榜。2026 年再写综述，至少需要两张表：SNV 任务的指标语言，以及 CNA 任务的剖面语言。",
  },
];

export const FOOTER_COPY = {
  blurb:
    "针对使用单细胞 RNA-seq 研究体细胞突变的算法文献调研。结构、比较协议、指标与切入角度整理自 2019–2026 年公开论文。数字摘自原文；跨论文对照不是一次联合重跑。",
};
