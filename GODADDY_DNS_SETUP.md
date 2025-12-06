# GoDaddy DNS Setup Guide

**Quick reference for configuring urban-age.com once GoDaddy access is obtained**

---

## 🎯 Overview

You'll need to add DNS records to GoDaddy for **two purposes**:
1. **Resend Email Verification** - To send emails from `noreply@urban-age.com`
2. **Domain Pointing to Netlify** - To make `urban-age.com` show your website

**Total Time:** ~40 minutes (mostly waiting for DNS propagation)

---

## 📧 Part 1: Resend Domain Verification

### Step 1: Start Domain Verification in Resend

1. Go to https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `urban-age.com`
4. Click **"Add"**

Resend will show you **specific DNS records** to add. They'll look something like this:

### Step 2: Add DNS Records to GoDaddy

**Log into GoDaddy → My Products → Domains → urban-age.com → DNS**

Add these records (Resend will show you the exact values):

#### TXT Record (for verification)
- **Type:** TXT
- **Name:** `@` or `urban-age.com`
- **Value:** `resend-verify=xxxxxxxxxxxx` (copy from Resend)
- **TTL:** 600 (10 minutes)

#### MX Record (for email routing)
- **Type:** MX
- **Name:** `@` or `urban-age.com`
- **Value:** `feedback-smtp.us-east-1.amazonses.com`
- **Priority:** 10
- **TTL:** 600

#### CNAME Records (for DKIM/email signing)

**Record 1:**
- **Type:** CNAME
- **Name:** `resend._domainkey` (Resend will provide exact value)
- **Value:** (Resend will provide this - looks like `xxx.resend.com`)
- **TTL:** 600

**Record 2:**
- **Type:** CNAME
- **Name:** `resend2._domainkey` (Resend will provide exact value)
- **Value:** (Resend will provide this)
- **TTL:** 600

**Record 3:**
- **Type:** CNAME
- **Name:** `resend3._domainkey` (Resend will provide exact value)
- **Value:** (Resend will provide this)
- **TTL:** 600

### Step 3: Verify in Resend

1. Wait 5-10 minutes for DNS to propagate
2. Go back to Resend → Domains
3. Click **"Verify"** next to your domain
4. ✅ Should show "Verified"

**Result:** You can now send emails FROM `noreply@urban-age.com` TO any email address!

---

## 🌐 Part 2: Point Domain to Netlify

### Step 1: Add Custom Domain in Netlify

1. Go to Netlify Dashboard
2. Select your site: `jocular-toffee-039ec0`
3. Go to **Domain Settings**
4. Click **"Add custom domain"**
5. Enter: `urban-age.com`
6. Click **"Verify"**

Netlify will show you DNS records to add.

### Step 2: Add DNS Records to GoDaddy

**Option A: Using A Record (Recommended)**

Go to GoDaddy DNS settings and add:

