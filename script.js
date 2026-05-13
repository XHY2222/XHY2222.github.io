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

// 滚动时显示/隐藏导航栏阴影
const nav = document.querySelector('.nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 20) nav.style.boxShadow = '0 4px 20px -10px rgba(0,0,0,.1)';
  else nav.style.boxShadow = 'none';
  lastY = y;
});

// IntersectionObserver: 卡片进入视口时淡入
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-grid, .contact-list').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1)';
  observer.observe(el);
});
