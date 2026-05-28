# 🚀 Netlify CMS 后台部署教程

> 带后台管理面板的网站部署指南，让你像发朋友圈一样管理网站内容

---

## 📋 整体架构

```
你的 GitHub 仓库
├── admin/           ← 后台管理面板
│   ├── index.html   ← 后台页面
│   └── config.yml   ← 后台配置
├── content/         ← 内容文件（后台编辑的就是这里）
│   ├── home.md      ← 首页设置
│   ├── works/       ← 作品
│   ├── travel/      ← 旅行日记
│   └── hobbies/     ← 爱好
├── images/uploads/  ← 上传的图片
├── build.js         ← 构建脚本
├── package.json     ← 依赖配置
├── netlify.toml     ← Netlify 配置
├── index.html       ← 网站主页
├── style.css        ← 样式
└── script.js        ← 交互
```

**工作原理**：
1. 你在后台（/admin）编辑内容、上传图片
2. 后台自动保存到 GitHub
3. Netlify 自动构建，生成 content.json
4. 网站自动更新

---

## 第 1 步：上传所有文件到 GitHub

### 1.1 先把旧的 3 个文件删掉（如果还在的话）

进入你的 GitHub 仓库，删除以下旧文件：
- `index.html`（旧的）
- `style.css`（旧的）
- `script.js`（旧的）

### 1.2 上传新文件

把以下 **所有文件和文件夹** 上传到 GitHub 仓库根目录：

**必须上传的文件：**
- `index.html`
- `style.css`
- `script.js`
- `build.js`
- `package.json`
- `netlify.toml`
- `admin/index.html`
- `admin/config.yml`
- `content/home.md`
- `content/works/` 文件夹里的所有 .md 文件
- `content/travel/` 文件夹里的所有 .md 文件
- `content/hobbies/` 文件夹里的所有 .md 文件

### 1.3 上传方法

**方法 A：网页上传（推荐）**

1. 打开 GitHub 仓库
2. 点击 **"Add file"** → **"Upload files"**
3. 每次上传时，文件名前面加上文件夹路径：
   - `admin/index.html`
   - `admin/config.yml`
   - `content/home.md`
   - `content/works/watercolor-rainbow.md`
   - `content/works/butterfly-kingdom.md`
   - ... 以此类推
4. 每次点击 **"Commit changes"**

**方法 B：用压缩包上传**

1. 下载我提供的完整 zip 包
2. 解压后，把所有文件拖到 GitHub 上传

---

## 第 2 步：部署到 Netlify

### 2.1 注册 Netlify

1. 访问 https://app.netlify.com
2. 点击 **"Sign up"**
3. 选择 **"Continue with GitHub"**（用 GitHub 账号登录）
4. 授权 Netlify 访问你的 GitHub

### 2.2 导入仓库

1. 登录后，点击 **"Add new site"** → **"Import an existing project"**
2. 选择 **"GitHub"**
3. 找到并选择你的 `phyllis-website` 仓库
4. 点击 **"Configure Netlify"**

### 2.3 配置构建设置

在配置页面填写：

| 设置项 | 值 |
|--------|-----|
| **Build command** | `npm install && node build.js` |
| **Publish directory** | `dist` |

其他保持默认，点击 **"Deploy site"**

### 2.4 等待部署

等待 1-2 分钟，看到 "Your site is live!" 就成功了！

---

## 第 3 步：开启后台管理面板

### 3.1 启用 Identity（身份验证）

1. 在 Netlify 站点页面，点击左侧 **"Site configuration"** → **"Identity"**
2. 点击 **"Enable Identity"**
3. 启用后，找到 **"Registration"** 部分
4. 选择 **"Invite only"**（仅限邀请）或 **"Open"**（开放注册）
   - 推荐选 **"Invite only"**，这样只有你能登录后台

### 3.2 启用 Git Gateway

