# Form Integration Setup Guide

Complete guide to setting up email notifications (Resend) and Google Sheets logging for the Urban Age contact form.

---

## 📋 Overview

When a visitor submits the contact form, the system will:
1. ✅ Send an email notification to the Urban Age team via Resend
2. ✅ Log the submission to a Google Sheet for tracking
3. ✅ Show success/error messages to the user

---

## 🚀 Quick Start

### Prerequisites
- Netlify account (for deployment)
- Email address for receiving notifications
- Google account (for Google Sheets)

### Setup Time
- **Resend Setup:** 5 minutes
- **Google Sheets Setup:** 10-15 minutes
- **Netlify Deployment:** 5 minutes

**Total Time:** ~20-25 minutes

---

## Part 1: Resend Email Setup

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Start Building" or "Sign Up"
3. Sign up with your email or GitHub account
4. Verify your email address

### Step 2: Get Your API Key

1. After login, go to **API Keys** section
2. Click "Create API Key"
3. Name it: `Urban Age Website`
4. Select permission: `Sending access`
5. Click "Create"
6. **Copy the API key** (starts with `re_...`) - you'll need this later

⚠️ **Important:** Save this key securely. You won't be able to see it again!

### Step 3: Add Your Domain (Optional but Recommended)

For production, you'll want to send emails from your own domain (e.g., `noreply@urban-age.com`):

1. Go to **Domains** section in Resend
2. Click "Add Domain"
3. Enter your domain: `urban-age.com`
4. Follow the DNS verification steps (add TXT, MX, and CNAME records to GoDaddy)
5. Wait for verification (usually 5-30 minutes)

**For Testing:** You can use `onboarding@resend.dev` as the "from" email without domain verification.

### Step 4: Save Your API Key

Keep your Resend API key handy. You'll add it to Netlify environment variables later.

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

---

## Part 2: Google Sheets Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "+ Blank" to create a new spreadsheet
3. Name it: **"Urban Age - Form Submissions"**
4. Set up column headers in Row 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| תאריך | שם | טלפון | אימייל | כתובת | שמע עלינו מ | הסכמה לשיווק | סטטוס |

5. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                              ^^^^^^^^^^^^^^^^
   ```
   Save this for later!

### Step 2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Project name: `Urban Age Website`
4. Click "Create"
5. Wait for the project to be created (~30 seconds)

### Step 3: Enable Google Sheets API

1. In your new project, go to **APIs & Services** → **Library**
2. Search for: `Google Sheets API`
3. Click on it, then click **"Enable"**
4. Wait for it to enable (~10 seconds)

### Step 4: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"Service Account"**
3. Service account details:
   - **Name:** `urban-age-form-handler`
   - **Description:** `Service account for form submissions`
4. Click "Create and Continue"
5. **Grant this service account access** (Optional - skip this step)
6. Click "Done"

### Step 5: Create Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Choose format: **JSON**
5. Click "Create"
6. A JSON file will download automatically
7. **Keep this file safe!** It contains sensitive credentials

### Step 6: Share Sheet with Service Account

1. Open the downloaded JSON file
2. Find the `client_email` field (looks like: `urban-age-form-handler@...gserviceaccount.com`)
3. Copy this email address
4. Go back to your Google Sheet
5. Click **"Share"** button (top right)
6. Paste the service account email
7. Set permission to: **Editor**
8. Uncheck "Notify people"
9. Click "Share"

✅ Now the service account can write to your sheet!

### Step 7: Prepare Credentials for Netlify

1. Open the downloaded JSON file in a text editor
2. **Copy the entire contents** (it should be one long line of JSON)
3. Keep it ready for the next section

---

## Part 3: Netlify Deployment & Configuration

### Deployment Options

**🎯 RECOMMENDED: GitHub Actions Deployment**

For automated deployments with environment variables stored securely in GitHub Secrets:

👉 **See [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md)** for complete instructions.

This method:
- ✅ Stores secrets in GitHub (more secure)
- ✅ Automatic deployment on every push
- ✅ Better for team collaboration
- ✅ Easier to manage environment variables

---

**Alternative: Direct Netlify Deployment**

If you prefer to configure environment variables directly in Netlify:

### Step 1: Install Dependencies

First, install the required packages:

```bash
cd /Users/shakedyarden/MyProjects/urban-age
npm install
```

### Step 2: Deploy to Netlify

**Option A: Deploy via Git**

1. Make sure your code is committed to Git:
   ```bash
   git add .
   git commit -m "Add form integration with Resend and Google Sheets"
   git push
   ```

2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider (GitHub/GitLab/Bitbucket)
5. Select your `urban-age` repository
6. Build settings:
   - **Base directory:** (leave empty)
   - **Build command:** `npm run build`
   - **Publish directory:** `website`
   - **Functions directory:** `netlify/functions`
7. Click "Deploy site"

**Option B: Manual Deploy**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 3: Configure Environment Variables (Netlify Dashboard Method)

1. In Netlify dashboard, go to your site
2. Navigate to **Site settings** → **Environment variables**
3. Click **"Add a variable"** and add each of these:

#### Resend Configuration

| Key | Value | Example |
|-----|-------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_abc123...` |
| `RESEND_FROM_EMAIL` | From email address | `noreply@urban-age.com` |
| `NOTIFICATION_EMAIL` | Where to send notifications | `tal@urban-age.com` |

#### Google Sheets Configuration

| Key | Value |
|-----|-------|
| `GOOGLE_SHEET_ID` | Your Sheet ID from URL |
| `GOOGLE_SHEETS_CREDENTIALS` | Entire JSON file contents (paste as one line) |

