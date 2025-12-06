# Fix Mirror Token Authentication Error

## Problem
```
remote: Invalid username or token. Password authentication is not supported
fatal: Authentication failed for 'https://github.com/Shaked30/urban-age-mirror.git/'
```

## Solution: Update MIRROR_TOKEN

### Step 1: Create New Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name: `Urban Age Mirror Token`
4. Expiration: **No expiration** (or at least 1 year)
5. Select scopes:
   - ✅ **repo** (all repo permissions)
   - ✅ **workflow** (update GitHub Actions workflows)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (starts with `ghp_...`) - you won't see it again!

### Step 2: Update Secret in Main Repo
1. Go to https://github.com/Jordans-AI/urban-age/settings/secrets/actions
2. Click on **MIRROR_TOKEN** (or create new if missing)
3. Paste your new token value
4. Click **"Update secret"**

### Step 3: Test the Mirror
Push a small change to trigger the workflow:
```bash
git add .
git commit -m "Test mirror with new token"
git push origin main
```

### Step 4: Verify Success
- Check mirror workflow: https://github.com/Jordans-AI/urban-age/actions
- Should show ✅ green checkmark
- Changes should appear in mirror: https://github.com/Shaked30/urban-age-mirror

---

## After Mirror Works

Then the deploy workflow will run automatically in the mirror repo.

Make sure all 7 secrets are added to the mirror repo:
https://github.com/Shaked30/urban-age-mirror/settings/secrets/actions
