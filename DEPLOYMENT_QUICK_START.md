# Quick Start: Deploy Urban Age with Form Integration

**Status:** Ready to deploy! ✅

---

## 📝 What You Have

✅ **Resend API Key:** `re_KxzrBwYM_6V7h8SRRQpZpYBezen37bKXu`
✅ **Google Sheet:** https://docs.google.com/spreadsheets/d/1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY/edit
✅ **Google Service Account JSON:** `google-credentials.json` (in project root)
✅ **Netlify Site:** https://jocular-toffee-039ec0.netlify.app

---

## 🚀 Deploy in 3 Steps

### Step 1: Get Netlify Credentials (5 minutes)

1. **Get Auth Token:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - User Settings → Applications → Personal access tokens
   - Click "New access token"
   - Copy the token

2. **Get Site ID:**
   - Open your site in Netlify
   - Site settings → Site information → Site ID
   - Copy the Site ID

### Step 2: Set Up GitHub Secrets (5 minutes)

Go to: https://github.com/YOUR_USERNAME/urban-age/settings/secrets/actions

Add these 7 secrets:

| Secret Name | Value |
|-------------|-------|
| `NETLIFY_AUTH_TOKEN` | Token from Step 1 |
| `NETLIFY_SITE_ID` | Site ID from Step 1 |
| `RESEND_API_KEY` | `re_KxzrBwYM_6V7h8SRRQpZpYBezen37bKXu` |
| `RESEND_FROM_EMAIL` | `noreply@urban-age.com` or `onboarding@resend.dev` |
| `NOTIFICATION_EMAIL` | `tal@urban-age.com` |
| `GOOGLE_SHEET_ID` | `1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY` |
| `GOOGLE_SHEETS_CREDENTIALS` | Paste entire contents of `google-credentials.json` |

### Step 3: Share Google Sheet (2 minutes)

1. Open `google-credentials.json`
2. Copy the `client_email`: `urban-age-form-handler@urban-age-website.iam.gserviceaccount.com`
3. Open your Google Sheet
4. Click "Share"
5. Paste the email, set to "Editor", click "Share"

### Step 4: Deploy! (1 minute)

```bash
git add .
git commit -m "Deploy with form integration and video fixes"
git push origin main
```

Watch deployment at: https://github.com/YOUR_USERNAME/urban-age/actions

---

## ✅ Verify It Works

1. **Check Deployment:** GitHub Actions should show green checkmark
2. **Test Videos:** Visit site, check intro video and hero videos load
3. **Test Form:** Submit a test form, verify:
   - Success message appears
   - Email received
   - Row added to Google Sheet

---

## 📚 Full Documentation

- **Complete Setup:** [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md)
- **Form Integration:** [FORM_INTEGRATION_SETUP.md](FORM_INTEGRATION_SETUP.md)
- **Troubleshooting:** See guides above

---

## 🔧 Issues Fixed Today

✅ **Video Problem:** Moved `AI_Generated_videos` into `website/assets/` so they deploy
✅ **Video Paths:** Updated HTML to use `assets/AI_Generated_videos/` instead of `../AI_Generated_videos/`
✅ **GitHub Deployment:** Created workflow for automated deployment with secrets
✅ **Documentation:** Complete guides for GitHub Actions deployment

---

## 🎯 Next Steps After Deployment

1. Test form thoroughly on all devices
2. Verify emails are being received
3. Check Google Sheet is being populated
4. Monitor Netlify function logs
5. Set up custom domain (when ready)

---

**Need help?** See full documentation in the guides above.
