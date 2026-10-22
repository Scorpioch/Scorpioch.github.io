# 陈弘毅的个人主页

静态学术主页，英文页面，保留中文姓名，无需安装依赖或运行构建命令。

- 维护仓库：[Scorpioch/Scorpioch.github.io](https://github.com/Scorpioch/Scorpioch.github.io)
- 公开主页：[https://scorpioch.github.io/](https://scorpioch.github.io/)
- GitHub Pages 设置：**Settings → Pages → Deploy from a branch → main → /(root)**。

## 日常维护

在 GitHub 仓库打开 `profile.js`，点击编辑按钮，修改后提交到 `main` 分支。提交到 `main` 后，GitHub Pages 会自动发布更新；进度可在仓库 **Actions** 或 **Settings → Pages** 查看。

主要修改 `profile.js` 中的以下内容：

- `bio`、`position`、`researchIntro`：个人简介与研究方向（研究兴趣位于介绍末段）。
- `publications`：论文列表，按年份倒序；新增时复制已有条目，填写标题、作者、会议和资源链接（仅 arXiv、Slides）。
- `email`：开头的邮箱，支持邮件链接与一键复制。
- `theoryGroup`：介绍中 Theory Group 对应的链接。
- `advisors`：导师姓名和主页链接。
- `education`：教育经历；硕士阶段使用 Master’s student，仅表示在读经历，不表示取得硕士学位。
- `{ en: '...', zh: '...' }` 分别填写英文和中文；两种语言共用的内容可直接填写字符串。

修改姓名或英文简介时，也建议同步更新 `index.html` 中的标题、description 和初始简介。样式在 `style.css`，界面文字与交互在 `main.js`。保留根目录的 `.nojekyll` 文件。


论文资源使用右侧两个不同图标的 arXiv 和 Slides 按钮。`links` 可填写 HTTPS 地址或本站相对路径。ICALP 2025、2026 幻灯片分别位于 `slides/icalp-2025-streaming-edge-coloring.pdf` 和 `slides/icalp-2026-streaming-vertex-coloring.pdf`，由原始 LaTeX 项目编译而来。

字体使用 Source Serif 4、Source Serif 4 Display 和 Inter，本站托管；许可证位于 `fonts/`。


两份 Slides 均为静态最终状态版：ICALP 2025 共 22 页（含参考文献），ICALP 2026 共 19 页。Beamer handout 配置同时处理互斥 overlay，不叠加中间图示；PDF 以普通文档打开。
