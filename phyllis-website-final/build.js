const fs = require('fs');
const path = require('path');

// ===== 配置 =====
const CONTENT_DIR = 'content';
const OUTPUT_DIR = 'dist';
const IMAGE_DIR = 'images';

// ===== 工具函数 =====
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function copyDir(src, dest) {
    ensureDir(dest);
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// ===== 简易 YAML 解析（不依赖外部包）=====
function parseYaml(text) {
    const data = {};
    const lines = text.split('\n');
    for (const line of lines) {
        const match = line.match(/^(\w[\w-]*):\s*"?([^"]*)"?\s*$/);
        if (match) {
            data[match[1]] = match[2].replace(/^["']|["']$/g, '');
        }
    }
    return data;
}

// ===== 简易 Markdown 转 HTML（不依赖外部包）=====
function markdownToHtml(md) {
    if (!md) return '';
    let html = md;
    // 图片
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');
    // 标题
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // 粗体和斜体
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // 链接
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    // 清理
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<img)/g, '$1');
    html = html.replace(/(<\/p>)<\/p>/g, '$1');
    return html;
}

// ===== 读取 Markdown 文件 =====
function readMarkdown(filePath) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parts = raw.split('---');
    if (parts.length >= 3) {
        const frontMatter = parseYaml(parts[1]);
        const body = parts.slice(2).join('---').trim();
        return { ...frontMatter, body: body };
    }
    return { body: raw };
}

// ===== 排序 =====
function sortByOrder(items) {
    return items.sort((a, b) => (parseInt(b.order) || 0) - (parseInt(a.order) || 0));
}

function sortByDate(items) {
    return items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

// ===== 构建内容 =====
function buildContent() {
    console.log('🚀 开始构建网站内容...\n');

    // 1. 创建输出目录
    ensureDir(OUTPUT_DIR);

    // 2. 复制图片
    if (fs.existsSync(IMAGE_DIR)) {
        console.log('📸 复制图片...');
        copyDir(IMAGE_DIR, path.join(OUTPUT_DIR, IMAGE_DIR));
    }

    // 3. 读取首页设置
    console.log('🏠 读取首页设置...');
    let homeData = {};
    const homePath = path.join(CONTENT_DIR, 'home.md');
    if (fs.existsSync(homePath)) {
        homeData = readMarkdown(homePath);
    }
    console.log('   名字: ' + (homeData.name_cn || '赵丁伊'));

    // 4. 读取作品
    console.log('🎨 读取作品...');
    let works = [];
    const worksDir = path.join(CONTENT_DIR, 'works');
    if (fs.existsSync(worksDir)) {
        const files = fs.readdirSync(worksDir).filter(f => f.endsWith('.md'));
        works = files.map(f => readMarkdown(path.join(worksDir, f)));
        works = sortByOrder(works);
    }
    console.log('   共 ' + works.length + ' 个作品');

    // 5. 读取旅行日记
    console.log('✈️ 读取旅行日记...');
    let travel = [];
    const travelDir = path.join(CONTENT_DIR, 'travel');
    if (fs.existsSync(travelDir)) {
        const files = fs.readdirSync(travelDir).filter(f => f.endsWith('.md'));
        travel = files.map(f => {
            const item = readMarkdown(path.join(travelDir, f));
            item.bodyHtml = markdownToHtml(item.body || '');
            return item;
        });
        travel = sortByDate(travel);
    }
    console.log('   共 ' + travel.length + ' 篇日记');

    // 6. 读取爱好
    console.log('✨ 读取爱好...');
    let hobbies = [];
    const hobbiesDir = path.join(CONTENT_DIR, 'hobbies');
    if (fs.existsSync(hobbiesDir)) {
        const files = fs.readdirSync(hobbiesDir).filter(f => f.endsWith('.md'));
        hobbies = files.map(f => readMarkdown(path.join(hobbiesDir, f)));
        hobbies = sortByOrder(hobbies);
    }
    console.log('   共 ' + hobbies.length + ' 个爱好');

    // 7. 生成 content.json
    const content = {
        home: homeData,
        works: works,
        travel: travel,
        hobbies: hobbies
    };

    ensureDir(OUTPUT_DIR);
    const jsonPath = path.join(OUTPUT_DIR, 'content.json');
    fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2), 'utf-8');
    console.log('\n✅ content.json 已生成');

    // 8. 复制静态文件
    console.log('\n📄 复制静态文件...');
    ['index.html', 'style.css', 'script.js'].forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(OUTPUT_DIR, file));
            console.log('   ✅ ' + file);
        }
    });

    // 9. 复制 admin 文件夹
    if (fs.existsSync('admin')) {
        copyDir('admin', path.join(OUTPUT_DIR, 'admin'));
        console.log('   ✅ admin/');
    }

    // 10. 复制 content 文件夹
    if (fs.existsSync(CONTENT_DIR)) {
        copyDir(CONTENT_DIR, path.join(OUTPUT_DIR, CONTENT_DIR));
        console.log('   ✅ content/');
    }

    console.log('\n🎉 构建完成！');
}

buildContent();
