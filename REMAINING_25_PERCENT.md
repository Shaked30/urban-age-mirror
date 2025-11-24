# The Remaining 25%

**Current Progress:** 75% Complete
**Remaining:** 25% (broken down below)
**Reference:** All items tracked in [TASKS.md](TASKS.md)

---

## 📊 Breakdown by Category

### 🔴 CRITICAL - Cannot Launch Without (15%)

#### 1. Legal Pages Creation (~10%)
**Status:** Templates ready, need customization
**Tracked in TASKS.md:** Lines 81-83

- [ ] **Privacy Policy page** (privacy.html)
  - Hebrew version (primary)
  - English version (optional but recommended)
  - Template: [LEGAL_COMPLIANCE.md](LEGAL_COMPLIANCE.md#a-privacy-policy-מדיניות-פרטיות) Section 5A
  - Needs: Company details (name, registration #, address, contact)

- [ ] **Terms of Service page** (terms.html)
  - Hebrew version (primary)
  - English version (optional but recommended)
  - Template: [LEGAL_COMPLIANCE.md](LEGAL_COMPLIANCE.md#b-terms-of-service-תנאי-שימוש) Section 5B
  - Needs: Company details, service description

- [ ] **Accessibility Statement** (accessibility.html)
  - Hebrew version (primary)
  - English version (optional but recommended)
  - Template: [LEGAL_COMPLIANCE.md](LEGAL_COMPLIANCE.md#c-accessibility-statement-הצהרת-נגישות) Section 5C
  - Needs: Accessibility coordinator name/contact, audit date

**Who can do it:**
- Option A: We create from templates once you provide company details
- Option B: You/attorney create using our templates
- Option C: Attorney creates from scratch (most expensive)

**Time estimate:** 4-8 hours with templates, 2-3 days with attorney

---

#### 2. Company Information (~3%)
**Status:** Placeholders in code, need actual data
**Tracked in TASKS.md:** Lines 93-96, 203-204

Needed from Urban Age team:
- [ ] Company registration number (ח.פ)
- [ ] Physical office address (required by Consumer Protection Law)
- [ ] Actual phone number (currently: 050-123-4567)
- [ ] Actual email (currently: hello@urban-age.com)
- [ ] WhatsApp number (currently same placeholder)

**Where to update:**
- [index.html](index.html:322-325) - Footer company section
- [index.html](index.html:231-241) - Contact section

**Time estimate:** 5 minutes once you have the info

---

#### 3. Cookie Consent Banner (~2%)
**Status:** Not implemented
**Tracked in TASKS.md:** Line 84, 339

**What it is:**
- Small banner at bottom of screen on first visit
- User chooses: Essential cookies only, or Accept analytics/marketing
- Required by Privacy Law Amendment 13 (Aug 2025)

**Options:**
- Option A: We build custom banner (3-4 hours)
- Option B: Use service like Cookiebot, OneTrust (~₪2,000-5,000/year)
- Option C: Simple DIY banner (we provide code, you customize)

**Time estimate:** 3-4 hours for us to build, or 1 hour to integrate service

---

### 🟡 HIGHLY RECOMMENDED Before Launch (7%)

#### 4. Professional Reviews (~5%)
**Status:** Not done
**Tracked in TASKS.md:** Lines 142-145

**Israeli Attorney Review (₪5,000-15,000):**
- [ ] Review Privacy Policy
- [ ] Review Terms of Service
- [ ] Review Accessibility Statement
- [ ] Review disclaimers on website
- [ ] Advise on professional liability insurance
- [ ] Review construction company contracts

**Why needed:**
- We're developers, not Israeli lawyers
- Amendment 13 is new (Aug 2025) - interpretation evolving
- Attorney sign-off protects you from "didn't know" claims
- Cost: ₪5K-15K vs. ₪500K+ in fines

**Accessibility Audit (₪5,000-15,000):**
- [ ] WCAG 2.1 Level AA compliance testing
- [ ] Screen reader testing (NVDA, JAWS)
- [ ] Keyboard navigation testing
- [ ] Color contrast verification
- [ ] Test with actual disabled users
- [ ] Written report + remediation recommendations

**Why needed:**
- ₪50,000 per person for accessibility lawsuits
- Lawsuits are common in Israel
- Professional audit = evidence of good faith compliance
- Insurance companies may require it

**Time estimate:** 1-2 weeks for attorney, 1 week for accessibility audit

---

#### 5. Testing (~2%)
**Status:** Partially done (we tested during development)
**Tracked in TASKS.md:** Lines 85-90

- [ ] **Cross-browser testing** (Chrome, Safari, Firefox, Edge)
  - Desktop versions
  - Mobile versions

- [ ] **Mobile device testing** (not just browser resize)
  - iOS Safari
  - Android Chrome
  - Hamburger menu functionality
  - Form submission
  - Touch interactions

- [ ] **Form testing with consent checkboxes**
  - All required checkboxes must be checked to submit
  - Try submitting without checking
  - Verify form submits with checkboxes
  - Check Netlify Forms dashboard receives data

- [ ] **Accessibility testing**
  - Navigate entire site using only keyboard (Tab, Enter, Arrow keys)
  - Test with screen reader (NVDA - free, or VoiceOver on Mac)
  - Verify all images have alt text
  - Check color contrast

**Who can do it:**
- Basic testing: You/us (2-3 hours)
- Professional testing: QA firm or accessibility company

**Time estimate:** 3-5 hours for basic testing

---

### 🟢 POST-LAUNCH - Can Do After Going Live (3%)

#### 6. Insurance & Policies (~2%)
**Status:** Not obtained
**Tracked in TASKS.md:** Section "Highly Recommended" (implied)

**Professional Liability Insurance (₪5,000-10,000/year):**
- Covers claims from clients re: TAMA advice/facilitation
- Protects if project fails or clients sue
- Required if you want peace of mind

**Cyber Liability Insurance (₪2,000-5,000/year):**
- Covers data breaches
- Covers if you accidentally expose client data
- Recommended given you collect building addresses

**Data Retention Policy:**
- Document: How long you keep lead data
- Recommendation: Delete after 2 years of inactivity
- Required: Process to honor deletion requests

**Team Training:**
- Train team on data handling (Section 5, COMPLIANCE_SUMMARY_FOR_TAL.md)
- Train team on what they can/can't say (Section 4, COMPLIANCE_SUMMARY_FOR_TAL.md)
- Document training (proof of compliance)

**Time estimate:** 1-2 days to set up policies and training

---

#### 7. Ongoing Compliance (~1%)
**Status:** Not started (post-launch)
**Tracked in TASKS.md:** Line 147 (implied in "Ongoing")

**Bi-annual Accessibility Audits:**
- Every 6-12 months
- Re-test WCAG 2.1 AA compliance
- Address any new issues
- Cost: ₪5,000-10,000 per audit

**Monitor for Law Changes:**
- Privacy Protection Authority website
- Accessibility law updates
- Consumer protection changes

**Update Legal Pages:**
- When services change
- When data practices change
- When laws change
- At least annually

**Respond to Data Subject Requests:**
- Within 30 days
- Track all requests
- Document responses

**Time estimate:** Ongoing, ~2-4 hours per quarter

---

## 📋 Summary Table

| Task | Priority | Effort | Who Does It | Cost | Tracked in TASKS.md |
|------|----------|--------|-------------|------|---------------------|
| Privacy Policy | 🔴 Critical | 2-4 hrs | Us/You/Attorney | ₪0-5K | Line 81 |
| Terms of Service | 🔴 Critical | 2-4 hrs | Us/You/Attorney | ₪0-5K | Line 82 |
| Accessibility Statement | 🔴 Critical | 1-2 hrs | Us/You/Attorney | ₪0-5K | Line 83 |
| Company Info | 🔴 Critical | 5 min | You (provide data) | ₪0 | Lines 93-96, 203-204 |
| Cookie Banner | 🔴 Critical | 3-4 hrs | Us/Service | ₪0-5K/yr | Lines 84, 339 |
| Attorney Review | 🟡 High | 1-2 wks | Attorney | ₪5-15K | Lines 142-145 |
| Accessibility Audit | 🟡 High | 1 wk | Accessibility Firm | ₪5-15K | Line 89 |
| Testing | 🟡 High | 3-5 hrs | Us/You | ₪0 | Lines 85-90 |
| Insurance | 🟢 Post-Launch | 1-2 days | Insurance Broker | ₪5-15K/yr | Implied |
| Policies & Training | 🟢 Post-Launch | 1-2 days | You/Us | ₪0 | Implied |
| Ongoing Compliance | 🟢 Post-Launch | 2-4 hrs/qtr | You | ₪5-10K/yr | Line 147 |

**Total Additional Cost Estimate:**
- Minimum (DIY): ₪5-15K/year (insurance only)
- Recommended (professional reviews): ₪20-50K year 1, then ₪10-20K/year ongoing

---

## 🎯 Next Steps (Prioritized)

### This Week:
1. **Urban Age provides company information** (5 minutes)
   - Company registration number
   - Physical address
   - Phone, email, WhatsApp

2. **Decide on legal pages** (decision needed)
   - Option A: We create from templates (fastest, 4-8 hours)
   - Option B: You create from templates (free, slower)
   - Option C: Attorney creates (safest, most expensive)

3. **Decide on cookie banner** (decision needed)
   - Option A: We build custom (3-4 hours)
   - Option B: Use paid service (easiest)
   - Option C: Simple DIY (we provide code)

### Next 2 Weeks:
4. **Complete legal pages** (whoever is doing them)
5. **Implement cookie banner**
6. **Update company info in code**
7. **Basic testing** (cross-browser, mobile, form)

### Before Launch:
8. **Attorney review** (highly recommended)
9. **Accessibility audit** (highly recommended)
10. **Final testing pass**
11. **Deploy to Netlify**

### After Launch:
12. **Get insurance** (within 30 days)
13. **Set up policies** (data retention, etc.)
14. **Train team** (data handling, communication guidelines)
15. **Schedule ongoing audits**

---

## 📞 Questions to Ask Tal/Team

**Immediate:**
1. Can you send us company registration #, address, phone, email? (We need this to fill in the website)
2. Do you want us to create the 3 legal pages using our templates, or will you do it with an attorney?
3. For the cookie banner - should we build it, or do you want to use a paid service?

**Soon:**
4. Do you have a budget for attorney review? (₪5-15K recommended)
5. Do you have a budget for accessibility audit? (₪5-15K recommended)
6. When do you want to launch? (Affects timeline for professional reviews)

**Later:**
7. Who will be the "accessibility coordinator" listed in the Accessibility Statement?
8. Do you want us to help with insurance sourcing?
9. Do you want us to train your team on data handling and communication guidelines?

---

## ✅ What's Already Done (The 75%)

Just to remind you of the heavy lifting already complete:

**Website (60%):**
- ✅ Full design and development
- ✅ All 5 sections (Hero, Process, About, Education, Contact)
- ✅ Responsive mobile/desktop
- ✅ Animations and interactions
- ✅ Hebrew RTL structure
- ✅ Netlify Forms integration

**Legal Compliance (15%):**
- ✅ Research (Privacy, Accessibility, Consumer Protection, TAMA)
- ✅ Contact form with consent checkboxes
- ✅ Disclaimers and legal language
- ✅ Footer legal structure
- ✅ Templates for all legal pages
- ✅ Guidelines for team
- ✅ Comprehensive documentation (3 guides totaling 100+ pages)

**The 75% that's done represents hundreds of hours of work. The remaining 25% is mostly content/customization using what we've built.**

---

**All tasks are tracked in [TASKS.md](TASKS.md). This document just breaks down the remaining 25% in detail.**
