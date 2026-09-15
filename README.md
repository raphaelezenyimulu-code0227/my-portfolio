# Modern Executive Developer Portfolio

A responsive, high-converting, and modern portfolio website engineered for software engineers, computer science scholars, and technical specialists to showcase completed projects, technical skills, and academic coursework to recruiters and hiring teams.

Built with semantic HTML5, modern Tailwind CSS, and vanilla ES6+ JavaScript. **Zero build steps, zero complex dependencies, and instant load speeds.**

---

## 🌟 Key Features

1. **Executive Visual Design & Typography**
   - Professional color palette: deep slate / navy in dark mode (`#0B0F19`, `#111827`), crisp white in light mode.
   - Glassmorphic navigation bar with real-time reading/scroll progress indicator.
   - Micro-interactions, card hover lifts, subtle gradients, and custom sleek scrollbars.

2. **Seamless Dark / Light Mode Toggle**
   - Automatically detects OS/browser color scheme (`prefers-color-scheme`).
   - Manual toggle button in both desktop and mobile navigation menus.
   - Remembers user preference in browser `localStorage`.

3. **Dynamic Project Showcase & Category Filtering**
   - Fully dynamic rendering powered by `js/projects.js`.
   - Category filter tabs: `All Projects`, `Web Apps`, `Data & Research`, `Systems & Tools`, `Case Studies`.
   - Real-time client-side search bar by title, technology stack, or topic.
   - High-impact project cards with metric badges (e.g. AUROC, throughput, latency), tech pills, and live demo / code repository links.

4. **Native Accessible Case Study Modal (`<dialog>`)**
   - Clicking "Read Case Study" on any card opens an in-depth modal view with:
     * Executive Problem Context & Objective
     * Full Architecture & Engineering Methodology
     * Measurable Outcomes & Deliverables checklist
     * Engineering Retrospective & Key Takeaway
     * Interactive links to Live Demos, Repositories, and Research Docs
   - Built with the native HTML5 `<dialog>` element: supports `ESC` key, backdrop blur click-to-close, and accessibility focus management.

5. **Academic Journey & Coursework**
   - Degree & honors card with GPA and core coursework badges.
   - Verified certifications with badge IDs.
   - Academic distinctions, hackathon awards, and teaching assistantships.

6. **Interactive Contact & Conversion**
   - Contact form with client-side validation (Name, Email, Message) and animated feedback toast.
   - Direct contact channels with one-click "Copy Email" clipboard utility.
   - Work authorization and location status badge.

---

## 📂 Project Structure

```
MY-PORTFOLIO/
├── index.html          # Semantic HTML5 layout, accessible sections & native dialog modal
├── css/
│   └── styles.css      # Custom animations, glassmorphism, scrollbars, and modal styling
├── js/
│   ├── projects.js     # Structured dataset for projects, skills, education, and credentials
│   └── app.js          # Core logic: theme switching, dynamic catalog, filtering, modal, form validation
└── README.md           # Documentation & deployment guide
```

---

## 🚀 Quick Start & Local Preview

### Option 1: Direct Browser Preview (Zero Tools Required)
Simply **double-click** `index.html` in Windows Explorer or open it in any modern browser (Google Chrome, Microsoft Edge, Firefox, Brave).

### Option 2: Using VS Code / Live Server Extension
1. Open the `MY-PORTFOLIO` folder in VS Code.
2. Click **Go Live** on the bottom status bar (using the *Live Server* extension).
3. The portfolio will launch at `http://127.0.0.1:5500`.

### Option 3: Using Any Local Server (If Node or Python is installed)
```bash
# Using Python 3 (if installed):
python -m http.server 8000

# Or using npx serve (if Node.js is installed):
npx serve .
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Updating Projects & Case Studies
Open `js/projects.js` and add a new item to `projectsData`:
```javascript
{
  id: "my-new-project",
  title: "Project Title",
  category: "Web Apps", // "Web Apps" | "Data & Research" | "Systems & Tools" | "Case Studies"
  featured: true,
  date: "Summer 2025",
  summary: "A concise 1-2 sentence problem and solution statement.",
  fullDescription: "In-depth overview of the problem, stack, and architecture.",
  objective: "Core objective and requirements.",
  methodology: "How you built and tested it.",
  keyOutcomes: [
    "Delivered 35% latency improvement.",
    "Integrated secure authentication with OAuth 2.0."
  ],
  keyTakeaways: "Lessons learned during development.",
  tags: ["TypeScript", "React", "PostgreSQL", "Docker"],
  metrics: [
    { label: "Performance", value: "99/100" },
    { label: "Users", value: "5,000+" }
  ],
  gradient: "from-indigo-600 to-blue-500",
  links: {
    demo: "https://your-demo-url.com",
    github: "https://github.com/yourusername/your-repo",
    docs: "https://your-docs-url.com"
  }
}
```
The UI updates automatically upon refreshing the browser!

### 2. Updating Skills, Education & Certifications
Edit `skillsData` and `academicData` directly in `js/projects.js` to change your degree, GPA, coursework list, and certifications.

### 3. Personalizing Your Name, Socials & Contact Info
Open `index.html` and update:
- Headline, bio, and availability badge in `#about`.
- Your email address in `#userEmailText` and `mailto:` links.
- Your GitHub and LinkedIn links.

---

## 🌐 Free Deployment Guide

### Deploying to GitHub Pages (Recommended — 2 Minutes)
1. Initialize a Git repository and push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to your repository on GitHub.
3. Click **Settings** > **Pages** (in the left sidebar).
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. In ~60 seconds, your portfolio will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

### Deploying to Vercel (Instant Zero-Config)
1. Visit [vercel.com](https://vercel.com) and sign in.
2. Click **Add New...** > **Project**.
3. Import your GitHub repository (or drag-and-drop the `MY-PORTFOLIO` folder via the Vercel CLI: `npx vercel`).
4. Keep default settings and click **Deploy**. Your site will be live on a fast global CDN with custom SSL!

### Deploying to Netlify
1. Visit [netlify.com](https://netlify.com) and sign in.
2. Drag and drop the `MY-PORTFOLIO` folder onto the Netlify Dashboard, or link your GitHub repository.
3. Your portfolio is published with custom domain support and automated form handling.

---

## 📄 License
MIT License. Feel free to customize and use this template for your personal portfolio!
