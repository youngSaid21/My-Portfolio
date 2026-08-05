/* ==============================================
   PORTFOLIO — MAIN JAVASCRIPT
   Mamadou Saidou Cherif Diallo — AI Engineer
   
   Modules:
   1. AOS Initialization
   2. Typing Animation
   3. Counter Animation (Career Highlights)
   4. Navigation (scroll, active link, mobile)
   5. Project Filtering
   ============================================== */

// ==============================================
// 1. AOS INITIALIZATION
// ==============================================

AOS.init({
    duration: 700,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});

// ==============================================
// 2. TYPING ANIMATION
// ==============================================

(function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const titles = [
        'AI Engineer',
        'Generative AI Engineer',
        'LLM Systems Builder',
        'Machine Learning Engineer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 80;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER_TYPE = 2000;
    const PAUSE_AFTER_DELETE = 400;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            charIndex--;
            typingElement.textContent = currentTitle.substring(0, charIndex);
        } else {
            charIndex++;
            typingElement.textContent = currentTitle.substring(0, charIndex);
        }

        let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

        if (!isDeleting && charIndex === currentTitle.length) {
            // Finished typing — pause then start deleting
            delay = PAUSE_AFTER_TYPE;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting — move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            delay = PAUSE_AFTER_DELETE;
        }

        setTimeout(type, delay);
    }

    type();
})();

// ==============================================
// 3. COUNTER ANIMATION (Career Highlights)
// ==============================================

(function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length === 0) return;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 1500;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
})();

// ==============================================
// 4. NAVIGATION
// ==============================================

(function initNavigation() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // --- Nav background on scroll ---
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // --- Mobile menu toggle ---
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('nav-active');
            document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        allNavLinks.forEach((link) => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('nav-active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip placeholder links

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Active nav link on scroll ---
    if (allNavLinks.length > 0) {
        const sections = document.querySelectorAll('section[id]');

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        allNavLinks.forEach((link) => {
                            link.classList.toggle(
                                'active',
                                link.getAttribute('href') === `#${id}`
                            );
                        });
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }
})();

// ==============================================
// 5. PROJECT FILTERING
// ==============================================

(function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter cards with animation
            projectCards.forEach((card) => {
                const matches = filter === 'all' || card.getAttribute('data-category') === filter;
                
                if (matches) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
})();
