# 陈弘毅的个人主页

静态学术主页，支持中英文切换，无需安装依赖或运行构建命令。

- 目标仓库：`Scorpioch/Scorpioch.github.io`
- 配置完成并发布成功后的主页地址：https://scorpioch.github.io/
- GitHub Pages 设置：**Settings → Pages → Deploy from a branch → main → /(root)**。

## 日常维护

在 GitHub 仓库打开 `profile.js`，点击编辑按钮，修改后提交到 `main` 分支。GitHub Pages 配置完成后，每次提交都会自动发布更新；进度可在仓库 **Actions** 或 **Settings → Pages** 查看。

主要修改 `profile.js` 中的以下内容：

- `bio`、`position`、`researchIntro`、`interests`：个人简介与研究方向。
- `publications`：论文列表，按年份倒序；新增时复制已有条目，填写标题、作者、会议、摘要和链接。
- `email`、`location`、`links`：邮箱、地址和其他主页链接。
- `{ en: '...', zh: '...' }` 分别填写英文和中文；两种语言共用的内容可直接填写字符串。

修改姓名或英文简介时，也建议同步更新 `index.html` 中的标题、description 和初始简介。样式在 `style.css`，界面文字与交互在 `main.js`。保留根目录的 `.nojekyll` 文件。
