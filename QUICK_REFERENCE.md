# Urban Age Form Integration - Quick Reference

**📋 Fast access to key information**

---

## 🔑 Environment Variables Needed

Add these to Netlify (Site Settings → Environment Variables):

```bash
# Resend Email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@urban-age.com
NOTIFICATION_EMAIL=tal@urban-age.com

# Google Sheets
GOOGLE_SHEET_ID=your_sheet_id_from_url
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account"...entire JSON...}
```

---

## 📊 Google Sheet Setup

### Column Headers (Row 1):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| תאריך | שם | טלפון | אימייל | כתובת | שמע עלינו מ | הסכמה לשיווק | סטטוס |

### Sheet Name:
- Must be `Sheet1` (or update code in `submit-form.js`)

---

## 🚀 Deployment Commands

```bash
# Install dependencies
npm install

# Test locally
netlify dev

# Deploy to production
git add .
git commit -m "Your message"
git push

# Or manual deploy
netlify deploy --prod
```

---

## 🧪 Testing Checklist

- [ ] Email received at notification address
- [ ] New row appears in Google Sheet
- [ ] Form shows success message
- [ ] Form clears after submission
- [ ] Loading spinner appears during submission
- [ ] Error messages work (test without internet)
- [ ] Mobile responsive
- [ ] Works in Chrome, Safari, Firefox

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `netlify/functions/submit-form.js` | Main form handler |
| `website/form-handler.js` | Frontend form logic |
| `website/index.html` | Contact form HTML |
| `netlify.toml` | Netlify configuration |
| `package.json` | Dependencies |
| `.env.example` | Environment variables template |

---

## 🔧 Common Tasks

### Update Email Template
Edit: `netlify/functions/submit-form.js` → `emailHtml` variable

### Change Notification Email
Netlify dashboard → Environment Variables → Update `NOTIFICATION_EMAIL`

### Add Form Field
1. Update HTML form
2. Update `website/form-handler.js` (formData object)
3. Update `netlify/functions/submit-form.js` (email template & sheets)
4. Add column to Google Sheet

### View Form Submissions
- **Google Sheet:** [Your Sheet URL]
- **Netlify Logs:** Dashboard → Functions → submit-form

---

## 🆘 Quick Troubleshooting

### Form doesn't submit
- Check browser console for errors
- Verify `form-handler.js` is loaded
- Test with `netlify dev`

### No email received
- Check spam folder
- Verify `RESEND_API_KEY` in Netlify
- Check Resend dashboard for delivery status

### Not logging to Google Sheets
- Verify service account has Editor access to sheet
- Check `GOOGLE_SHEET_ID` is correct
- Verify sheet name is `Sheet1`

### See full guide
→ [FORM_INTEGRATION_SETUP.md](FORM_INTEGRATION_SETUP.md)

---

## 📞 Quick Links

- **Resend Dashboard:** https://resend.com/emails
- **Google Sheet:** [Add your URL here after setup]
- **Netlify Dashboard:** https://app.netlify.com
- **Full Setup Guide:** [FORM_INTEGRATION_SETUP.md](FORM_INTEGRATION_SETUP.md)

---

**⚡ Setup Time:** ~25 minutes total

**💰 Cost:** $0 (free tiers for both Resend & Google Sheets)