⚠️ **Important for `GOOGLE_SHEETS_CREDENTIALS`:**
- Copy the ENTIRE contents of the downloaded JSON file
- Paste it as a single line (remove any line breaks if needed)
- It should start with `{"type":"service_account"...` and end with `...}`

### Step 4: Trigger Redeploy

After adding environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete (~1-2 minutes)

---

## ✅ Testing Your Form

### Test 1: Local Testing (Optional)

Test locally before deploying:

```bash
# Create .env file (DO NOT COMMIT THIS!)
cp .env.example .env

# Edit .env and add your real API keys
nano .env

# Run Netlify Dev
netlify dev

# Open browser to http://localhost:8888
# Try submitting the form
```

### Test 2: Production Testing

1. Go to your live site: `https://your-site.netlify.app`
2. Navigate to the contact form
3. Fill in test data:
   - Name: Test User
   - Phone: 050-1234567
   - Email: your-email@example.com
   - Address: תל אביב, רחוב הרצל 1
   - Check all consent boxes
4. Click "שלח פנייה"
5. You should see: "הפרטים נשלחו בהצלחה!"

### Verify Success

✅ **Check Email:** You should receive an email notification at the configured address

✅ **Check Google Sheet:** A new row should appear with the submission data

✅ **Check Netlify Functions Log:**
1. Go to Netlify dashboard → **Functions** tab
2. Click on `submit-form`
3. Check recent logs for any errors

---

## 🔧 Troubleshooting

### Issue: "Failed to send email"

**Possible causes:**
- Invalid Resend API key
- API key doesn't have sending permissions
- Domain not verified (if using custom domain)

**Solution:**
1. Check API key is correct in Netlify environment variables
2. Verify domain in Resend dashboard
3. Try using `onboarding@resend.dev` as "from" email for testing

### Issue: "Failed to log to Google Sheets"

**Possible causes:**
- Service account doesn't have access to sheet
- Wrong Sheet ID
- Invalid credentials JSON

**Solution:**
1. Verify Sheet ID in environment variables
2. Check that service account email has Editor access to the sheet
3. Verify `GOOGLE_SHEETS_CREDENTIALS` is valid JSON (paste in a JSON validator)
4. Make sure sheet name is "Sheet1" (or update the code)

### Issue: Form submits but nothing happens

**Check:**
1. Open browser console (F12) and look for JavaScript errors
2. Check Netlify Functions logs for errors
3. Verify `form-handler.js` is loaded (check Network tab)

### Issue: "CORS error" or "Network error"

**Solution:**
- Make sure you're testing on the deployed site, not opening `index.html` directly
- Use `netlify dev` for local testing (not `file://` protocol)

---

## 📊 Monitoring & Maintenance

### Check Form Submissions

**Google Sheets:**
- View all submissions in your sheet
- Sort by date, status, etc.
- Export to CSV for analysis

**Netlify Functions:**
- View logs in Netlify dashboard
- See success/error rates
- Monitor function execution time

### Resend Dashboard

- View email delivery status
- Check bounce/complaint rates
- Monitor monthly sending quota (100 emails/day on free tier)

### Quota Limits

**Resend Free Tier:**
- 100 emails/day
- 3,000 emails/month

**Google Sheets API Free Tier:**
- 60 requests/minute per user
- More than enough for a contact form

**Upgrade if needed:**
- Resend: $20/month for 50,000 emails
- Google Sheets: No cost (generous free tier)

---

## 🔒 Security Best Practices

### Environment Variables
✅ **NEVER** commit `.env` file to Git
✅ **ALWAYS** use environment variables for API keys
✅ Keep your service account JSON file secure

### Git Ignore
Make sure `.gitignore` includes:
```
.env
.env.local
*.json (for service account key)
node_modules/
```

### API Key Rotation
- Rotate Resend API key every 6-12 months
- Create new service account key if compromised

---

## 📧 Email Template Customization

To customize the email notifications, edit this file:
```
netlify/functions/submit-form.js
```

Find the `emailHtml` variable and modify the HTML template.

---

## 📝 Adding More Form Fields

To add new fields (e.g., "How did you hear about us?"):

1. **Update HTML** (`website/index.html`):
   ```html
   <div class="form-group">
     <label for="hear-about">איך שמעת עלינו?</label>
     <select id="hear-about" name="hearAbout">
       <option value="">בחר...</option>
       <option value="google">חיפוש בגוגל</option>
       <option value="facebook">פייסבוק</option>
       <option value="friend">המלצה מחבר</option>
     </select>
   </div>
   ```

2. **Update Form Handler** (`website/form-handler.js`):
   ```javascript
   const formData = {
     // ... existing fields
     hearAbout: form.querySelector('#hear-about')?.value || '',
   };
   ```

3. **Update Email Template** (`netlify/functions/submit-form.js`):
   ```javascript
   ${hearAbout ? `<p><strong>שמע עלינו מ:</strong> ${hearAbout}</p>` : ''}
   ```

4. **Update Google Sheets** - Add column header and update the values array

---

## 🎯 Next Steps

After successful setup:

1. ✅ Test form thoroughly on all devices
2. ✅ Set up email forwarding/distribution if needed
3. ✅ Create process for following up on submissions
4. ✅ Consider adding Google Analytics tracking for form submissions
5. ✅ Optional: Add auto-reply email to submitters

---

## 📞 Support

**Resend Issues:**
- Docs: https://resend.com/docs
- Support: support@resend.com

**Google Sheets API Issues:**
- Docs: https://developers.google.com/sheets/api
- Stack Overflow: Tag `google-sheets-api`

**Netlify Issues:**
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support/

---

## ✨ You're All Set!

Your form integration is now complete! Visitors can submit their details, you'll receive email notifications, and everything is logged to Google Sheets for easy tracking.

🚀 **Ready to go live!**
