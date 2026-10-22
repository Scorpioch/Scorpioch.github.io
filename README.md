# 陈弘毅的个人主页

静态学术主页，支持中英文切换，无需安装依赖或运行构建命令。

- 目标仓库：`Scorpioch/Scorpioch.github.io`
- 配置完成并发布成功后的主页地址：https://scorpioch.github.io/
- GitHub Pages 设置：**Settings → Pages → Deploy from a branch → main → /(root)**。

## 日常维护

在 GitHub 仓库打开 `profile.js`，点击编辑按钮，修改后提交到 `main` 分支。GitHub Pages 配置完成后，每次提交都会自动发布更新；进度可在仓库 **Actions** 或 **Settings → Pages** 查看。

主要修改 `profile.js` 中的以下内容：

- `bio`、`position`、`researchIntro`、`interests`：个人简介与研究方向。
- `publications`：论文列表，按年份倒序；新增时复制已有条目，填写标题、作者、会议和资源链接（如 arXiv、DOI、Slides）。
- `email`、`links`：开头的邮箱和其他主页链接。
- `education`：教育经历；硕士阶段使用 Master’s studies，以区分硕转博与已取得硕士学位。
- `{ en: '...', zh: '...' }` 分别填写英文和中文；两种语言共用的内容可直接填写字符串。

修改姓名或英文简介时，也建议同步更新 `index.html` 中的标题、description 和初始简介。样式在 `style.css`，界面文字与交互在 `main.js`。保留根目录的 `.nojekyll` 文件。


论文资源通过每篇右侧的文档图标展开。`links` 可填写 HTTPS 地址或本站相对路径。ICALP 2026 幻灯片位于 `slides/icalp-2026-streaming-vertex-coloring.pdf`，由原始 LaTeX 项目编译而来。

字体使用 Source Serif 4、Source Serif 4 Display 和 Inter，本站托管；许可证位于 `fonts/`。
