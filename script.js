// ===== DOM 加载完成后执行 =====
document.addEventListener('DOMContentLoaded', () => {
    initNavMenu();
    initScrollAnimations();
    initFilterButtons();
    initLightbox();
});

// ===== 导航菜单移动端切换 =====
function initNavMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // 切换菜单
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 点击菜单链接后关闭菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 滚动时添加阴影
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
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察所有带 fade-in-up 类的元素
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));
}

// ===== 作品筛选 =====
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 筛选卡片
            const filter = btn.dataset.filter;
            workCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
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

    // 获取所有可见的卡片
    function updateVisibleCards() {
        visibleCards = Array.from(workCards).filter(card => !card.classList.contains('hidden'));
    }

    // 打开灯箱
    workCards.forEach((card, index) => {
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
        const placeholder = card.querySelector('.work-placeholder');
        const title = card.querySelector('.work-overlay h4');
        const desc = card.querySelector('.work-overlay p');

        // 如果有真实图片，可以在这里替换
        // 目前使用 emoji 作为占位符
        lightboxPlaceholder.textContent = placeholder ? placeholder.textContent : '🖼️';
        lightboxCaption.textContent = title ? `${title.textContent} - ${desc ? desc.textContent : ''}` : '作品展示';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateLightboxContent();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateLightboxContent();
    }

    // 事件监听
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // 点击背景关闭
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // 当筛选变化时更新可见卡片
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(updateVisibleCards, 100);
        });
    });
}

// ===== 添加平滑滚动支持（备选方案）=====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
