/* ================================================
   Datnya Monzón Portfolio - JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initPortfolioScroll();
    initProjectTabs();
    initLightbox();
    initCounters();
    initActiveNavLink();
    initContactForm();
});

/* ================================================
   NAVBAR
   ================================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect - transparent to solid
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/* ================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ================================================ */

function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger children animations
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach((el, index) => {
        // Add stagger delay for elements in the same section
        if (el.closest('.results-grid') || el.closest('.stats-grid') || el.closest('.contact-cards')) {
            el.dataset.delay = index * 100;
        }
        observer.observe(el);
    });
}

/* ================================================
   PORTFOLIO SCROLL (Smooth scroll to projects)
   ================================================ */

function initPortfolioScroll() {
    const openBtn = document.getElementById('openPortfolio');
    const projectsSection = document.getElementById('proyectos');

    if (!openBtn || !projectsSection) return;

    openBtn.addEventListener('click', () => {
        projectsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

/* ================================================
   PROJECT TABS
   ================================================ */

function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.service-card');
    const panels = document.querySelectorAll('.project-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Deactivate all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activate clicked tab and corresponding panel
            btn.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Re-trigger animations for the new panel
                const animElements = targetPanel.querySelectorAll('.animate-on-scroll');
                animElements.forEach(el => {
                    el.classList.add('visible');
                });
            }
        });
    });
}

/* ================================================
   ANIMATED COUNTERS
   ================================================ */

function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters(statNumbers);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
}

function animateCounters(elements) {
    elements.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);

            const current = Math.round(eased * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    });
}

/* ================================================
   ACTIVE NAV LINK ON SCROLL
   ================================================ */

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

/* ================================================
   PARALLAX EFFECT ON HERO (subtle)
   ================================================ */

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const circles = hero.querySelectorAll('.hero-circle');
        circles.forEach((circle, i) => {
            const speed = (i + 1) * 0.03;
            circle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, { passive: true });

/* ================================================
   CONTACT FORM
   ================================================ */

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    const btnSubmit = document.getElementById('btnSubmit');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const originalBtnText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = 'Enviando...';
        btnSubmit.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success
                form.style.display = 'none';
                successMsg.style.display = 'block';
                form.reset();
            } else {
                alert('Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.');
                btnSubmit.innerHTML = originalBtnText;
                btnSubmit.disabled = false;
            }
        } catch (error) {
            alert('Hubo un problema de conexión. Por favor, intenta de nuevo.');
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.disabled = false;
        }
    });
}

/* ================================================
   LIGHTBOX
   ================================================ */
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
    `;
    document.body.appendChild(lightbox);
    const lightboxImg = document.getElementById('lightbox-img');

    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('raw-gif') || (e.target.tagName === 'IMG' && e.target.closest('.project-panel'))) {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src;
        } else if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
        }
    });
}
