const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

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

function readMarkdown(filePath) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { ...data, body: content };
}

function sortByOrder(items) {
    return items.sort((a, b) => (b.order || 0) - (a.order || 0));
}

function sortByDate(items) {
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
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

// ===== 构建内容 =====
function buildContent() {
    console.log('🚀 开始构建网站内容...\n');

    // 1. 创建输出目录
    ensureDir(OUTPUT_DIR);
    ensureDir(path.join(OUTPUT_DIR, IMAGE_DIR));

    // 2. 复制图片
    if (fs.existsSync(IMAGE_DIR)) {
        console.log('📸 复制图片...');
        copyDir(IMAGE_DIR, path.join(OUTPUT_DIR, IMAGE_DIR));
    }

    // 3. 读取首页设置
    console.log('🏠 读取首页设置...');
    const homeData = {};
    const homePath = path.join(CONTENT_DIR, 'home.md');
    if (fs.existsSync(homePath)) {
        const home = readMarkdown(homePath);
        Object.assign(homeData, home);
    }
    console.log(`   名字: ${homeData.name_cn || '赵丁伊'} (${homeData.name_en || 'Phyllis Zhao'})`);

    // 4. 读取作品
    console.log('🎨 读取作品...');
    const worksDir = path.join(CONTENT_DIR, 'works');
    let works = [];
    if (fs.existsSync(worksDir)) {
        const files = fs.readdirSync(worksDir).filter(f => f.endsWith('.md'));
        works = files.map(f => readMarkdown(path.join(worksDir, f)));
        works = sortByOrder(works);
    }
    console.log(`   共 ${works.length} 个作品`);

    // 5. 读取旅行日记
    console.log('✈️ 读取旅行日记...');
    const travelDir = path.join(CONTENT_DIR, 'travel');
    let travel = [];
    if (fs.existsSync(travelDir)) {
        const files = fs.readdirSync(travelDir).filter(f => f.endsWith('.md'));
        travel = files.map(f => {
            const item = readMarkdown(path.join(travelDir, f));
            // 将 markdown 内容转为 HTML
            item.bodyHtml = marked(item.body || '');
            return item;
        });
        travel = sortByDate(travel);
    }
    console.log(`   共 ${travel.length} 篇日记`);

    // 6. 读取爱好
    console.log('✨ 读取爱好...');
    const hobbiesDir = path.join(CONTENT_DIR, 'hobbies');
    let hobbies = [];
    if (fs.existsSync(hobbiesDir)) {
        const files = fs.readdirSync(hobbiesDir).filter(f => f.endsWith('.md'));
        hobbies = files.map(f => readMarkdown(path.join(hobbiesDir, f)));
        hobbies = sortByOrder(hobbies);
    }
    console.log(`   共 ${hobbies.length} 个爱好`);

    // 7. 生成 content.json
    const content = {
        home: homeData,
        works: works,
        travel: travel,
        hobbies: hobbies
    };

    const jsonPath = path.join(OUTPUT_DIR, 'content.json');
    fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`\n✅ content.json 已生成 (${(JSON.stringify(content).length / 1024).toFixed(1)} KB)`);

    // 8. 复制静态文件
    console.log('\n📄 复制静态文件...');
    const staticFiles = ['index.html', 'style.css', 'script.js'];
    for (const file of staticFiles) {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(OUTPUT_DIR, file));
            console.log(`   ✅ ${file}`);
        }
    }

    // 9. 复制 admin 文件夹
    if (fs.existsSync('admin')) {
        copyDir('admin', path.join(OUTPUT_DIR, 'admin'));
        console.log('   ✅ admin/');
    }

    // 10. 复制 content 文件夹（CMS 需要）
    if (fs.existsSync(CONTENT_DIR)) {
        copyDir(CONTENT_DIR, path.join(OUTPUT_DIR, CONTENT_DIR));
        console.log('   ✅ content/');
    }

    console.log('\n🎉 构建完成！网站文件在 dist/ 目录中');
    console.log('   首页: ' + (homeData.name_cn || '赵丁伊'));
    console.log(`   作品: ${works.length} 个`);
    console.log(`   日记: ${travel.length} 篇`);
    console.log(`   爱好: ${hobbies.length} 个`);
}

// 运行构建
buildContent();
