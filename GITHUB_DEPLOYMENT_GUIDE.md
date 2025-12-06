# GitHub Secrets Deployment Guide

Complete guide for deploying to Netlify using GitHub Actions with environment variables stored as GitHub Secrets.

---

## 📋 Overview

This deployment method:
- ✅ Uses GitHub Actions for automated deployment
- ✅ Stores sensitive keys in GitHub Secrets (not Netlify)
- ✅ Deploys to Netlify on every push to `main` branch
- ✅ Automatically injects environment variables into Netlify Functions

---

## Part 1: Get Netlify Auth Token & Site ID

### Step 1: Get Netlify Auth Token

1. **Log in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Log in to your account

2. **Create a Personal Access Token**
   - Click your profile picture (top right)
   - Select **"User settings"**
   - Navigate to **"Applications"** in the left sidebar
   - Scroll down to **"Personal access tokens"**
   - Click **"New access token"**
   - Description: `GitHub Actions Deployment`
   - Click **"Generate token"**
   - **Copy the token immediately** (you won't see it again!)
   - Keep it safe for the next step

### Step 2: Get Netlify Site ID

**Option A: From Netlify Dashboard**

1. Go to your site in Netlify dashboard
2. Navigate to **Site settings**
3. Under **Site information**, find **"Site ID"**
4. Copy the Site ID (looks like: `abc123-xyz456-789`)

**Option B: From CLI (if you have Netlify CLI)**

```bash
netlify status
```

Look for `Site Id:` in the output.

**Option C: Create New Site (if not yet created)**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop the `website` folder to deploy
4. After deployment, go to **Site settings** → **Site information** → Copy **Site ID**

---

## Part 2: Configure GitHub Secrets

### Step 1: Navigate to Repository Secrets

1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/urban-age
2. Click **"Settings"** tab (top navigation)
3. In the left sidebar, expand **"Secrets and variables"**
4. Click **"Actions"**
5. Click **"New repository secret"** button

### Step 2: Add Each Secret

Add the following secrets one by one:

#### 1. Netlify Configuration

| Secret Name | Value | Where to Get |
|-------------|-------|--------------|
| `NETLIFY_AUTH_TOKEN` | Your Netlify token from Part 1 | From Netlify User Settings → Applications |
| `NETLIFY_SITE_ID` | Your site ID from Part 1 | From Netlify Site Settings → Site Information |

#### 2. Resend Email Configuration

| Secret Name | Value | Example |
|-------------|-------|---------|
| `RESEND_API_KEY` | `re_KxzrBwYM_6V7h8SRRQpZpYBezen37bKXu` | Your Resend API key |
| `RESEND_FROM_EMAIL` | `noreply@urban-age.com` | Email address to send from |
| `NOTIFICATION_EMAIL` | `tal@urban-age.com` | Where to receive notifications |

#### 3. Google Sheets Configuration

| Secret Name | Value | Where to Get |
|-------------|-------|--------------|
| `GOOGLE_SHEET_ID` | `1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY` | From your Google Sheet URL |
| `GOOGLE_SHEETS_CREDENTIALS` | *Entire JSON file* | Copy entire contents of `google-credentials.json` |

**⚠️ IMPORTANT for `GOOGLE_SHEETS_CREDENTIALS`:**

1. Open the file: `google-credentials.json`
2. Copy the **ENTIRE contents** (all the JSON)
3. Paste it as-is into the GitHub Secret value field
4. It should start with `{"type":"service_account"...` and end with `...}`
5. **Do NOT** format it or add/remove any characters

### Step 3: Verify All Secrets

After adding all secrets, you should see:

✅ `NETLIFY_AUTH_TOKEN`
✅ `NETLIFY_SITE_ID`
✅ `RESEND_API_KEY`
✅ `RESEND_FROM_EMAIL`
✅ `NOTIFICATION_EMAIL`
✅ `GOOGLE_SHEET_ID`
✅ `GOOGLE_SHEETS_CREDENTIALS`

---

## Part 3: Share Google Sheet with Service Account

The service account needs access to write to your Google Sheet:

1. Open `google-credentials.json` file
2. Find the `client_email` field:
   ```json
   "client_email": "urban-age-form-handler@urban-age-website.iam.gserviceaccount.com"
   ```
3. Copy this email address
4. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY/edit
5. Click **"Share"** button (top right)
6. Paste the service account email
7. Set permission: **Editor**
8. Uncheck **"Notify people"**
9. Click **"Share"**

✅ The service account can now write to your sheet!

---

## Part 4: Deploy Your Site

### Option A: Deploy via Git Push (Automatic)

Simply commit and push your changes:

```bash
git add .
git commit -m "Add form integration with GitHub Actions deployment"
git push origin main
```

GitHub Actions will automatically:
1. Detect the push to `main` branch
2. Run the deployment workflow
3. Deploy to Netlify with all environment variables
4. Show deployment status in the Actions tab

### Option B: Deploy Manually (Trigger Workflow)

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Select **"Deploy to Netlify"** workflow
4. Click **"Run workflow"** button
5. Select branch: `main`
6. Click **"Run workflow"**

### Monitor Deployment

1. Go to **Actions** tab in your GitHub repository
2. Click on the running workflow
3. Watch the deployment progress
4. Check for any errors in the logs

---

## Part 5: Netlify CLI Setup (Optional)

If you want to interact with Netlify from the command line:

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will:
1. Open your browser
2. Ask you to authorize Netlify CLI
3. Save the token locally

### Step 3: Link Your Site

```bash
cd /Users/shakedyarden/MyProjects/urban-age
netlify link
```

Choose option: **"Use current git remote origin"** or **"Enter site ID"**

### Common Netlify CLI Commands

```bash
# Check site status
netlify status

# View site in browser
netlify open

# View site logs
netlify logs

# Deploy to production (manual)
netlify deploy --prod --dir=website

# Run local dev server with functions
netlify dev

# View environment variables (won't show values from GitHub)
netlify env:list
```

**Note:** Environment variables set via GitHub Secrets won't be visible in Netlify dashboard or CLI, but they will be available during deployment.

---

## ✅ Testing Your Deployment

### Test 1: Check Deployment Success

1. Go to **Actions** tab in GitHub
2. Verify the workflow completed successfully (green checkmark)
3. Click on the workflow run to see details
4. Check the "Deploy to Netlify" step for the deployment URL

### Test 2: Test Form Submission

1. Visit your live site: https://jocular-toffee-039ec0.netlify.app
2. Fill out the contact form
3. Submit the form
4. Check:
   - ✅ Success message appears on the site
   - ✅ Email received at `NOTIFICATION_EMAIL`
   - ✅ New row appears in Google Sheet

### Test 3: Check Function Logs

1. Go to Netlify dashboard
2. Navigate to your site
3. Click **"Functions"** tab
4. Click on `submit-form` function
5. Check recent logs for any errors

---

## 🔧 Troubleshooting

### Issue: "Workflow failed" in GitHub Actions

**Check:**
1. Go to Actions tab → Click the failed run
2. Read the error message carefully
3. Common causes:
   - Missing or incorrect GitHub Secrets
   - Invalid Netlify token or Site ID
   - Invalid JSON in `GOOGLE_SHEETS_CREDENTIALS`

**Fix:**
- Verify all secrets are added correctly
- Re-check token and site ID
- Validate JSON using [jsonlint.com](https://jsonlint.com)

### Issue: Form submits but email/sheets fail

**Check Netlify Function Logs:**
1. Netlify dashboard → Functions → submit-form
2. Look for error messages

**Common causes:**
- Resend API key invalid or expired
- Google Sheet not shared with service account
- Wrong Sheet ID

### Issue: Videos still not showing

**Check:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console (F12) for 404 errors
3. Verify videos are in `website/assets/AI_Generated_videos/`
4. Check Netlify deploy log to confirm videos were uploaded

### Issue: "NETLIFY_AUTH_TOKEN is not set"

**Fix:**
1. Verify the secret name is exactly `NETLIFY_AUTH_TOKEN` (case-sensitive)
2. Re-create the Netlify token if it expired
3. Update the secret in GitHub

---

## 🔒 Security Best Practices

### GitHub Secrets
✅ **NEVER** commit secrets to Git
✅ **ALWAYS** use GitHub Secrets for sensitive data
✅ Rotate tokens every 6-12 months
✅ Use least-privilege access (only needed permissions)

### Files to Keep Secret
Make sure `.gitignore` includes:
```
.env
.env.local
*.json
google-credentials.json
node_modules/
.netlify/
```

### Regular Maintenance
- Monitor Netlify function logs weekly
- Check Google Sheet for spam submissions
- Review Resend sending quota usage
- Rotate API keys periodically

---

## 📊 Monitoring

### GitHub Actions
- View deployment history in Actions tab
- Set up notifications for failed workflows
- Monitor deployment times

### Netlify
- Monitor function execution times
- Check for errors in function logs
- Review bandwidth and build minutes usage

### Resend
- Check email delivery rates
- Monitor daily/monthly sending limits
- Review bounce/complaint rates

### Google Sheets
- Review submissions regularly
- Check for suspicious patterns
- Export data for backup

---

## 🎯 Summary

**You've set up:**
- ✅ GitHub Actions deployment workflow
- ✅ Secure environment variables via GitHub Secrets
- ✅ Automated deployment on every push to `main`
- ✅ Form integration with Resend + Google Sheets
- ✅ Fixed video deployment issue

**Your workflow:**
1. Make code changes locally
2. Commit and push to GitHub
3. GitHub Actions automatically deploys to Netlify
4. Environment variables are injected from GitHub Secrets
5. Site is live with working forms and videos!

🚀 **You're all set!**
