/* Personal content. Keep publication entries in reverse chronological order.
   To add a paper link: { label: 'arXiv', url: 'https://arxiv.org/abs/...' } */
window.PROFILE = {
  isTemplate: false,
  name: 'Hongyi Chen',
  chineseName: '陈弘毅',
  position: { en: 'Theory Group · Nanjing University', zh: '南京大学 · 理论计算机科学' },
  bio: {
    en: 'I am Hongyi Chen (陈弘毅) at Nanjing University. My research is in theoretical computer science, with a focus on graph algorithms and streaming algorithms.',
    zh: '我是陈弘毅，来自南京大学，研究领域为理论计算机科学，主要关注图算法与流式算法。'
  },
  researchIntro: {
    en: 'I study the design and analysis of algorithms, especially graph problems under limited memory and algorithms in metric spaces.',
    zh: '我关注算法的设计与分析，尤其是有限内存下的图问题，以及度量空间中的算法问题。'
  },
  interests: [
    { en: 'Graph algorithms', zh: '图算法' },
    { en: 'Streaming algorithms', zh: '流式算法' },
    { en: 'Metric algorithms', zh: '度量空间算法' }
  ],
  publications: [
    {
      year: '2027',
      title: 'Bicriteria Approximate Navigable Graphs in General Metrics',
      authors: 'Hongyi Chen, Tianyi Zhang',
      venue: { en: 'ACM–SIAM Symposium on Discrete Algorithms (SODA 2027) · To appear', zh: 'ACM–SIAM Symposium on Discrete Algorithms (SODA 2027) · 待发表' },
      abstract: '',
      links: [{ label: 'Accepted papers', url: 'https://www.siam.org/conferences-events/siam-conferences/soda27/program/accepted-papers/' }]
    },
    {
      year: '2026',
      title: 'Faster Deterministic Streaming Vertex Coloring',
      authors: 'Shiri Chechik, Hongyi Chen, Tianyi Zhang',
      venue: '53rd International Colloquium on Automata, Languages, and Programming (ICALP 2026)',
      abstract: {
        en: 'We give a deterministic semi-streaming algorithm for vertex coloring that uses O(Δ) colors in O(√log Δ) passes, where Δ is the maximum degree. The algorithm achieves a linear-size palette with sublogarithmic pass complexity and near-linear memory.',
        zh: '对于最大度为 Δ 的图，我们给出一种确定性半流式顶点染色算法，使用 O(Δ) 种颜色和 O(√log Δ) 轮扫描，在近线性内存下实现线性规模的调色板与次对数轮数。'
      },
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2605.07644' },
        { label: 'DOI', url: 'https://doi.org/10.4230/LIPIcs.ICALP.2026.56' }
      ]
    },
    {
      year: '2025',
      title: 'Improved Streaming Edge Coloring',
      authors: 'Shiri Chechik, Hongyi Chen, Tianyi Zhang',
      venue: '52nd International Colloquium on Automata, Languages, and Programming (ICALP 2025)',
      abstract: {
        en: 'We study edge coloring in the W-streaming model, where edges arrive in an unknown order and the coloring is written to an output stream. Our deterministic algorithm uses near-linear space and Õ(Δ^(4/3 + ε)) colors for any constant ε > 0, improving on the previous quadratic bound.',
        zh: '我们研究 W-streaming 模型中的边染色：边按未知顺序输入，染色结果写入输出流。对于任意常数 ε > 0，我们的确定性算法使用近线性空间和 Õ(Δ^(4/3 + ε)) 种颜色，改进了此前的二次方界。'
      },
      links: [
        { label: 'arXiv', url: 'https://arxiv.org/abs/2504.16470' },
        { label: 'DOI', url: 'https://doi.org/10.4230/LIPIcs.ICALP.2025.48' }
      ]
    }
  ],
  email: 'hychener01@gmail.com',
  location: { en: 'Nanjing University · Nanjing, China', zh: '南京大学 · 中国南京' },
  links: [
    { label: 'TCS @ NJU', url: 'https://tcs.nju.edu.cn/' },
    { label: { en: 'Nanjing University', zh: '南京大学' }, url: 'https://www.nju.edu.cn/' }
  ]
};
