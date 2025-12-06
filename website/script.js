// Video Intro Handler
const videoIntro = document.getElementById('videoIntro');
const introVideo = document.getElementById('introVideo');

// Detect mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (videoIntro && introVideo && !isMobile) {
    // Desktop: Show intro video
    // Prevent body scroll while video is playing
    document.body.style.overflow = 'hidden';

    let hasStartedFadeOut = false;

    // When video ends or on error, fade out
    const fadeOutVideo = () => {
        if (hasStartedFadeOut) return; // Prevent multiple calls
        hasStartedFadeOut = true;

        console.log('Fading out video intro...');
        videoIntro.classList.add('fade-out');

        // After fade animation completes, remove element and allow scrolling
        setTimeout(() => {
            videoIntro.classList.add('hidden');
            document.body.style.overflow = '';
            console.log('Video intro hidden');

            // Start hero videos after intro is hidden
            playHeroVideos();
        }, 1500); // Match the CSS transition duration
    };

    const fadeTransitionDuration = 1500; // Match CSS transition duration

    // Start fade before video ends so it completes exactly when video ends
    introVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = introVideo.duration * 1000; // Convert to milliseconds
        console.log('Video duration:', videoDuration / 1000, 'seconds');

        // Start fade 1.5s before video ends, so fade completes when video ends
        const fadeStartTime = Math.max(0, videoDuration - fadeTransitionDuration);
        console.log('Fade will start at:', fadeStartTime / 1000, 'seconds');

        setTimeout(() => {
            console.log('Starting fade out');
            fadeOutVideo();
        }, fadeStartTime);
    });

    // When video ends, ensure intro is hidden (fade should already be complete)
    introVideo.addEventListener('ended', () => {
        console.log('Video ended');
        // Ensure the hidden class is applied
        setTimeout(() => {
            videoIntro.classList.add('hidden');
            document.body.style.overflow = '';
            playHeroVideos();
        }, 100);
    });

    // Safety fallback: Always fade out after 10 seconds maximum
    setTimeout(() => {
        console.log('Maximum duration reached, forcing fade out');
        fadeOutVideo();
    }, 10000);

    // Error handling: if video fails to load, fade out immediately
    introVideo.addEventListener('error', (e) => {
        console.error('Video failed to load:', e);
        fadeOutVideo();
    });

    // Allow users to skip by clicking anywhere
    videoIntro.addEventListener('click', (e) => {
        console.log('User clicked to skip');
        fadeOutVideo();
    });
} else {
    // Mobile or no intro video: Skip intro and start immediately
    if (videoIntro) {
        videoIntro.classList.add('hidden');
        videoIntro.style.display = 'none';
    }
    document.body.style.overflow = '';
    playHeroVideos();
}

// Hero Videos Handler
function playHeroVideos() {
    const heroVideo1 = document.getElementById('heroVideo1');
    const heroVideo2 = document.getElementById('heroVideo2');

    if (heroVideo1) {
        heroVideo1.play().catch(e => {
            console.log('Hero video 1 autoplay failed, trying to play on user interaction:', e);
            // Retry on first user interaction
            document.addEventListener('click', () => {
                heroVideo1.play().catch(err => console.log('Still failed:', err));
            }, { once: true });
        });
    }

    if (heroVideo2) {
        heroVideo2.play().catch(e => {
            console.log('Hero video 2 autoplay failed, trying to play on user interaction:', e);
            // Retry on first user interaction
            document.addEventListener('click', () => {
                heroVideo2.play().catch(err => console.log('Still failed:', err));
            }, { once: true });
        });
    }
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        navbar.classList.remove('scrolled');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll, .fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission handling (Netlify Forms)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;
    });
}

// Phone number formatting (Israeli format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// Add animation delays to process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.animationDelay = `${index * 0.1}s`;
});

// Scroll progress indicator (optional)
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const scrolled = window.pageYOffset;
        if (scrolled > 300) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});
