// ULTRA-CRITICAL SAFETY FALLBACK - Ensure page NEVER stays blank
// This runs immediately and sets up multiple safety nets
(function() {
    'use strict';

    // IMMEDIATE: Allow scrolling in case something goes wrong
    const ensurePageVisible = () => {
        document.body.style.overflow = '';
        const videoIntro = document.getElementById('videoIntro');
        if (videoIntro && !videoIntro.classList.contains('hidden')) {
            console.warn('Emergency fallback: hiding video intro');
            videoIntro.classList.add('hidden');
        }
    };

    // First fallback: 2 seconds (aggressive for iOS)
    setTimeout(ensurePageVisible, 2000);

    // Second fallback: 5 seconds (absolute maximum)
    setTimeout(ensurePageVisible, 5000);

    // Emergency fallback: if page is still not scrollable after 1 second, force it
    setTimeout(() => {
        if (document.body.style.overflow === 'hidden') {
            console.error('Page was stuck with overflow:hidden - forcing fix');
            document.body.style.overflow = '';
        }
    }, 1000);
})();

// Define playHeroVideos FIRST so it's available for iOS early exit
function playHeroVideos() {
    console.log('playHeroVideos called');
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

// Video Intro Handler
const videoIntro = document.getElementById('videoIntro');
const introVideo = document.getElementById('introVideo');
const tapToStartOverlay = document.getElementById('tapToStartOverlay');
const tapToStartButton = document.getElementById('tapToStartButton');

// Detect mobile devices and iOS specifically
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
console.log('Device detection:', isMobile ? 'Mobile' : 'Desktop', isIOS ? '(iOS)' : '');

// Run video intro on all devices (including iOS)
if (videoIntro && introVideo) {
    // Prevent body scroll while video is playing
    document.body.style.overflow = 'hidden';

    let hasStartedFadeOut = false;
    let videoStarted = false;

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

    // Function to start the video
    const startVideo = () => {
        if (videoStarted) return;
        videoStarted = true;

        console.log('Starting video...');

        // Hide tap to start overlay
        if (tapToStartOverlay) {
            tapToStartOverlay.style.display = 'none';
        }

        // Try to play the video
        const playPromise = introVideo.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video playing successfully');
                })
                .catch(error => {
                    console.error('Video play failed:', error);
                    // If play fails, skip to main content
                    fadeOutVideo();
                });
        }
    };

    // Mobile: Show tap-to-start button
    if (isMobile) {
        console.log('Mobile detected - showing tap to start button');

        if (tapToStartOverlay && tapToStartButton) {
            tapToStartOverlay.style.display = 'flex';
            tapToStartOverlay.style.opacity = '1';
            console.log('Tap to start overlay is now visible');

            tapToStartButton.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Tap to start button clicked');
                tapToStartOverlay.style.display = 'none';
                startVideo();
            });

            // iOS SAFETY: If user doesn't tap within 3 seconds, auto-skip to prevent blank page
            if (isIOS) {
                setTimeout(() => {
                    if (!videoStarted) {
                        console.warn('iOS: User did not tap, auto-skipping video to prevent blank page');
                        fadeOutVideo();
                    }
                }, 3000);
            }
        } else {
            console.error('Tap to start elements not found!');
            // If overlay elements missing, just start video and hope for the best
            startVideo();
        }
    } else {
        // Desktop: Auto-start (existing behavior)
        console.log('Desktop detected - auto-starting video');
        if (tapToStartOverlay) {
            tapToStartOverlay.style.display = 'none';
        }
        startVideo();
    }

    // Wait for video to fully complete before fading
    introVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = introVideo.duration * 1000; // Convert to milliseconds
        console.log('Video duration:', videoDuration / 1000, 'seconds');

        // Start fade AFTER video ends (not before)
        console.log('Fade will start when video ends at:', videoDuration / 1000, 'seconds');

        setTimeout(() => {
            console.log('Video complete, starting fade out');
            fadeOutVideo();
        }, videoDuration);
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

    // Safety fallback: Always fade out after 12 seconds maximum (video is ~6s + 1.5s fade + buffer)
    setTimeout(() => {
        console.log('Maximum duration reached, forcing fade out');
        fadeOutVideo();
    }, 12000);

    // Error handling: if video fails to load, fade out immediately
    introVideo.addEventListener('error', () => {
        console.error('Video failed to load');
        fadeOutVideo();
    });

    // Allow users to skip by clicking anywhere (not on the button)
    videoIntro.addEventListener('click', (e) => {
        // Don't skip if clicking the button
        if (e.target !== tapToStartButton && videoStarted) {
            console.log('User clicked to skip');
            fadeOutVideo();
        }
    });
} else {
    // No intro video element found
    document.body.style.overflow = '';
    playHeroVideos();
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
