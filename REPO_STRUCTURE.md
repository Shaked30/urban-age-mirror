# Urban Age Repository Structure

**Last Updated:** November 24, 2025

---

## 📁 Directory Organization

```
urban-age/
├── 📄 Root Files (Project Overview)
│   ├── README.md                    # Project overview and getting started
│   ├── CLAUDE.md                    # Context for Claude AI (project brief)
│   ├── TASKS.md                     # Master task tracker and progress
│   ├── REPO_STRUCTURE.md            # This file
│   └── .gitignore                   # Git ignore rules
│
├── 🌐 website/                      # Production Website Files
│   ├── index.html                   # Main homepage
│   └── style.css                    # Main stylesheet
│
├── ⚖️ legal-pages/                  # Legal Compliance Pages
│   ├── privacy.html                 # Privacy Policy (Amendment 13 compliant)
│   ├── terms.html                   # Terms of Service
│   └── accessibility.html           # Accessibility Statement (IS 5568)
│
├── 📜 scripts/                      # JavaScript Files
│   ├── script.js                    # Main site interactions
│   └── cookie-consent.js            # Cookie consent banner system
│
├── 📧 email-drafts/                 # Email Communications
│   ├── EMAIL_TO_TEAM.md             # Ready-to-send email to Tal/team
│   └── READY_TO_SEND.md             # Instructions and checklist
│
├── 📊 reviews/                      # AI Review Documents
│   ├── AI_REVIEW_FINDINGS.md        # Detailed English review (source)
│   ├── AI_REVIEW_FINDINGS.html      # HTML version
│   ├── AI_REVIEW_SUMMARY_HEB.md     # Hebrew summary (source)
│   └── AI_REVIEW_SUMMARY_HEB.html   # HTML version
│
├── 📄 pdfs/                         # PDF Documents (For Sharing)
│   ├── AI_REVIEW_FINDINGS.pdf       # English detailed review (62 KB)
│   └── AI_REVIEW_SUMMARY_HEB.pdf    # Hebrew summary (74 KB)
│
├── 📚 documentation/                # Project Documentation
│   ├── LEGAL_COMPLIANCE.md          # Legal compliance requirements
│   ├── COMPLIANCE_IMPLEMENTATION_STATUS.md
│   ├── COMPLIANCE_SUMMARY_FOR_TAL.md
│   ├── PROACTIVE_IMPLEMENTATION.md  # Hebrew summary for Tal
│   ├── REMAINING_25_PERCENT.md      # What's left to do
│   └── SUMMARY_FOR_TEAM_HEB.md      # Concise Hebrew summary
│
├── 📖 docs/                         # Reference Materials
│   ├── PROJECT_BRIEF.md
│   ├── MEETING_NOTES.md
│   ├── QUESTIONS_FOR_URBAN_AGE.md
│   ├── ONYX_GROUP_ANALYSIS.md
│   ├── BASE44_TAKEOVER_TECHNICAL.md
│   └── base44_reference/            # Base44 site content
│
├── 📦 archive/                      # Archived Files
│   └── (pre-meeting prep docs)
│
└── 🚀 DEPLOYMENT_GUIDE.md           # Netlify + GoDaddy deployment guide

```

---

## 🎯 Quick Access Guide

### For Developers

**Working on the site:**
- Website files: `website/` (index.html, style.css)
- Legal pages: `legal-pages/` (privacy.html, terms.html, accessibility.html)
- Scripts: `scripts/` (script.js, cookie-consent.js)

**Understanding the project:**
- Start here: `README.md`
- Task tracking: `TASKS.md`
- Project context: `CLAUDE.md`

**Deployment:**
- Guide: `DEPLOYMENT_GUIDE.md`

### For Urban Age Team (Tal, Sagi, Gilad)

**To send to the team:**
- Email text: `email-drafts/EMAIL_TO_TEAM.md`
- Attach: `pdfs/AI_REVIEW_SUMMARY_HEB.pdf`
- Instructions: `email-drafts/READY_TO_SEND.md`

**Quick summaries:**
- Hebrew summary: `documentation/SUMMARY_FOR_TEAM_HEB.md`
- What's needed: `documentation/PROACTIVE_IMPLEMENTATION.md`
- Remaining work: `documentation/REMAINING_25_PERCENT.md`

**Detailed review:**
- Hebrew: `pdfs/AI_REVIEW_SUMMARY_HEB.pdf`
- English: `pdfs/AI_REVIEW_FINDINGS.pdf`

### For Claude AI

**Project context:**
- Main brief: `CLAUDE.md`
- Task tracker: `TASKS.md`
- This structure: `REPO_STRUCTURE.md`

**Reference materials:**
- All docs: `docs/`
- Meeting notes: `docs/MEETING_NOTES.md`
- Questions: `docs/QUESTIONS_FOR_URBAN_AGE.md`

---

## 📝 File Naming Conventions

### Markdown Source Files
- `*.md` - Source markdown documents
- Editable, version-controlled

### Generated Files
- `*.html` - Generated HTML (from markdown or hand-coded)
- `*.pdf` - Generated PDFs (from markdown)

### Website Files
- `index.html` - Hand-coded production HTML
- `*.html` in `legal-pages/` - Hand-coded legal pages
- `*.css` - Stylesheets
- `*.js` - JavaScript files

---

## 🔄 Workflow

### 1. Development
1. Edit files in `website/`, `legal-pages/`, `scripts/`
2. Test locally
3. Update `TASKS.md` with progress

### 2. Documentation
1. Update relevant docs in `documentation/`
2. Keep `CLAUDE.md` and `README.md` in sync with changes

### 3. Sharing with Team
1. Update `email-drafts/EMAIL_TO_TEAM.md` if needed
2. Regenerate PDFs if reviews change:
   ```bash
   pandoc reviews/AI_REVIEW_SUMMARY_HEB.md -o pdfs/AI_REVIEW_SUMMARY_HEB.pdf --pdf-engine=xelatex -V mainfont="Arial" -V geometry:margin=1in -V lang=he -V dir=rtl
   ```
3. Follow checklist in `email-drafts/READY_TO_SEND.md`

### 4. Deployment
1. Follow `DEPLOYMENT_GUIDE.md`
2. Deploy `website/` + `legal-pages/` + `scripts/` to Netlify

---

## 🗑️ What's NOT in Git

The following are ignored (see `.gitignore`):
- `.DS_Store` (macOS)
- `node_modules/` (if using npm)
- `.env` (environment variables)
- Temporary files

---

## 💡 Tips

### Finding Files Quickly

**Looking for the email to send?**
→ `email-drafts/EMAIL_TO_TEAM.md`

**Need the Hebrew review PDF?**
→ `pdfs/AI_REVIEW_SUMMARY_HEB.pdf`

**Want to edit the website?**
→ `website/index.html`

**Need to update legal pages?**
→ `legal-pages/privacy.html`, `terms.html`, `accessibility.html`

**Looking for project status?**
→ `TASKS.md`

### For Claude
When asked "where is X?", refer to this structure first.

### For Humans
Use your IDE's file search (Cmd+P in VSCode) with these terms:
- "email" → finds email drafts
- "pdf" → finds PDFs
- "review" → finds review documents
- "legal" → finds legal pages and compliance docs
- "task" → finds TASKS.md

---

**This structure keeps the repository organized and easy to navigate for both humans and AI! 🎉**
