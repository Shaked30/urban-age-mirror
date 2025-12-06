/**
 * Form Submission Handler for Urban Age Contact Form
 * Handles validation, submission to Netlify Function, and user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');

  if (!form) {
    console.warn('Contact form not found');
    return;
  }

  // Create and inject success/error message container
  const messageContainer = document.createElement('div');
  messageContainer.className = 'form-message';
  messageContainer.setAttribute('role', 'alert');
  messageContainer.setAttribute('aria-live', 'polite');
  form.insertBefore(messageContainer, form.firstChild);

  // Form submission handler
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Clear previous messages
    messageContainer.textContent = '';
    messageContainer.className = 'form-message';

    // Get form data
    const formData = {
      name: form.querySelector('#name').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      email: form.querySelector('#email').value.trim(),
      address: form.querySelector('#address').value.trim(),
      message: form.querySelector('#message')?.value.trim() || '',
      hearAbout: form.querySelector('#hear-about')?.value || '',
      privacyConsent: form.querySelector('#privacy-consent').checked,
      termsConsent: form.querySelector('#terms-consent').checked,
      dataSharingConsent: form.querySelector('#data-sharing').checked,
    };

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      showMessage('אנא מלא את כל השדות הנדרשים', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage('כתובת האימייל אינה תקינה', 'error');
      return;
    }

    // Validate phone format (Israeli phone)
    const phoneRegex = /^[\d\-\+\(\)\s]{9,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      showMessage('מספר הטלפון אינו תקין', 'error');
      return;
    }

    // Validate consents
    if (!formData.privacyConsent || !formData.termsConsent || !formData.dataSharingConsent) {
      showMessage('יש לאשר את כל ההסכמות הנדרשות', 'error');
      return;
    }

    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'שולח...';
    submitButton.classList.add('loading');

    try {
      // Submit to Netlify Function
      const response = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success
        showMessage(result.message || 'הפרטים נשלחו בהצלחה! ניצור איתך קשר בקרוב.', 'success');
        form.reset();

        // Track success event (if analytics exists)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: 'Contact Form',
          });
        }

        // Scroll to success message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Error from server
        showMessage('אירעה שגיאה בשליחת הפרטים. אנא נסה שוב או צור קשר טלפונית.', 'error');
        console.error('Form submission error:', result);
      }
    } catch (error) {
      // Network or other error
      showMessage('אירעה שגיאה בשליחת הפרטים. אנא בדוק את החיבור לאינטרנט ונסה שוב.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
      submitButton.classList.remove('loading');
    }
  });

  /**
   * Show success or error message
   */
  function showMessage(message, type) {
    messageContainer.textContent = message;
    messageContainer.className = `form-message form-message-${type}`;
    messageContainer.style.display = 'block';

    // Auto-hide error messages after 8 seconds
    if (type === 'error') {
      setTimeout(() => {
        messageContainer.style.display = 'none';
      }, 8000);
    }
  }

  // Real-time field validation (optional UX enhancement)
  const emailField = form.querySelector('#email');
  const phoneField = form.querySelector('#phone');

  emailField?.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.classList.add('field-error');
      this.setAttribute('aria-invalid', 'true');
    } else {
      this.classList.remove('field-error');
      this.removeAttribute('aria-invalid');
    }
  });

  phoneField?.addEventListener('blur', function() {
    const phoneRegex = /^[\d\-\+\(\)\s]{9,15}$/;
    if (this.value && !phoneRegex.test(this.value)) {
      this.classList.add('field-error');
      this.setAttribute('aria-invalid', 'true');
    } else {
      this.classList.remove('field-error');
      this.removeAttribute('aria-invalid');
    }
  });
});
