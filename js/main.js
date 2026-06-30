/* ================================================
   云图GEO - 公司官网交互逻辑
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- 移动端导航切换 ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // --- 导航栏滚动阴影 ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- 滚动动画 (fade-in) ---
  const fadeElements = document.querySelectorAll('.fade-in');

  function checkFade() {
    fadeElements.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  }

  // 初始检查
  checkFade();
  window.addEventListener('scroll', checkFade);

  // --- 返回顶部按钮 ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 联系我们表单验证 ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      // 清除之前的错误
      const errorInputs = contactForm.querySelectorAll('.error');
      errorInputs.forEach(function(el) { el.classList.remove('error'); });
      const errorMsgs = contactForm.querySelectorAll('.form-error-msg');
      errorMsgs.forEach(function(el) { el.style.display = 'none'; });

      // 验证姓名
      const nameInput = contactForm.querySelector('#name');
      if (!nameInput.value.trim()) {
        showError(nameInput, '请输入您的姓名');
        isValid = false;
      }

      // 验证公司名称
      const companyInput = contactForm.querySelector('#company');
      if (!companyInput.value.trim()) {
        showError(companyInput, '请输入公司名称');
        isValid = false;
      }

      // 验证邮箱
      const emailInput = contactForm.querySelector('#email');
      if (!emailInput.value.trim()) {
        showError(emailInput, '请输入电子邮箱');
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showError(emailInput, '请输入有效的邮箱地址');
        isValid = false;
      }

      // 验证手机号（可选）
      const phoneInput = contactForm.querySelector('#phone');
      if (phoneInput.value.trim() && !/^1[3-9]\d{9}$/.test(phoneInput.value)) {
        showError(phoneInput, '请输入有效的手机号码');
        isValid = false;
      }

      // 验证需求描述
      const messageInput = contactForm.querySelector('#message');
      if (!messageInput.value.trim()) {
        showError(messageInput, '请描述您的需求');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, '请至少输入10个字描述您的需求');
        isValid = false;
      }

      if (isValid) {
        // 模拟提交成功
        contactForm.style.display = 'none';
        const successMsg = contactForm.parentElement.querySelector('.form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
        }
      }
    });
  }

  function showError(input, message) {
    input.classList.add('error');
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    }
  }

  // --- 当前页面导航高亮 ---
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  navAnchors.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('./', '').replace('/', ''))) {
      link.classList.add('active');
    }
  });

  // 首页特殊处理
  if (currentPath.endsWith('index.html') || currentPath.endsWith('/website/') || currentPath === '/') {
    const homeLink = document.querySelector('.nav-links a[href="./index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
});
