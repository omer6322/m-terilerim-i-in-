// ===== SEYIR RESTORANT - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1500); // Increased duration to show animated logo
    });
    // Fallback: hide preloader after 4 seconds
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 4000);
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    // Check on page load
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    }
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // ===== THEME TOGGLE (LIGHT/DARK MODE) =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  if (themeToggle) {
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', function () {
      body.classList.toggle('light-mode');
      
      const isLightMode = body.classList.contains('light-mode');
      const icon = themeToggle.querySelector('i');
      
      if (isLightMode) {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  }

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 120;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // ===== SMOOTH SCROLL (for anchor links) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('Lütfen tüm zorunlu alanları doldurunuz.');
        return;
      }

      // Simulate form submission
      const btn = contactForm.querySelector('.btn-submit');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        contactSuccess.classList.add('show');
      }, 1500);
    });
  }

  // ===== RESERVATION FORM =====
  const reservationForm = document.getElementById('reservationForm');
  const reservationSuccess = document.getElementById('reservationSuccess');

  if (reservationForm && reservationSuccess) {
    // Set minimum date to today
    const dateInput = document.getElementById('rez-date');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);

      // Set max date to 30 days from now
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      const maxYyyy = maxDate.getFullYear();
      const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
      const maxDd = String(maxDate.getDate()).padStart(2, '0');
      dateInput.setAttribute('max', `${maxYyyy}-${maxMm}-${maxDd}`);
    }

    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validation
      const name = document.getElementById('rez-name').value.trim();
      const phone = document.getElementById('rez-phone').value.trim();
      const guests = document.getElementById('rez-guests').value;
      const date = document.getElementById('rez-date').value;
      const time = document.getElementById('rez-time').value;
      const occasion = document.getElementById('rez-occasion').value;
      const notes = document.getElementById('rez-notes').value.trim();

      if (!name || !phone || !guests || !date || !time) {
        alert('Lütfen tüm zorunlu alanları (*) doldurunuz.');
        return;
      }

      // WhatsApp Message Formatting
      const wpNumber = "905076985076";
      let message = `*SEYİR RESTORANT YENİ REZERVASYON* 🍷\n\n`;
      message += `👤 *İsim:* ${name}\n`;
      message += `📞 *Telefon:* ${phone}\n`;
      message += `📅 *Tarih:* ${date}\n`;
      message += `⏰ *Saat:* ${time}\n`;
      message += `👥 *Kişi Sayısı:* ${guests}\n`;

      if (occasion) {
        const occText = document.getElementById('rez-occasion').options[document.getElementById('rez-occasion').selectedIndex].text;
        message += `🎉 *Özel Gün:* ${occText}\n`;
      }
      if (notes) {
        message += `📝 *Notlar:* ${notes}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${wpNumber}?text=${encodedMessage}`;

      // UI Update
      const btn = reservationForm.querySelector('.btn-submit');
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp\'a Yönlendiriliyor...';
      btn.style.background = "#25D366"; // WhatsApp yeşili
      btn.disabled = true;

      // Redirect to WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        // Formu temizle
        reservationForm.reset();

        btn.innerHTML = '<i class="fas fa-calendar-check"></i> Rezervasyon Yap';
        btn.style.background = "";
        btn.disabled = false;

      }, 1000);
    });
  }

  // ===== INFO BAND COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.info-item h3');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
      const target = counter.innerText;
      const isDecimal = target.includes('.');
      const hasPlus = target.includes('+');
      const hasK = target.includes('K');

      let numericTarget;
      let suffix = '';

      if (hasK) {
        numericTarget = parseFloat(target.replace('K', '').replace('+', ''));
        suffix = 'K+';
      } else if (hasPlus) {
        numericTarget = parseFloat(target.replace('+', ''));
        suffix = '+';
      } else if (isDecimal) {
        numericTarget = parseFloat(target);
      } else {
        numericTarget = parseInt(target);
      }

      let current = 0;
      const increment = numericTarget / 60;
      const duration = 2000;
      const stepTime = duration / 60;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
          current = numericTarget;
          clearInterval(timer);
        }

        if (isDecimal && !hasK) {
          counter.innerText = current.toFixed(1) + suffix;
        } else if (hasK) {
          counter.innerText = Math.round(current) + suffix;
        } else {
          counter.innerText = Math.round(current) + suffix;
        }
      }, stepTime);
    });

    countersAnimated = true;
  }

  // Trigger counter animation when info-band is visible
  const infoBand = document.querySelector('.info-band');
  if (infoBand) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(infoBand);
  }

  // ===== GALLERY LIGHTBOX (Simple) =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (!img) return;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.95); display: flex; align-items: center;
        justify-content: center; z-index: 10000; cursor: pointer;
        animation: fadeIn 0.3s ease;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src.replace('w=600', 'w=1200').replace('w=800', 'w=1200');
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 90%; max-height: 90vh; border-radius: 8px;
        box-shadow: 0 0 50px rgba(0,0,0,0.5);
      `;

      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 30px; font-size: 3rem;
        color: white; cursor: pointer; z-index: 10001;
        transition: color 0.3s ease;
      `;
      closeBtn.addEventListener('mouseenter', () => closeBtn.style.color = '#C41E3A');
      closeBtn.addEventListener('mouseleave', () => closeBtn.style.color = 'white');

      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Close lightbox
      function closeLightbox() {
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      }

      lightbox.addEventListener('click', closeLightbox);
      document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escClose);
        }
      });
    });
  });

});
