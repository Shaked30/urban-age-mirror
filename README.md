# Urban Age Website

A modern, conversion-focused website for Urban Age - making urban renewal simple and accessible for building residents in Israel.

---

## 🎯 Project Overview

**Client**: Tal, Sagi, Gilad (Urban Age founders)
**Goal**: Generate leads from building residents interested in TAMA/urban renewal
**Tech Stack**: Static HTML, CSS, JavaScript
**Deployment**: Netlify
**Domain**: urban-age.com (via GoDaddy)

---

## 📁 Project Structure

```
/urban-age
├── index.html                           # Main website file
├── style.css                           # All styles (warm/friendly premium design)
├── script.js                           # Scroll animations, form handling, navigation
├── DEPLOYMENT_GUIDE.md                 # Complete deployment instructions
├── TASKS.md                            # Project task tracker
├── CLAUDE.md                           # Project context and requirements
├── LEGAL_COMPLIANCE.md                 # Technical legal compliance guide
├── COMPLIANCE_SUMMARY_FOR_TAL.md       # Business-focused compliance summary
├── COMPLIANCE_IMPLEMENTATION_STATUS.md # What we've done vs. what remains
└── docs/                               # Reference documentation
```

---

## ✨ Features

### Design
- **Premium + Friendly**: Sophisticated modern design with warm, approachable color palette
- **Warm Color Scheme**: Blues/teals (#4A90A4, #5BA3B8) + coral accents (#FF6B6B)
- **Smooth Animations**: Scroll-triggered fade-ins, hover effects, parallax hero
- **Fully Responsive**: Mobile-first design, perfect on all devices
- **Hebrew RTL Support**: Ready for Hebrew content (using Heebo font)

### Sections
1. **Hero**: Full-screen with clear value proposition and CTA
2. **Process**: 4-step visual explanation of how Urban Age works
3. **About**: Team introduction with placeholders for photos
4. **Education**: TAMA/urban renewal explanation for residents
5. **Contact**: Multi-channel contact options + lead capture form

### Lead Capture Form
- **Netlify Forms Integration**: Secure, spam-protected form handling
- **Fields**: Name, Phone, Email, Building Address, Optional message
- **Legal Compliance**: Required consent checkboxes (Privacy, Terms, Data Sharing)
- **Disclaimers**: Protects from liability (not professional advice)
- **No backend needed**: Netlify handles all form submissions
- **Email notifications**: Get notified of new leads instantly

### Legal Compliance (Israeli Law)
- **Privacy Law (Amendment 13)**: Contact form consents, disclaimers, templates ready
- **Accessibility (IS 5568)**: WCAG 2.1 AA structure, semantic HTML, keyboard navigation
- **Consumer Protection**: Company info in footer, Terms of Service, disclaimers
- **TAMA Liability Protection**: Careful language, no guarantees, professional advice recommendations

**See: [COMPLIANCE_SUMMARY_FOR_TAL.md](COMPLIANCE_SUMMARY_FOR_TAL.md) for complete details**

---

## 🚀 Quick Start

### Local Development

Simply open [index.html](index.html) in your browser - no build process needed!

### Deploy to Production

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

**Quick summary:**
1. Push code to GitHub
2. Connect to Netlify (automatic deploys)
3. Configure GoDaddy DNS
4. Enable HTTPS
5. Go live!

---

## 📝 Content Guidelines

### Tone of Voice
- **Warm and approachable** (not corporate/stiff)
- **Simple and clear** (no jargon)
- **Friendly but professional**
- **Resident-first focus** (caring about homeowner experience)

### Current Content Status
- ✅ All sections have placeholder content
- ✅ Hebrew language structure in place
- ⏳ **Needs**: Real team photos (Tal, Sagi, Gilad)
- ⏳ **Needs**: Company logo files
- ⏳ **Needs**: Real contact information (phone, email)

---

## 🎨 Design System

### Colors
```css
Primary Blue: #4A90A4, #5BA3B8
Accent Coral: #FF6B6B, #F4845F
Success Green: #6FCF97
Text Dark: #2D3436
Text Light: #636E72
Background: #F8F9FA
```

### Typography
- **Font**: Heebo (Hebrew-friendly, Google Fonts)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Headlines**: Large, light weight, generous letter-spacing
- **Body**: Regular weight, comfortable line-height (1.7)

### Spacing
- **Section padding**: 100px vertical (60px on mobile)
- **Container max-width**: 1200px
- **Border radius**: 12px (cards), 8px (inputs)

---

## 📋 Next Steps

### Immediate (Before Launch) 🔴
- [ ] **Get company details**: Registration number (ח.פ), physical address
- [ ] **Create legal pages**: Privacy Policy, Terms of Service, Accessibility Statement
- [ ] **Implement cookie banner**: Opt-in consent for analytics/marketing
- [ ] Get team photos from Tal, Sagi, Gilad
- [ ] Replace placeholder contact info with real phone/email
- [ ] Get company logo (if available)
- [ ] Review and adjust all copy/messaging
- [ ] Test form submissions with consent checkboxes

### Highly Recommended 🟡
- [ ] **Get attorney review**: Israeli lawyer to review legal pages
- [ ] **Get accessibility audit**: Professional WCAG 2.1 AA testing
- [ ] **Get insurance**: Professional liability + cyber liability
- [ ] **Train team**: Data handling and communication guidelines

### Phase 2 (Post-Launch)
- [ ] Add Hebrew language content (currently structure is RTL-ready)
- [ ] WhatsApp integration with real number
- [ ] Google Analytics setup
- [ ] Testimonials from residents
- [ ] Project portfolio/case studies
- [ ] Blog for SEO

### Nice-to-Have
- [ ] Building eligibility checker tool
- [ ] Multi-language support (English, Russian)
- [ ] Video content
- [ ] Live chat integration

---

## 🔧 Customization

### Update Contact Information

Edit [index.html](index.html) and find the Contact Section:

```html
<a href="tel:+972501234567">050-123-4567</a>  <!-- Update phone -->
<a href="mailto:hello@urban-age.com">hello@urban-age.com</a>  <!-- Update email -->
<a href="https://wa.me/972501234567">שלח הודעה</a>  <!-- Update WhatsApp -->
```

### Add Team Photos

Replace the photo placeholders in the About section:

```html
<div class="photo-placeholder">
    <span>ת</span>  <!-- Replace this div with: -->
</div>

<!-- With: -->
<img src="path/to/tal-photo.jpg" alt="טל">
```

### Change Colors

Edit [style.css](style.css) CSS variables at the top:

```css
:root {
    --primary-blue: #4A90A4;
    --coral: #FF6B6B;
    /* etc... */
}
```

---

## 📊 Monitoring

### View Form Submissions
1. Log in to Netlify
2. Go to your site → **Forms** tab
3. See all submissions + export to CSV

### Analytics
- **Netlify Analytics**: Built-in (bandwidth, visitors, top pages)
- **Google Analytics**: Add tracking code to `<head>` (see DEPLOYMENT_GUIDE.md)

---

## 🐛 Troubleshooting

### Form not working
- Check Netlify Forms tab - is form detected?
- Verify `data-netlify="true"` in form tag
- Check spam folder for email notifications

### Animations not smooth
- Test on different browsers
- Check if JavaScript is enabled
- Verify browser supports Intersection Observer API

### Mobile menu not working
- Check browser console for errors
- Verify `script.js` is loaded
- Test on actual mobile device (not just desktop resize)

---

## 📞 Support & Documentation

**For legal compliance**: See [COMPLIANCE_SUMMARY_FOR_TAL.md](COMPLIANCE_SUMMARY_FOR_TAL.md) (business guide)
**For technical compliance**: See [LEGAL_COMPLIANCE.md](LEGAL_COMPLIANCE.md) (detailed requirements)
**For compliance status**: See [COMPLIANCE_IMPLEMENTATION_STATUS.md](COMPLIANCE_IMPLEMENTATION_STATUS.md) (what's done)
**For deployment issues**: See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
**For design questions**: Review [CLAUDE.md](CLAUDE.md) project context
**For task tracking**: See [TASKS.md](TASKS.md)

---

## 🎉 Credits

Built with ❤️ for **Tal, Sagi, and Gilad**
**Urban Age** - Making urban renewal simple and stress-free

---

**Ready to deploy? Check out [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)!**
