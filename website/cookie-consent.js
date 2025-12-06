// Cookie Consent Management

// Check if user has already made a choice
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const banner = document.getElementById('cookieBanner');

    if (!consent && banner) {
        // Show banner after a short delay
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
}

// Accept all cookies
function acceptAll() {
    const preferences = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    hideCookieBanner();
    loadAnalytics();
}

// Accept only essential cookies
function acceptEssential() {
    const preferences = {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    hideCookieBanner();
}

// Toggle cookie settings panel
function toggleCookieSettings() {
    const settings = document.getElementById('cookieSettings');
    const buttons = document.querySelector('.cookie-buttons');

    if (settings && buttons) {
        const isVisible = settings.style.display !== 'none';
        settings.style.display = isVisible ? 'none' : 'block';
        buttons.style.display = isVisible ? 'flex' : 'none';

        if (!isVisible) {
            // Load current preferences
            const consent = localStorage.getItem('cookieConsent');
            if (consent) {
                const preferences = JSON.parse(consent);
                document.getElementById('analyticsCookies').checked = preferences.analytics || false;
                document.getElementById('marketingCookies').checked = preferences.marketing || false;
            }
        }
    }
}

// Save custom preferences
function savePreferences() {
    const preferences = {
        essential: true,
        analytics: document.getElementById('analyticsCookies').checked,
        marketing: document.getElementById('marketingCookies').checked,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    hideCookieBanner();

    if (preferences.analytics) {
        loadAnalytics();
    }
}

// Hide cookie banner
function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

// Load Google Analytics (only if consented)
function loadAnalytics() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return;

    const preferences = JSON.parse(consent);
    if (!preferences.analytics) return;

    // Add Google Analytics code here when ready
    // Example:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'GA_MEASUREMENT_ID');

    console.log('Analytics loaded (placeholder)');
}

// Show cookie settings from footer link
function showCookieSettings() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'block';
        banner.classList.add('show');
        toggleCookieSettings();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkCookieConsent();

    // Load analytics if already consented
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
        const preferences = JSON.parse(consent);
        if (preferences.analytics) {
            loadAnalytics();
        }
    }
});
