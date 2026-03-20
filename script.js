// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when they come into view
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

initCounters();

// ===== SUBSYSTEM TABS =====
function initSubsystemTabs() {
    const tabs = document.querySelectorAll('.subsystem-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and items
            document.querySelectorAll('.subsystem-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.subsystem-item').forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding item
            const subsystemId = tab.dataset.subsystem;
            const item = document.getElementById(subsystemId);
            if (item) {
                item.classList.add('active');
            }
        });
    });

    // Set first tab as active by default
    if (tabs.length > 0) {
        tabs[0].classList.add('active');
    }
}

initSubsystemTabs();

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Simulate form submission
            console.log('Form submitted:', data);

            // Show success message
            if (formMessage) {
                formMessage.textContent = '✓ Message sent! We\'ll get back to you within 48 hours.';
                formMessage.style.display = 'block';
                formMessage.style.animation = 'fadeIn 0.3s ease';
            }

            // Reset form
            form.reset();

            // Hide message after 4 seconds
            setTimeout(() => {
                if (formMessage) {
                    formMessage.style.display = 'none';
                }
            }, 4000);
        });
    }
}

initContactForm();

// ===== SMOOTH SCROLL BEHAVIOR =====
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

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all cards and sections
    document.querySelectorAll('.role-card, .event-card, .member-card, .award-card, .tier-card, .spec-card').forEach(el => {
        observer.observe(el);
    });
}

initScrollAnimations();

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

updateActiveNavLink();

// ===== SUPPORT BUTTON CLICK HANDLER =====
const supportBtn = document.querySelector('.btn-support');
if (supportBtn) {
    supportBtn.addEventListener('click', () => {
        // Redirect to contact page
        window.location.href = 'contact.html';
    });
}

// ===== PARALLAX EFFECT (Optional Enhancement) =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.scrollY;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            if (distance > -window.innerHeight && distance < window.innerHeight) {
                el.style.transform = `translateY(${distance * 0.5}px)`;
            }
        });
    });
}

initParallax();

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu) {
        navMenu.classList.remove('active');
    }
});

// ===== UTILITY: Format numbers with commas =====
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ===== UTILITY: Check if element is in viewport =====
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===== LAZY LOAD IMAGES (Optional) =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ===== CONSOLE MESSAGE =====
console.log('%c🤖 Technobolts FTC Team #7244', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cEngineering Tomorrow\'s Solutions', 'font-size: 14px; color: #2563eb;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #7c3aed;');
