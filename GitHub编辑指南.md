# 📝 GitHub 编辑指南

> 最简单的方式管理网站内容，直接在 GitHub 网页上操作

---

## 📁 文件结构速查

```
你的 GitHub 仓库
├── content/
│   ├── home.md              ← 首页信息（名字、学校、介绍）
│   ├── works/               ← 作品文件夹
│   │   ├── watercolor-rainbow.md
│   │   ├── butterfly-kingdom.md
│   │   └── ...
│   ├── travel/              ← 旅行日记文件夹
│   │   ├── 2024-summer-trip.md
│   │   └── ...
│   └── hobbies/             ← 爱好文件夹
│       ├── detective-conan.md
│       └── ...
├── images/uploads/          ← 上传的图片放这里
└── ...
```

---

## 🎯 常用操作

### 1️⃣ 修改首页信息

**修改**：`content/home.md`

```yaml
---
name_cn: "赵丁伊"                    ← 改名字
name_en: "Phyllis Zhao"             ← 改英文名
subtitle: "欢迎来到我的小天地"       ← 改副标题
description: "这里收藏着我的爱好..."  ← 改介绍
school: "南京市江北新区外国语学校"  ← 改学校
grade: "三年级"                     ← 改年级
birth_year: "2017"                  ← 改生日年份
---
```

**步骤**：
1. 打开 GitHub 仓库
2. 点击 `content/home.md`
3. 点击右上角的 **铅笔图标** ✏️
4. 修改内容
5. 页面往下拉，点击 **"Commit changes"**
6. 等待 1-2 分钟，网站自动更新

---

### 2️⃣ 添加新作品

**步骤 1：上传图片**

1. 点击 **"Add file"** → **"Upload files"**
2. 拖入照片
3. **重要**：文件名写成 `images/uploads/作品名字.jpg`
   - ✅ 正确：`images/uploads/my-drawing.jpg`
   - ❌ 错误：`我的画.jpg`（不要用中文文件名）
4. 点击 **"Commit changes"**

**步骤 2：创建作品文件**

1. 点击 **"Add file"** → **"Create new file"**
2. 文件名：`content/works/作品名字.md`
3. 粘贴以下内容（修改成你的）：

```yaml
---
title: "我的水彩画"                    ← 作品标题
category: "drawing"                  ← 类型：drawing(绘画)/craft(手工)/other(其他)
description: "用彩色水笔画的小猫"     ← 作品描述
date: "2024-06-15"                   ← 创作日期
order: 1                             ← 排序（数字越大越靠前）
image: "/images/uploads/my-drawing.jpg" ← 图片路径（和第1步的文件名一致）
---
```

4. 点击 **"Commit changes"**
5. 等待 1-2 分钟，网站自动更新

---

### 3️⃣ 添加旅行日记（朋友圈风格）

**步骤 1：上传照片**（同上）

**步骤 2：创建日记文件**

1. 点击 **"Add file"** → **"Create new file"**
2. 文件名：`content/travel/2024-beijing.md`
3. 粘贴以下内容：

```yaml
---
title: "暑假去北京"                   ← 日记标题
year: "2024"                         ← 年份
tag: "outdoor"                       ← 标签：outdoor(户外)/amusement(游乐园)/beach(海边)/...
date: "2024-08-01"                   ← 日期
order: 1                             ← 排序
cover: "/images/uploads/beijing.jpg"  ← 封面照片（可选）
---

今天和家人一起去了北京！

![天安门](/images/uploads/beijing-1.jpg)

我们去了天安门广场，还吃了北京烤鸭！

![北京烤鸭](/images/uploads/beijing-2.jpg)

这是最开心的一天！
```

4. 点击 **"Commit changes"**

**插入图片的格式**：
```markdown
![图片描述](图片路径)
```

---

### 4️⃣ 添加新爱好

1. 点击 **"Add file"** → **"Create new file"**
2. 文件名：`content/hobbies/新爱好.md`
3. 粘贴以下内容：

```yaml
---
title: "新爱好名称"                   ← 爱好名称
icon: "⭐"                            ← Emoji 图标
description: "爱好的介绍"             ← 介绍
tag1: "标签1"                        ← 标签1
tag2: "标签2"                        ← 标签2
color: "blue"                        ← 颜色：blue/pink/orange/green/purple
order: 1                             ← 排序
---
```

4. 点击 **"Commit changes"**

---

### 5️⃣ 删除内容

直接删除对应的 `.md` 文件即可：
1. 打开要删除的文件
2. 点击右上角的 **垃圾桶图标** 🗑️
3. 点击 **"Commit changes"**

---

## 📋 快速参考表

| 想做什么 | 编辑哪个文件 | 文件夹 |
|---------|------------|--------|
| 改名字/学校 | `content/home.md` | - |
| 添加作品 | 新建 `content/works/xxx.md` | works/ |
| 添加旅行日记 | 新建 `content/travel/xxx.md` | travel/ |
| 添加爱好 | 新建 `content/hobbies/xxx.md` | hobbies/ |
| 上传图片 | `images/uploads/xxx.jpg` | uploads/ |

---

## 💡 小技巧

### 图片压缩
如果照片太大（超过 2MB），建议先压缩：
- 在线工具：https://tinypng.com
- Mac 自带：右键图片 → 打开方式 → 预览 → 文件 → 导出 → 降低质量

### 文件名规范
- ✅ 用英文：`my-drawing.jpg`
- ❌ 不用中文：`我的画.jpg`
- ✅ 用横线连接：`summer-trip-2024.jpg`
- ❌ 不用空格：`summer trip.jpg`

### 排序技巧
- `order: 10` 比 `order: 1` 排在更前面
- 想让新内容排第一，就设一个很大的数字，比如 `order: 100`

### 预览效果
修改后等待 1-2 分钟，刷新网站就能看到效果。
如果还没更新，强制刷新：`Command + Shift + R`（Mac）或 `Ctrl + Shift + R`（Windows）

---

## ❓ 常见问题

**Q: 修改后网站没变化？**
- 等待 1-2 分钟
- 强制刷新浏览器
- 检查文件名是否写对了

**Q: 图片显示不出来？**
- 检查图片路径是否正确
- 确认图片已上传到 `images/uploads/`
- 文件名是否用了中文（不要用中文）

**Q: 可以一次上传多个文件吗？**
- 可以！在 Upload files 页面可以一次选择多个文件

**Q: 手机可以编辑吗？**
- 可以！GitHub 网页在手机浏览器也能用

---

## 🎉 总结

只需要记住 3 步：
1. **上传图片** → `images/uploads/xxx.jpg`
2. **创建内容文件** → `content/xxx/xxx.md`
3. **点击 Commit** → 等待网站更新

就这么简单！