- **Type:** A
- **Name:** `@`
- **Value:** `75.2.60.5` (Netlify's load balancer IP - check Netlify for current IP)
- **TTL:** 600

**For www subdomain:**
- **Type:** CNAME
- **Name:** `www`
- **Value:** `jocular-toffee-039ec0.netlify.app`
- **TTL:** 600

**Option B: Using CNAME (Alternative)**

If you prefer CNAME (some registrars don't allow A records on root):

- **Type:** CNAME
- **Name:** `@`
- **Value:** `jocular-toffee-039ec0.netlify.app`
- **TTL:** 600

### Step 3: Wait for DNS Propagation

1. DNS changes can take 5-30 minutes (sometimes up to 48 hours)
2. Check status: https://dnschecker.org (enter `urban-age.com`)
3. Netlify will auto-provision SSL certificate when DNS is verified

### Step 4: Enable HTTPS

Once DNS is propagated:
1. Netlify will automatically provision SSL certificate
2. In Netlify → Domain Settings → HTTPS
3. Enable **"Force HTTPS"** (redirects HTTP to HTTPS)

**Result:** ✅ `urban-age.com` now shows your website with HTTPS!

---

## 🔐 Part 3: Add Environment Variables to Netlify

**Go to:** Netlify Dashboard → Site Settings → Environment Variables → **Add a variable**

Add each of these:

### Variable 1: RESEND_API_KEY
```
re_KxzrBwYM_6V7h8SRRQpZpYBezen37bKXu
```

### Variable 2: RESEND_FROM_EMAIL
```
noreply@urban-age.com
```

### Variable 3: NOTIFICATION_EMAIL
```
tal@urban-age.com
```
(Or whatever email should receive form submissions)

### Variable 4: TEST_MODE
```
false
```

### Variable 5: GOOGLE_SHEET_ID
```
1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY
```

### Variable 6: GOOGLE_SHEETS_CREDENTIALS

**Value:** Copy the entire contents of `google-credentials.json` (single line):

```json
{"type":"service_account","project_id":"urban-age-website","private_key_id":"b624f2d5f82088adca8d6237cd138aa1f0ca47a3","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDiGtW34lKSglV/\nlyWPlq5ATIaGiUMxG4AMANxZMBJIVuAMxKq5kA1yxGDlsm88fnYPmHU6YH3DXu9h\nKX+WlHJQhHF5pepqMBhNUZrkr6HzIPE8CipZ8OUPFU4cQ9fYZd2EmJliWGsh9Cub\nmd83jNlJaq7nGal2VDZM/ZKZ0UL9s8pSoTu/QU2oM2QH2yUUcA5davIGXIVn4+ms\nq53jBySDeDAbHScwrOgm25d3pyA00K7+3DBCncV/pqth7YVD/Yd/5HzXlph6MzXu\nS5fh+Ao/QpC2T1/JDhlvqfWaWueiI2cm5Qk62ZfsMyDl8mCv4vmc5/SFYg879YZN\neg5cDNFnAgMBAAECggEAZCuEVI+RinPwgfLKAre8YiMlFDR6jqaCz46QEHlCGEdY\nwn9crZIayyYiUZEAQ/o4vscJ5H98KBKGlfKnImSI0pAin8S4OiwtkA+fwkHnS0nk\nZfeQ9MDLEigbr10FIstaXNSoW5AVgnjk2u5MHJWrbCG19A+D6rb7SZerm7bAaZmo\nhgPRjfi1u78Lh9AmFEsLDQVUCtlqOPZ2XOq4b6AnGEcasDh5o29EgTNgVf4a9fz/\nEAbDAAXQX3xzmPXsp9lfHDXnFAsw/m1qclgw3GbIhHzEQfxG47OhLO4PWpNcXj4P\n2LB1zNxzSCJyEGeuwOkXVtS7V9cLG3cJR9vlwNFjkQKBgQD9vPAGEEq0nTZXpIyJ\nhMUNF8iLUm3BGcNz2U5eKA2mvLCSTcM3hatPL2jE1zfdwiohDrAkOFtJ6EUn/Blq\nPa+n7L/WV9Kvst/0kQ9KUm7a364ht0kttwWIwyYyXgCgEbcx8Tz65+6AGXX5663j\nM4tfLQA2pc0iY3OCveSLHA178QKBgQDkHtWxuWZ/ijQYclEL6d/njm8N5B5VnK07\nLOWQBAukzlRwYMWQNwOFKweTX758aj+Pvbae5kh+F73jpn9Rv/uyx18CGbI4zBCx\nF5euejcBiin0xplQefS8j3pZDx+bTtre1ckUmm59E/c7rnS6JGE6temQt0niIgTm\ny8f8NJda1wKBgDZO2STDGeo8d+QcUQQiCbb6ry66rskUxZOnIDHg6sMUQcqeoDjj\nAD6LjCYNVmS9aRz4MtUdxtQzxZGAUMQ/fbg4YPr0gyCd7XdAEQC8UgPAull3DE+f\ni6yw8Bz5p7Ka+BXVZ1Lgj1iVmn2qZuZpItx1GkWYCSbiGFgUYrUvhOdRAoGAK0bS\nQYorsMx2P6EIURtIV/SEiv0Y6CL2FkDZOC4cS2K9UCh7snVNXKkiIcpLJ+08K7fQ\n+moznIBCjPqcMtUaGfuKwapATlggXohcRUR4RPmCJia7FTJdxJvvmQ+ubldSXG3w\nXNFDXsU35QGesWWPcITsT4EGKjlL9sD4KpeLkzcCgYEAm7v82/sOzTU9kPEE8mT2\ne9QnozewGC/GbQzFCZjJPQBgXJSgGd4iyvyMHVi6B+0DxR5WGAbYCR7dsnsQkYim\nBnOgQzyy5oOL6ne+Dr07w/iQdP3KeWHotACJBpbmlxAk40Xf1H5IkxpJt+AwqVI0\nmgr24qNIGH1M9fEr4meF/nY=\n-----END PRIVATE KEY-----\n","client_email":"urban-age-form-handler@urban-age-website.iam.gserviceaccount.com","client_id":"118226727016627441012","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/urban-age-form-handler%40urban-age-website.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
```

**After adding all variables:**
1. Netlify will automatically redeploy the site
2. Wait for deployment to complete (~2-3 minutes)

---

## ✅ Part 4: Test Everything

### Test 1: Visit the Site
1. Go to `https://urban-age.com`
2. Verify it loads correctly
3. Check SSL (should show padlock in browser)

### Test 2: Submit Contact Form
1. Fill out the contact form with test data
2. Submit the form
3. Verify success message appears

### Test 3: Check Email
1. Check `tal@urban-age.com` (or your test email)
2. Should receive an email with form submission
3. Email should be FROM `noreply@urban-age.com`

### Test 4: Check Google Sheet
1. Open: https://docs.google.com/spreadsheets/d/1hOAaLnt1f6MOP2YSw_fP6BFe5mlmsFuPR6H5yYTp_HY/edit
2. Should see a new row with the form submission data

---

## 🎉 Success Checklist

- [ ] Domain verified in Resend
- [ ] Can send emails from `noreply@urban-age.com`
- [ ] `urban-age.com` points to Netlify
- [ ] HTTPS working (padlock in browser)
- [ ] All environment variables added to Netlify
- [ ] Site deployed successfully
- [ ] Test form submission works
- [ ] Email received at correct address
- [ ] Data logged to Google Sheet

**Once all checked:** 🚀 **SITE IS LIVE AND READY FOR CLIENTS!**

---

## 🆘 Troubleshooting

### Domain not loading?
- Check DNS propagation: https://dnschecker.org
- Wait up to 48 hours for global DNS propagation
- Clear browser cache (Ctrl+Shift+Delete)

### Email not sending?
- Verify domain is verified in Resend
- Check environment variables are set correctly in Netlify
- Check spam folder

### Google Sheets not updating?
- Verify sheet is shared with: `urban-age-form-handler@urban-age-website.iam.gserviceaccount.com`
- Check `GOOGLE_SHEETS_CREDENTIALS` environment variable

### Form submission error?
- Check Netlify Functions logs: Netlify Dashboard → Functions → submit-form
- Verify all environment variables are set

---

**Need help? Check [TASKS.md](TASKS.md) for current status and next steps.**