1. 在 Identity 页面，找到 **"Services"** 部分
2. 点击 **"Git Gateway"**
3. 点击 **"Enable Git Gateway"**

### 3.3 邀请自己

1. 在 Identity 页面，点击 **"Invite users"** 按钮
2. 输入你的邮箱地址
3. 点击 **"Send"**
4. 去邮箱查收邀请邮件，点击链接设置密码

### 3.4 访问后台

1. 打开：`https://你的网站地址/admin/`
   - 例如：`https://phyllis-website.netlify.app/admin/`
2. 用刚才设置的邮箱和密码登录
3. 看到后台管理面板就成功了！🎉

---

## 第 4 步：使用后台

### 🏠 修改首页信息

1. 在后台点击 **"首页设置"**
2. 点击 **"首页信息"**
3. 修改名字、介绍、学校等信息
4. 点击右上角 **"Save"** 保存
5. 等待 1-2 分钟，网站自动更新

### 🎨 添加新作品

1. 在后台点击 **"我的作品"**
2. 点击右上角 **"New 🎨 我的作品"**
3. 填写：
   - **作品标题**：比如 "我的水彩画"
   - **作品类型**：选择 绘画/手工/其他
   - **作品图片**：点击上传图片
   - **作品描述**：简单描述一下
4. 点击 **"Save"** 保存

### ✈️ 添加旅行日记（朋友圈风格）

1. 在后台点击 **"旅行日记"**
2. 点击 **"New ✈️ 旅行日记"**
3. 填写：
   - **日记标题**：比如 "暑假去北京"
   - **旅行年份**：2024
   - **日记内容**：在这里写日记，可以插入图片！
     - 点击图片按钮上传照片
     - 照片会自动插入到日记中
   - **封面照片**：选一张封面
   - **旅行标签**：选择类型
4. 点击 **"Save"** 保存

### ✨ 添加/修改爱好

1. 在后台点击 **"我的爱好"**
2. 可以编辑现有爱好，或创建新的
3. 点击 **"Save"** 保存

---

## 📸 后台使用技巧

### 上传图片
- 在后台任何有图片字段的地方，点击即可上传
- 图片会自动保存到 `images/uploads/` 文件夹
- 建议图片大小不超过 2MB

### 在日记中插入多张图片
1. 在日记内容编辑器中，点击图片按钮
2. 上传图片
3. 可以继续写文字，再插入更多图片
4. 最终效果类似朋友圈，图文混排

### 修改排序
- 每个内容都有 **"排序权重"** 字段
- 数字越大，排越前面
- 比如想让某个作品排在第一个，就把排序权重设为 10

---

## ❓ 常见问题

**Q: 后台打不开？**
- 确认已完成第 3 步的所有设置
- 确认 Identity 和 Git Gateway 都已启用
- 尝试清除浏览器缓存后重试

**Q: 保存后网站没更新？**
- Netlify 需要 1-2 分钟构建
- 去 Netlify 控制台查看构建状态
- 如果构建失败，查看错误日志

**Q: 图片上传失败？**
- 检查图片大小，建议不超过 2MB
- 用 https://tinypng.com 压缩图片

**Q: 忘记后台密码？**
- 去 Netlify → Identity → Users
- 点击你的用户 → 重置密码

**Q: 想回到 GitHub Pages？**
- 不行，Netlify CMS 需要 Netlify 托管
- 但 Netlify 也是免费的，而且更快

---

## 🎯 总结

| 操作 | 入口 | 耗时 |
|------|------|------|
| 修改首页 | 后台 → 首页设置 | 1 分钟 |
| 添加作品 | 后台 → 我的作品 → New | 2 分钟 |
| 写旅行日记 | 后台 → 旅行日记 → New | 5 分钟 |
| 修改爱好 | 后台 → 我的爱好 | 1 分钟 |
| 上传图片 | 任何图片字段 | 30 秒 |

**所有操作保存后，1-2 分钟网站自动更新！**

---

遇到问题随时告诉我！
