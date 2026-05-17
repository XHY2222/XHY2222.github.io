// 主题切换 + 记忆
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const stored = localStorage.getItem('theme');

  if (stored === 'dark') {
    root.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀';
  }

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀';
      localStorage.setItem('theme', 'dark');
    }
  });
})();

// 自动填年份
document.getElementById('year').textContent = new Date().getFullYear();

// 滚动时隐藏/显示导航栏
const nav = document.querySelector('.nav');
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60 && y > lastScrollY) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScrollY = y;
});

// IntersectionObserver: 元素进入视口时淡入
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.edu-card, .pub-row, .work-row, .stat-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ${i * 0.05}s cubic-bezier(.4,0,.2,1), transform .5s ${i * 0.05}s cubic-bezier(.4,0,.2,1)`;
  observer.observe(el);
});

// 图片灯箱：点击放大，再点一下关闭（Esc 也可）
(() => {
  let lightbox = null;
  let prevOverflow = '';

  const open = (src, alt) => {
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = '<img alt="" />';
      lightbox.addEventListener('click', close);
      document.body.appendChild(lightbox);
    }
    const img = lightbox.querySelector('img');
    img.src = src;
    img.alt = alt || '';
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => lightbox.classList.add('open'));
  };

  const close = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = prevOverflow;
  };

  document.querySelectorAll('.game-card-image img, .recipe-card-image img, .photo-card-image img').forEach(img => {
    img.addEventListener('click', () => open(img.src, img.alt));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// 菜谱搜索：根据 data-keywords 关键词过滤
(() => {
  const input = document.getElementById('recipe-search-input');
  if (!input) return;
  const cards = document.querySelectorAll('.recipe-card');
  const empty = document.getElementById('recipe-empty');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const kw = (card.dataset.keywords || '').toLowerCase();
      const match = !q || kw.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  });
})();
