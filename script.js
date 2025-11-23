// ========================================
// Mobile Navigation Toggle
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// Scroll Animations - Intersection Observer
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Only prevent default if target exists
        if (targetId !== '#' && document.querySelector(targetId)) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Form Submission Handling
// ========================================

const contactForm = document.querySelector('.contact-form');
const formSuccess = document.querySelector('.form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Netlify handle the form submission
        // We'll just show a success message after submission

        // Note: In production with Netlify, you might want to handle
        // the form submission differently. For now, this prevents
        // the default redirect and shows a custom success message.

        // Netlify Forms will still work with the default behavior,
        // so we'll comment out the custom handling for now.

        /*
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            contactForm.reset();
            formSuccess.classList.remove('hidden');
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        })
        .catch((error) => {
            alert('אופס! משהו השתבש. נסה שוב או צור איתנו קשר בטלפון.');
            console.error('Form submission error:', error);
        });
        */
    });
}

// ========================================
// Parallax Effect on Hero (Optional)
// ========================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ========================================
// Add smooth reveal animation to hero elements
// ========================================

window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ========================================
// Utility: Detect if element is in viewport
// ========================================

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// Add stagger animation to process cards
// ========================================

const processCards = document.querySelectorAll('.process-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

processCards.forEach(card => cardObserver.observe(card));

// ========================================
// Console message for developers
// ========================================

console.log('%c🏗️ Urban Age Website', 'font-size: 20px; font-weight: bold; color: #C7A770;');
console.log('%cBuilt with ❤️ for Tal, Sagi, and Gilad', 'font-size: 12px; color: #999999;');
