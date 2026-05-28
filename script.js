// ===== 全局状态 =====
let siteContent = null;

// ===== DOM 加载完成后执行 =====
document.addEventListener('DOMContentLoaded', () => {
    loadContent().then(() => {
        renderAll();
        initNavMenu();
        initScrollAnimations();
        initFilterButtons();
        initLightbox();
    });
});

// ===== 加载内容 =====
async function loadContent() {
    try {
        const response = await fetch('content.json');
        siteContent = await response.json();
        console.log('✅ 内容加载成功');
    } catch (error) {
        console.warn('⚠️ content.json 加载失败，使用默认内容');
        siteContent = getDefaultContent();
    }
}

// ===== 默认内容（备用）=====
function getDefaultContent() {
    return {
        home: {
            name_cn: '赵丁伊',
            name_en: 'Phyllis Zhao',
            subtitle: '欢迎来到我的小天地',
            description: '这里收藏着我的爱好、作品，还有和家人一起旅行的美好回忆~',
            school: '南京市江北新区外国语学校',
            grade: '三年级',
            birth_year: '2017'
        },
        works: [],
        travel: [],
        hobbies: []
    };
}

// ===== 渲染所有内容 =====
function renderAll() {
    if (!siteContent) return;
    renderHome();
    renderAbout();
    renderHobbies();
    renderWorks();
    renderTravel();
}

// ===== 渲染首页 Hero =====
function renderHome() {
    const home = siteContent.home;
    if (!home) return;

    // 更新文字
    const nameCn = document.getElementById('heroNameCn');
    const nameEn = document.getElementById('heroNameEn');
    const subtitle = document.getElementById('heroSubtitle');
    const desc = document.getElementById('heroDesc');
    const avatar = document.getElementById('heroAvatar');
    const footerSchool = document.getElementById('footerSchool');

    if (nameCn && home.name_cn) nameCn.textContent = home.name_cn;
    if (nameEn && home.name_en) nameEn.textContent = home.name_en;
    if (subtitle && home.subtitle) subtitle.textContent = '✨ ' + home.subtitle + ' ✨';
    if (desc && home.description) desc.textContent = home.description;
    if (footerSchool && home.school) footerSchool.textContent = home.school;

    // 更新头像
    if (avatar && home.avatar) {
        avatar.innerHTML = `<img src="${home.avatar}" alt="${home.name_cn}" style="width:100%;height:100%;object-fit:cover;border-radius:19px;">`;
    }
}

// ===== 渲染关于我 =====
function renderAbout() {
    const home = siteContent.home;
    if (!home) return;

    const container = document.getElementById('aboutContent');
    if (!container) return;

    const currentYear = new Date().getFullYear();
    const age = home.birth_year ? (currentYear - parseInt(home.birth_year)) : 8;

    container.innerHTML = `
        <div class="about-card fade-in-up">
            <div class="about-icon">👧</div>
            <h3>我是谁？</h3>
            <p>我叫${home.name_cn || '赵丁伊'}，英文名叫 <strong>${home.name_en || 'PhyllisZhao'}</strong>。我是${home.school || '江苏省南京市江北新区外国语学校'}的一名${home.grade || '三'}年级小学生！</p>
        </div>
        <div class="about-card fade-in-up">
            <div class="about-icon">📅</div>
            <h3>我的生日</h3>
            <p>我出生于 <strong>${home.birth_year || '2017'}年</strong>，现在已经 ${age} 岁啦！</p>
        </div>
        <div class="about-card fade-in-up">
            <div class="about-icon">💖</div>
            <h3>我喜欢</h3>
            <p>我喜欢画画、做手工，还超级喜欢看动漫！</p>
        </div>
    `;
}

