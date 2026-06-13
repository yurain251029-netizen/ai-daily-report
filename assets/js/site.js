/* ==========================================================
   AI × 经济日报 · 站点主页交互逻辑
   - 实时日期印章
   - 报告生成状态提示（基于时段推断）
   ========================================================== */

(function () {
  'use strict';

  /* ---------- 1. 日期印章 + Footer 时间 ---------- */
  function updateDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    const wk = weekdays[now.getDay()];
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');

    const stamp = document.getElementById('dateStamp');
    if (stamp) stamp.textContent = '📅 ' + y + '-' + m + '-' + d + ' · 星期' + wk;

    const ft = document.getElementById('footerTime');
    if (ft) ft.textContent = '最近更新：' + y + '-' + m + '-' + d + ' ' + hh + ':' + mm;
  }

  /* ---------- 2. 报告生成状态（基于时段推断） ---------- */
  function updateReportStatus() {
    const now = new Date();
    const hour = now.getHours();
    const metas = {
      morning: { readyAfter: 8,  label: '🌅 晨报 · 08:00' },
      noon:    { readyAfter: 12, label: '☀️ 午报 · 12:00' },
      evening: { readyAfter: 20, label: '🌙 晚报 · 20:00' }
    };
    const cards = document.querySelectorAll('[data-report]');
    cards.forEach(function (el) {
      const key = el.getAttribute('data-report');
      const meta = metas[key];
      if (!meta) return;
      if (hour >= meta.readyAfter) {
        el.textContent = '✅ ' + meta.label + ' · 已发布';
        el.style.color = '#1a8f3c';
      } else {
        el.textContent = '⏳ ' + meta.label + ' · 等待中';
        el.style.color = '#9a8a73';
      }
    });
  }

  /* ---------- 启动 ---------- */
  function init() {
    updateDate();
    updateReportStatus();
    setInterval(updateDate, 60 * 1000);
    initGlitch();
  }

  /* ---------- 3. Hero 标题故障动画（hover 触发） ---------- */
  function initGlitch() {
    const heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;
    let timer = null;
    function trigger() {
      heroTitle.classList.remove('glitch-active');
      void heroTitle.offsetWidth; /* 强制重排，让动画重新触发 */
      heroTitle.classList.add('glitch-active');
    }
    heroTitle.addEventListener('mouseenter', trigger);
    /* 移动端 tap 触发（仅触屏设备） */
    heroTitle.addEventListener('touchstart', function () {
      trigger();
      if (timer) clearTimeout(timer);
      timer = setTimeout(trigger, 450);
    }, { passive: true });
    heroTitle.addEventListener('animationend', function () {
      heroTitle.classList.remove('glitch-active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
