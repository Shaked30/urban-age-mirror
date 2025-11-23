# Urban Age - Deployment Guide

Complete guide for deploying your static website to Netlify and connecting your GoDaddy domain.

---

## 📦 Prerequisites

Before you begin, make sure you have:
- [x] GitHub account (or GitLab/Bitbucket)
- [x] Netlify account (free tier is perfect - sign up at [netlify.com](https://netlify.com))
- [x] GoDaddy account access (for DNS configuration)
- [x] Your website files (index.html, style.css, script.js)

---

## 🚀 Part 1: Deploy to Netlify

### Option A: Deploy via Git (Recommended)

This method enables automatic deployments whenever you push changes.

#### Step 1: Push your code to GitHub

```bash
# Navigate to your project directory
cd /Users/shakedyarden/MyProjects/dayan-nadlan

# Initialize git repository (if not already done)
git init

# Add all files
git add index.html style.css script.js

# Commit
git commit -m "Initial Urban Age website"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/urban-age-website.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Netlify

1. **Log in to Netlify**: Go to [app.netlify.com](https://app.netlify.com)
2. **Click "Add new site"** → "Import an existing project"
3. **Choose your Git provider** (GitHub)
4. **Authorize Netlify** to access your repositories
5. **Select your repository** (`urban-age-website`)
6. **Configure build settings**:
   - **Build command**: Leave empty (static site)
   - **Publish directory**: Leave empty or use `.` (root directory)
7. **Click "Deploy site"**

✅ Your site will be live in 1-2 minutes at a random Netlify URL like `random-name-12345.netlify.app`

---

### Option B: Manual Deploy (Drag & Drop)

Quick deployment without Git setup.

1. **Log in to Netlify**: [app.netlify.com](https://app.netlify.com)
2. **Drag and drop** your project folder directly onto the Netlify dashboard
3. **Your site is live!** You'll get a random URL like `random-name-12345.netlify.app`

**Note**: With manual deploy, you need to re-upload files each time you make changes. Git deployment is better for ongoing updates.

---

## 📧 Part 2: Enable Netlify Forms

Your contact form is already configured! Netlify will automatically detect it because of these lines in your HTML:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
```

### Verify Form Submissions

1. **In Netlify dashboard**, go to your site
2. **Click "Forms"** in the top navigation
3. **You'll see "contact" form** listed
4. **Test the form** by submitting it on your live site
5. **Check "Forms" tab** to see submissions

### Get Email Notifications

1. **Go to Site Settings** → **Forms** → **Form notifications**
2. **Add notification** → **Email notification**
3. **Enter email address** (e.g., tal@urban-age.com)
4. **Click "Save"**

Now you'll receive an email every time someone submits the form!

### Export Form Submissions

- **CSV Export**: Forms tab → Click "⋯" → "Download CSV"
- **Via API**: Access via Netlify API for custom integrations

---

## 🌐 Part 3: Connect Your GoDaddy Domain

### Step 1: Add Custom Domain in Netlify

1. **In Netlify**, go to **Site settings** → **Domain management**
2. **Click "Add custom domain"**
3. **Enter your domain**: `urban-age.com` (or whatever your domain is)
4. **Click "Verify"** → **Click "Add domain"**

Netlify will show you DNS records to add.

---

### Step 2: Configure DNS in GoDaddy

#### For Root Domain (urban-age.com)

1. **Log in to GoDaddy**: [godaddy.com](https://godaddy.com)
2. **Go to**: My Products → Domains → DNS
3. **Find your domain** and click "DNS"

4. **Add A Records** (point to Netlify):

   Click "Add" and create **FOUR A records**:

   | Type | Name | Value              | TTL  |
   |------|------|--------------------|------|
   | A    | @    | 75.2.60.5          | 600  |
   | A    | @    | 99.83.190.102      | 600  |
   | A    | @    | 13.248.212.111     | 600  |
   | A    | @    | 76.223.126.88      | 600  |

5. **Delete old A records** that point elsewhere (if any)

#### For WWW Subdomain (www.urban-age.com)

6. **Add CNAME record**:

   | Type  | Name | Value                  | TTL  |
   |-------|------|------------------------|------|
   | CNAME | www  | YOUR-SITE.netlify.app  | 600  |

   Replace `YOUR-SITE` with your actual Netlify subdomain name.

#### Example Final DNS Setup:

```
A     @     75.2.60.5           600
A     @     99.83.190.102       600
A     @     13.248.212.111      600
A     @     76.223.126.88       600
CNAME www   urban-age.netlify.app  600
```

7. **Save all changes**

---

### Step 3: Wait for DNS Propagation

- **DNS changes take 30 minutes to 48 hours** to fully propagate
- **Usually works within 1-2 hours**
- **Check status**: Use [dnschecker.org](https://dnschecker.org) to see if your DNS has updated globally

---

### Step 4: Enable HTTPS (SSL Certificate)

Once DNS is connected:

1. **In Netlify**, go to **Site settings** → **Domain management** → **HTTPS**
2. **Click "Verify DNS configuration"**
3. **Click "Provision certificate"**
4. **Wait 1-2 minutes** for SSL certificate to activate

✅ Your site is now live with HTTPS at `https://urban-age.com`!

---

## ✅ Part 4: Final Checklist

After deployment:

- [ ] **Visit your live site** at your custom domain
- [ ] **Test the contact form** - submit a test entry
- [ ] **Check Netlify Forms** tab - verify submission appeared
- [ ] **Test on mobile** - check responsive design
- [ ] **Test all navigation links** - make sure smooth scroll works
- [ ] **Check HTTPS** - green padlock in browser
- [ ] **Test all contact methods** - phone, email, WhatsApp links
- [ ] **Share with Tal, Sagi, Gilad** for feedback!

---

## 🔄 Part 5: Making Updates

### If using Git deployment:

```bash
# Make your changes to files
# Then commit and push:

git add .
git commit -m "Update hero section copy"
git push origin main
```

Netlify will **automatically rebuild and deploy** in 1-2 minutes!

### If using manual deployment:

1. **Make changes** to your local files
2. **Drag and drop** the folder again onto Netlify
3. **New version goes live** immediately

---

## 📊 Part 6: Monitoring & Analytics

### View Site Analytics (Netlify)

1. **In Netlify**, go to **Analytics** tab
2. **See**: Page views, unique visitors, top pages, bandwidth

### Add Google Analytics (Optional)

Add this to your `<head>` in index.html:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

---

## 🐛 Troubleshooting

### Form submissions not showing up

- **Check Netlify Forms tab** - make sure form is detected
- **Verify HTML**: Must have `data-netlify="true"` and hidden `form-name` field
- **Redeploy**: Sometimes need to redeploy after adding form
- **Check spam**: Email notifications might go to spam folder

### Domain not connecting

- **Wait longer**: DNS can take up to 48 hours
- **Check DNS records**: Use [dnschecker.org](https://dnschecker.org)
- **Verify A records**: Must match Netlify's IPs exactly
- **Clear browser cache**: Hard refresh (Cmd+Shift+R on Mac)

### Site not updating

- **Clear cache**: Netlify caches aggressively - try hard refresh
- **Check deploy status**: Go to "Deploys" tab in Netlify
- **Look for errors**: Red "Failed" status? Click to see error logs

### HTTPS not working

- **Wait for DNS**: SSL won't provision until DNS is fully connected
- **Verify DNS**: Use Netlify's "Verify DNS" button
- **Try again**: Click "Provision certificate" again after 30 minutes

---

## 📞 Need Help?

### Netlify Support
- **Docs**: [docs.netlify.com](https://docs.netlify.com)
- **Community**: [answers.netlify.com](https://answers.netlify.com)
- **Support**: Available in Netlify dashboard

### GoDaddy DNS Help
- **Support**: [godaddy.com/help](https://godaddy.com/help)
- **DNS Guide**: Search "manage DNS" in GoDaddy help center

---

## 🎉 You're Done!

Your Urban Age website is now:

✅ **Live** on the internet
✅ **Secure** with HTTPS
✅ **Connected** to your custom domain
✅ **Collecting leads** via Netlify Forms
✅ **Ready** for the world!

**Next Steps:**
1. Share the link with Tal, Sagi, and Gilad
2. Get feedback on design and copy
3. Add real team photos when available
4. Add Hebrew/RTL support in next iteration
5. Consider adding Google Analytics

---

**Built with ❤️ for Urban Age**

*Questions? Need help with deployment? Let me know!*