// ===== 渲染爱好 =====
function renderHobbies() {
    const hobbies = siteContent.hobbies || [];
    const container = document.getElementById('hobbiesGrid');
    if (!container) return;

    if (hobbies.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">还没有添加爱好，去后台添加吧~</p>';
        return;
    }

    const colorMap = {
        blue: 'linear-gradient(135deg, #1a237e, #3949ab)',
        pink: 'linear-gradient(135deg, #FFB7C5, #FF6B9D)',
        orange: 'linear-gradient(135deg, #ffb300, #ff6f00)',
        green: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
        purple: 'linear-gradient(135deg, #6a1b9a, #ab47bc)'
    };

    container.innerHTML = hobbies.map(hobby => `
        <div class="hobby-card fade-in-up">
            <div class="hobby-image" style="background: ${colorMap[hobby.color] || colorMap.blue}">
                ${hobby.icon || '⭐'}
            </div>
            <div class="hobby-content">
                <h3>${hobby.title || ''}</h3>
                <p>${hobby.description || ''}</p>
                <div class="hobby-tags">
                    ${hobby.tag1 ? `<span class="tag">${hobby.tag1}</span>` : ''}
                    ${hobby.tag2 ? `<span class="tag">${hobby.tag2}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ===== 渲染作品 =====
function renderWorks() {
    const works = siteContent.works || [];
    const container = document.getElementById('worksGallery');
    if (!container) return;

    if (works.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">还没有添加作品，去后台上传吧~</p>';
        return;
    }

    const categoryEmojis = {
        drawing: '🖼️',
        craft: '✂️',
        other: '📸'
    };

    container.innerHTML = works.map(work => {
        const hasImage = work.image && !work.image.includes('placeholder');
        const imageHtml = hasImage
            ? `<img src="${work.image}" alt="${work.title || '作品'}" loading="lazy">`
            : `<div class="work-placeholder">${categoryEmojis[work.category] || '🖼️'}</div>`;

        return `
            <div class="work-card fade-in-up" data-category="${work.category || 'other'}">
                <div class="work-image">
                    ${imageHtml}
                </div>
                <div class="work-overlay">
                    <h4>${work.title || '未命名作品'}</h4>
                    <p>${work.description || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ===== 渲染旅行日记 =====
function renderTravel() {
    const travel = siteContent.travel || [];
    const container = document.getElementById('travelTimeline');
    if (!container) return;

    if (travel.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;padding:40px;">还没有添加旅行日记，去后台记录吧~</p>';
        return;
    }

    const tagMap = {
        outdoor: '🏕️ 户外探索',
        amusement: '🎠 游乐园',
        beach: '🏖️ 海边',
        mountain: '🏔️ 山水',
        museum: '🏛️ 博物馆',
        abroad: '🌍 出国旅行',
        hometown: '🏠 回老家',
        other: '🌟 其他'
    };

    container.innerHTML = travel.map(item => {
        const hasCover = item.cover && !item.cover.includes('placeholder');
        const coverHtml = hasCover
            ? `<img src="${item.cover}" alt="${item.title}" loading="lazy">`
            : `<div class="travel-placeholder">✈️</div>`;

        // 处理 markdown 中的图片
        let bodyHtml = item.bodyHtml || '';
        // 将图片提取到顶部展示
        const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
        let match;
        const images = [];
        while ((match = imgRegex.exec(bodyHtml)) !== null) {
            images.push(match[1]);
        }
        // 移除 body 中的 img 标签
        bodyHtml = bodyHtml.replace(/<img[^>]*>/g, '');

        return `
            <div class="travel-item fade-in-up">
                <div class="travel-year">${item.year || ''}</div>
                <div class="travel-content">
                    <div class="travel-image">
                        ${hasCover ? coverHtml : (images[0] ? `<img src="${images[0]}" alt="${item.title}" loading="lazy">` : coverHtml)}
                    </div>
                    <div class="travel-info">
                        <h3>${item.title || '旅行日记'}</h3>
                        <p>${bodyHtml.replace(/<[^>]*>/g, '').substring(0, 100)}</p>
                        <span class="travel-tag">${tagMap[item.tag] || tagMap.other}</span>
                    </div>
                </div>
                ${images.length > 1 || bodyHtml.replace(/<[^>]*>/g, '').length > 100 ? `
                <div class="travel-detail">
                    <div class="travel-detail-body">${item.bodyHtml || ''}</div>
                    ${images.length > 1 ? `
                    <div class="travel-gallery">
                        ${images.map(img => `<img src="${img}" alt="旅行照片" loading="lazy">`).join('')}
                    </div>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// ===== 导航菜单移动端切换 =====
function initNavMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(255, 183, 197, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 183, 197, 0.3)';
        }
    });
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// ===== 作品筛选 =====
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            workCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===== 灯箱功能 =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const workCards = document.querySelectorAll('.work-card');

    let currentIndex = 0;
    let visibleCards = [];

    function updateVisibleCards() {
        visibleCards = Array.from(workCards).filter(card => !card.classList.contains('hidden'));
    }

    workCards.forEach((card) => {
        card.addEventListener('click', () => {
            updateVisibleCards();
            const cardIndex = visibleCards.indexOf(card);
            openLightbox(cardIndex);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        if (visibleCards.length === 0) return;

        const card = visibleCards[currentIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('.work-overlay h4');
        const desc = card.querySelector('.work-overlay p');

        if (img) {
            lightboxPlaceholder.innerHTML = `<img src="${img.src}" alt="${title ? title.textContent : ''}" style="max-width:80vw;max-height:70vh;object-fit:contain;border-radius:12px;">`;
        } else {
            const placeholder = card.querySelector('.work-placeholder');
            lightboxPlaceholder.textContent = placeholder ? placeholder.textContent : '🖼️';
            lightboxPlaceholder.style.fontSize = '200px';
        }

        lightboxCaption.textContent = title ? `${title.textContent}${desc && desc.textContent ? ' - ' + desc.textContent : ''}` : '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateLightboxContent();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateLightboxContent();
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft': prevImage(); break;
            case 'ArrowRight': nextImage(); break;
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(updateVisibleCards, 100);
        });
    });
}

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
