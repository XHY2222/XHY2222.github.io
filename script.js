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
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 20) nav.style.boxShadow = '0 4px 20px -10px rgba(0,0,0,.08)';
  else nav.style.boxShadow = 'none';
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
