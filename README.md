# 🎓 StudentDeals — Budget Product Affiliate Blog

> India's best budget product blog for students. Built with Next.js 14, Tailwind CSS, and Markdown.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Step 1 — Clone / Setup

```bash
# If using git
git clone <your-repo-url>
cd student-deals

# Or just navigate to the project folder
cd student-deals
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Run Dev Server

```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

---

## 📁 Project Structure

```
student-deals/
├── app/
│   ├── layout.js              ← Root layout (Navbar, Footer, SEO)
│   ├── page.js                ← Homepage
│   ├── globals.css            ← Global styles + Tailwind
│   ├── blog/
│   │   ├── page.js            ← Blog listing with search & filters
│   │   ├── BlogClient.js      ← Client-side search/filter logic
│   │   └── [slug]/
│   │       └── page.js        ← Dynamic blog post page
│   └── category/
│       └── [category]/
│           └── page.js        ← Category page
│
├── components/
│   ├── Navbar.js              ← Sticky navbar with dropdowns
│   ├── Footer.js              ← Footer with links + disclosure
│   ├── BlogCard.js            ← Reusable blog post card
│   ├── ProductCard.js         ← Affiliate product card
│   ├── CTAButton.js           ← Affiliate CTA button
│   ├── NewsletterSection.js   ← Email capture
│   └── TableOfContents.js     ← Auto-generated, sticky TOC
│
├── content/
│   └── posts/
│       ├── best-budget-earbuds.md
│       ├── best-notebooks-for-students.md
│       └── best-budget-laptops.md
│
├── lib/
│   └── getPosts.js            ← Content engine (read, parse, filter posts)
│
├── next.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

---

## ✍️ Adding New Blog Posts

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "5 Best Budget Headphones for Students Under ₹2000"
date: "2024-07-01"
category: "Tech"
description: "We tested 10+ headphones so you don't have to. Here are the top 5 picks."
thumbnail: "https://images.unsplash.com/photo-xxx?w=800&q=75"
tags: ["under-2000", "tech", "headphones"]
featured: false
---

## Your content here...
```

**Available categories:** Tech, Study, Lifestyle, Kitchen, Fitness

**The file name becomes the URL slug:**
`best-budget-headphones.md` → `/blog/best-budget-headphones`

---

## 🎯 Affiliate Link Setup

In your markdown files, add links like:

```markdown
[Check Price on Amazon →](https://www.amazon.in/dp/PRODUCT-ID?tag=YOUR-AFFILIATE-TAG)
```

Replace `YOUR-AFFILIATE-TAG` with your actual Amazon Associates tag.

---

## 🔍 SEO Configuration

Update these in `app/layout.js`:
```js
metadataBase: new URL('https://yourdomain.com'),
```

Each blog post automatically generates:
- ✅ Dynamic `<title>` and `<meta description>`
- ✅ Open Graph tags (social sharing)
- ✅ Twitter Card tags
- ✅ Article schema (Google structured data)
- ✅ FAQ schema (auto-detected from content)
- ✅ Canonical URLs
- ✅ Breadcrumb navigation

---

## 🌐 Deploying to Vercel (FREE)

### Option 1 — Via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/student-deals.git
git push -u origin main
```

2. Go to **vercel.com** → Sign in with GitHub
3. Click **"New Project"** → Import your repo
4. Click **"Deploy"** — done! 🎉

Vercel auto-deploys every time you push to GitHub.

### Option 2 — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## ⚙️ Environment Variables (Optional)

Create `.env.local` for any API keys:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Newsletter (Mailchimp, ConvertKit, etc.)
NEWSLETTER_API_KEY=your_key_here
```

---

## 📈 Adding Google Analytics

In `app/layout.js`, add inside `<head>`:

```js
<Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
<Script id="ga-init" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
`}</Script>
```

---

## 🧩 Adding a New Category

1. Add category to `Navbar.js` categories array
2. Add category meta to `app/category/[category]/page.js` categoryMeta object
3. Use the category name in your blog post frontmatter

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## 📞 Team Workflow

| Role | Responsibility |
|------|---------------|
| **Content Lead** | Write .md files in `content/posts/`, add affiliate links |
| **Developer** | Maintain components, add features, deploy |
| **Designer** | Create thumbnails (recommended: 1200×630px), branding |

---

## 💡 Pro Tips

- **Thumbnails:** Use Unsplash URLs for now, replace with custom thumbnails for better CTR
- **Featured posts:** Set `featured: true` in frontmatter to show them in the hero section
- **SEO:** Include target keyword in title, description, and first 100 words
- **Affiliate disclosure:** Already built-in. Amazon requires it — you're covered ✅

---

Built with ❤️ for students across India 🇮🇳
