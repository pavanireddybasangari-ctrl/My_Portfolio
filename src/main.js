import { ThreePortfolioScene } from './threeScene.js';
import confetti from 'canvas-confetti';
import { createIcons, icons } from 'lucide';

// Project Database
const projectsData = {
  skillshield: {
    title: 'SkillShield',
    type: 'Web Application & Blog Platform',
    tech: ['HTML5 / CSS3', 'JavaScript', 'Responsive UI', 'Blog Architecture', 'GitHub Pages'],
    summary: 'A modern, responsive blog platform engineered for seamless content presentation, intuitive navigation, and clean cross-device UI.',
    details: [
      'Engineered a responsive blog platform with clean semantic structure and modular layout styling.',
      'Designed dynamic reading layouts and fluid cross-device UI navigation.',
      'Deployed live on GitHub Pages with continuous version control and open-source availability.'
    ],
    github: 'https://github.com/pavanireddybasangari-ctrl/blog-application',
    demo: 'https://pavanireddybasangari-ctrl.github.io/blog-application/'
  }
};


function initApp() {
  // 1. Initialize Lucide Icons
  createIcons({ icons });

  // 2. Initialize Three.js 3D Scene
  let sceneManager = null;
  try {
    sceneManager = new ThreePortfolioScene('webgl-canvas');
  } catch (err) {
    console.warn('WebGL initialization error:', err);
  }

  // 3. Custom Cursor Follower
  initCustomCursor();

  // 4. Dynamic Typewriter
  initTypewriter();

  // 5. Navigation & Scroll Spy
  initNavigation();

  // 6. 3D Card Tilt Effects
  initTiltCards();

  // 7. Clipboard Copy Functionality
  initClipboardCopy();

  // 8. Live Hyderabad Clock
  initLiveClock();

  // 9. Modals (Projects & Bio)
  initModals();

  // 10. Interactive Contact Form
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Minimal Circular Cyber Cursor System
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  // Don't run on purely touch devices without hover capability
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let outlineX = -100;
  let outlineY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      outlineX = mouseX;
      outlineY = mouseY;
      dot.style.opacity = '1';
      outline.style.opacity = '1';
    }

    // Direct zero-latency tracking for core dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });

  window.addEventListener('blur', () => {
    document.body.classList.remove('cursor-hover', 'cursor-active');
  });

  // Smooth elastic trailing ring loop (60fps)
  function renderOutline() {
    outlineX += (mouseX - outlineX) * 0.2;
    outlineY += (mouseY - outlineY) * 0.2;

    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(renderOutline);
  }
  renderOutline();

  // Active / Click Shockwave Ripple
  window.addEventListener('mousedown', (e) => {
    document.body.classList.add('cursor-active');

    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });

  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });

  // Delegated hover states for all interactive elements (including dynamic modal content)
  const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .copyable, .tilt-card, .quick-chip, .skill-pill, .hero-avatar-wrapper, .modal-close-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

// Typewriter Effect
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const words = [
    'Web Developer',
    'Python & Java Programmer',
    'Machine Learning Enthusiast',
    'Modern UI/UX Engineer'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}


// Navigation & Scroll Spy
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
    });
  });

  // Header scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Spy active states
    let currentSection = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

// 3D Card Tilt Effect
function initTiltCards() {
  // Only disable on purely touch devices without hover capability
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

// Clipboard Copy Functionality
function initClipboardCopy() {
  const copyElements = document.querySelectorAll('.copyable');
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = textToCopy;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(`Copied to clipboard: ${textToCopy}`);
      });
    });
  });
}

// Live Hyderabad Local Clock (IST = UTC+5:30)
function initLiveClock() {
  const clockEl = document.getElementById('hyderabad-clock');
  if (!clockEl) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat([], options);
    const timeStr = formatter.format(new Date());
    clockEl.textContent = `${timeStr} IST (Hyderabad)`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Modals Setup
function initModals() {
  // Project Modal
  const projectModal = document.getElementById('project-modal');
  const projectModalContent = document.getElementById('modal-content-area');
  const closeProjectBtn = document.getElementById('close-modal-btn');
  const openProjectBtns = document.querySelectorAll('.open-project-modal');

  openProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const project = projectsData[id];
      if (!project || !projectModalContent) return;

      projectModalContent.innerHTML = `
        <div class="modal-header">
          <span class="project-type text-accent">${project.type}</span>
          <h3 class="modal-title">${project.title}</h3>
          <p class="modal-subtitle">${project.summary}</p>
        </div>
        <div class="modal-tags">
          ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="modal-body-content" style="margin: 1.25rem 0;">
          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: #fff;">Key Engineering Highlights:</h4>
          <ul style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.9rem; line-height: 1.7;">
            ${project.details.map(d => `<li style="margin-bottom: 0.45rem;">${d}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-footer-actions" style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i data-lucide="github"></i> View Repository
          </a>
          <a href="#contact" class="btn btn-outline btn-sm modal-contact-trigger">
            <i data-lucide="message-square"></i> Inquire About Project
          </a>
        </div>
      `;

      createIcons({ icons });

      // Contact trigger from modal
      projectModalContent.querySelector('.modal-contact-trigger')?.addEventListener('click', () => {
        projectModal.classList.remove('open');
      });

      projectModal.classList.add('open');
    });
  });

  if (closeProjectBtn && projectModal) {
    closeProjectBtn.addEventListener('click', () => projectModal.classList.remove('open'));
  }

  // Bio Modal
  const bioModal = document.getElementById('bio-modal');
  const openBioBtn = document.getElementById('open-bio-modal');
  const closeBioBtn = document.getElementById('close-bio-btn');

  if (openBioBtn && bioModal) {
    openBioBtn.addEventListener('click', () => bioModal.classList.add('open'));
  }
  if (closeBioBtn && bioModal) {
    closeBioBtn.addEventListener('click', () => bioModal.classList.remove('open'));
  }

  // Close modals on clicking outside or ESC
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('open');
    if (e.target === bioModal) bioModal.classList.remove('open');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      projectModal?.classList.remove('open');
      bioModal?.classList.remove('open');
    }
  });
}

// Contact Form Handler with Confetti & Direct Mailto fallback
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Sending...</span> <i data-lucide="loader-2" class="spin"></i>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#9d4edd', '#f72585']
      });

      showToast(`Thank you, ${name}! Opening mail client...`);
      form.reset();

      submitBtn.innerHTML = `<span>Sent Successfully!</span> <i data-lucide="check"></i>`;
      createIcons({ icons });

      // Open mailto with prefilled details
      const mailtoUrl = `mailto:pavanireddy.basangari@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Pavani,\n\nMy name is ${name} (${email}).\n\n${message}`)}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        createIcons({ icons });
      }, 3500);
    }, 900);
  });
}

// Toast Notification Utility
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `<i data-lucide="check-circle-2"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  createIcons({ icons });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
