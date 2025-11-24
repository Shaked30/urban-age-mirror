// Cookie Consent Management
// Compliant with Israeli Privacy Law (Amendment 13)

// Check if user has already made a choice
document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookieConsent();

    if (!consent) {
        // Show banner after a short delay for better UX
        setTimeout(() => {
            showCookieBanner();
        }, 1000);
    } else {
        // Apply saved preferences
        applyCookiePreferences(consent);
    }
});

// Show the cookie banner
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.add('show');
    }
}

// Hide the cookie banner
function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

// Toggle cookie settings panel
function toggleCookieSettings() {
    const settings = document.getElementById('cookieSettings');
    if (settings) {
        if (settings.style.display === 'none' || settings.style.display === '') {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    }
}

// Accept only essential cookies
function acceptEssential() {
    const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };

    saveCookieConsent(consent);
    applyCookiePreferences(consent);
    hideCookieBanner();
}

// Accept all cookies
function acceptAll() {
    const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };

    saveCookieConsent(consent);
    applyCookiePreferences(consent);
    hideCookieBanner();
}

// Save custom preferences from settings panel
function savePreferences() {
    const consent = {
        essential: true, // Always true
        analytics: document.getElementById('analyticsCookies').checked,
        marketing: document.getElementById('marketingCookies').checked,
        timestamp: new Date().toISOString()
    };

    saveCookieConsent(consent);
    applyCookiePreferences(consent);
    hideCookieBanner();
}

// Save consent to localStorage
function saveCookieConsent(consent) {
    try {
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
    } catch (e) {
        console.error('Failed to save cookie consent:', e);
    }
}

// Get saved consent from localStorage
function getCookieConsent() {
    try {
        const consent = localStorage.getItem('cookieConsent');
        return consent ? JSON.parse(consent) : null;
    } catch (e) {
        console.error('Failed to get cookie consent:', e);
        return null;
    }
}

// Apply cookie preferences (enable/disable tracking scripts)
function applyCookiePreferences(consent) {
    // Essential cookies are always enabled (needed for basic site functionality)

    // Analytics cookies (e.g., Google Analytics)
    if (consent.analytics) {
        enableAnalytics();
    } else {
        disableAnalytics();
    }

    // Marketing cookies (e.g., Facebook Pixel, Google Ads)
    if (consent.marketing) {
        enableMarketing();
    } else {
        disableMarketing();
    }
}

// Enable Google Analytics (TODO: Add your GA tracking ID)
function enableAnalytics() {
    // Example: Google Analytics 4
    // Uncomment and replace GA_MEASUREMENT_ID with your actual ID when ready
    /*
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);
    */

    console.log('Analytics enabled');
}

// Disable Google Analytics
function disableAnalytics() {
    // Prevent GA from sending data
    if (window.gtag) {
        window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }
    console.log('Analytics disabled');
}

// Enable marketing cookies (TODO: Add your marketing scripts)
function enableMarketing() {
    // Example: Facebook Pixel
    /*
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
    */

    console.log('Marketing cookies enabled');
}

// Disable marketing cookies
function disableMarketing() {
    // Disable marketing scripts
    console.log('Marketing cookies disabled');
}

// Allow users to change their preferences later
// This function can be called from a "Cookie Settings" link in the footer
function reopenCookieSettings() {
    const consent = getCookieConsent();

    if (consent) {
        // Pre-fill checkboxes with current preferences
        document.getElementById('analyticsCookies').checked = consent.analytics;
        document.getElementById('marketingCookies').checked = consent.marketing;
    }

    showCookieBanner();
    toggleCookieSettings();
}

// Make reopenCookieSettings available globally if needed
window.reopenCookieSettings = reopenCookieSettings;
