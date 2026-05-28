# 🌸 Phyllis 的小天地 - 个人作品集网站

> 一个充满童趣的个人网站，展示赵丁伊（PhyllisZhao）的爱好、作品和旅行回忆。

## 📁 网站结构

```
/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 交互脚本
├── SPEC.md         # 设计规范文档
└── README.md       # 说明文档
```

## 🚀 如何本地预览

### 方法一：直接打开
直接用浏览器打开 `index.html` 文件即可预览。

### 方法二：使用 VS Code
1. 安装 VS Code
2. 安装 "Live Server" 插件
3. 右键点击 `index.html` → "Open with Live Server"

### 方法三：使用 Python
```bash
# 进入网站文件夹
cd path/to/website

# Python 3
python -m http.server 8000

# 然后访问 http://localhost:8000
```

---

## ☁️ 如何免费部署上线

### 方案一：GitHub Pages（推荐）

**步骤 1: 创建 GitHub 账号**
1. 访问 [github.com](https://github.com)
2. 点击 "Sign up" 注册账号
3. 验证邮箱

**步骤 2: 创建新仓库**
1. 登录后点击右上角 "+" → "New repository"
2. 仓库名称填写：`phyllis-website`（或其他名字）
3. 选择 "Public"
4. 点击 "Create repository"

**步骤 3: 上传网站文件**
1. 在新仓库页面，点击 "uploading an existing file"
2. 将以下 3 个文件拖入上传区域：
   - `index.html`
   - `style.css`
   - `script.js`
3. 点击 "Commit changes"

**步骤 4: 启用 GitHub Pages**
1. 进入仓库设置 (Settings)
2. 左侧菜单找到 "Pages"
3. Source 下选择 `main` 分支
4. 点击 "Save"
5. 等待 1-2 分钟，你的网站就上线了！
6. 访问：`https://你的用户名.github.io/phyllis-website`

---

### 方案二：Vercel（备选）

**步骤 1: 注册 Vercel**
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录

**步骤 2: 部署网站**
1. 点击 "New Project"
2. 选择 "Import Git Repository"
3. 连接你的 GitHub 仓库
4. 点击 "Deploy"
5. 等待部署完成，获取网站链接

---

### 方案三：Netlify（备选）

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 连接 GitHub 仓库
5. 部署即可获得网站链接

---

## 🎨 如何添加你自己的内容

### 添加图片

1. 在网站文件夹创建 `images` 文件夹
2. 在 `images` 文件夹内创建子文件夹：
   - `images/works/` - 作品图片
   - `images/travel/` - 旅行照片
3. 修改 `index.html` 中的图片路径

### 修改个人信息

编辑 `index.html` 文件，找到以下内容并修改：
- 名字和学校信息
- 爱好介绍
- 作品描述
- 旅行日记

### 修改配色

编辑 `style.css` 开头的 CSS 变量：
```css
:root {
    --primary: #FFB7C5;      /* 主色 - 樱花粉 */
    --secondary: #87CEEB;    /* 次色 - 天空蓝 */
    --accent: #FF6B9D;       /* 强调色 - 活力粉 */
    --background: #FFF9F0;   /* 背景色 - 奶油白 */
}
```

---

## 📝 常用命令

### Git 命令（用于上传更新）

```bash
# 克隆仓库到本地
git clone https://github.com/你的用户名/phyllis-website.git

# 进入文件夹
cd phyllis-website

# 添加所有文件
git add .

# 提交更改
git commit -m "更新网站内容"

# 推送到 GitHub
git push origin main
```

---

## ❓ 常见问题

**Q: 网站多久会更新？**
A: GitHub Pages 通常在推送后 1-2 分钟生效；Vercel/Netlify 更快，通常几秒钟。

**Q: 可以绑定自己的域名吗？**
A: 可以！所有平台都支持自定义域名，教程可以在他们的帮助文档中找到。

**Q: 网站是免费的吗？**
A: GitHub Pages 完全免费；Vercel 和 Netlify 的免费版也足够个人网站使用。

---

## 💡 小贴士

- 定期备份你的网站文件到本地
- 更新内容后记得推送到 GitHub
- 可以邀请家人一起维护这个网站

---

Made with 💖 for Phyllis Zhao
南京市江北新区外国语学校
