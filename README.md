# ⚡ Azhar — Modern High-Performance Portfolio (Sawad Framer Clone)

An exact, pixel-perfect clone and evolution of the [Sawad Framer Template](https://sawad.framer.website/), built with **Next.js 15+ (App Router)**, **TypeScript**, **Framer Motion**, **GSAP**, and clean modern CSS tokens.

Designed for **maximum visual excellence**, **fluid micro-interactions**, and **100% customizability**.

---

## 🌟 Key Features

- **Exact Sawad Framer Aesthetics**:
  - Dark sleek palette (`#131211`, `#1c1b18`, `#23211e`)
  - Signature neon lime (`#c5ff41`) and sunset orange (`#f46c38`) accents
  - Bold typography with Google Fonts `Poppins` (display) & `Inter` (body)
  - Glassmorphic floating navigation pill with scroll spy
  - Infinite animated expertise ticker (Marquee)
  - Subtle interactive follower cursor for desktop
- **Fluid Micro-Animations**:
  - **Framer Motion**: Spring physics, layout animations, modal transitions, and magnetic hover states
  - **GSAP**: Scroll triggers, smooth element reveals, and stagger animations
- **⚡ Two Ways to Edit the Portfolio**:
  1. **In-Browser Live Visual Editor**:
     - Click the **"Edit Mode"** button or press <kbd>Ctrl</kbd> + <kbd>E</kbd>
     - Edit your Name, Bio, Stats, Projects, Experience, Tools, and Contact Info right inside the browser
     - Click **"Save & Apply Live"** — changes persist to `localStorage` and write to disk via `/api/save-config`!
     - Click **"Export JSON"** to download your customized data file anytime
  2. **Direct Code Configuration**:
     - Edit [`src/config/portfolio.config.ts`](file:///d:/Azhar%20Protfolio/src/config/portfolio.config.ts) — the single source of truth for all content
- **100% Responsive**: Tested across mobile, tablet, laptop, and ultra-wide screens
- **Interactive Modals**:
  - Project case study preview modal
  - Full-text article reader modal with authentic typography
  - Visual live portfolio editor modal

---

## 📁 Senior-Developer Organized Folder Structure

```
d:/Azhar Protfolio/
├── public/
│   └── assets/                     # Downloaded media, avatars, project mockups & icons
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts    # Contact form endpoint
│   │   │   └── save-config/route.ts# Local disk persistence API
│   │   ├── globals.css             # Framer design tokens, marquee, glow & reset styles
│   │   ├── layout.tsx              # Root layout with fonts, viewport & SEO metadata
│   │   └── page.tsx                # Main single-page application orchestrator
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx           # Pulsing status badges & category pills
│   │   │   ├── Button.tsx          # Animated spring buttons with glow variants
│   │   │   ├── Marquee.tsx         # Smooth infinite ticker tape
│   │   │   └── SectionHeading.tsx  # Display section titles with divider lines
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Floating glass pill navbar & mobile menu
│   │   │   └── Footer.tsx          # Clean footer with social icons & back-to-top
│   │   ├── modals/
│   │   │   ├── ArticleModal.tsx    # Full-screen article reading view
│   │   │   ├── EditPortfolioModal.tsx # In-browser live editor with multi-tab controls
│   │   │   └── ProjectModal.tsx    # Detailed project case study preview
│   │   ├── sections/
│   │   │   ├── ContactSection.tsx  # "Let's Work Together" form with confetti feedback
│   │   │   ├── ExperienceSection.tsx# 12 Years of Experience timeline
│   │   │   ├── HeroSection.tsx     # Hero banner, portrait, stats & CTA buttons
│   │   │   ├── ProjectsSection.tsx # Filterable recent projects showcase
│   │   │   └── ToolsSection.tsx    # 6 Premium tools software grid
│   │   └── ui/
│   │       └── CustomCursor.tsx    # Precision follower cursor
│   ├── config/
│   │   └── portfolio.config.ts     # ⭐️ SINGLE SOURCE OF TRUTH (Editable data)
│   ├── context/
│   │   └── PortfolioContext.tsx    # React Context with live editing & localStorage sync
│   ├── hooks/
│   │   └── useGsapReveal.ts        # GSAP reveal & stagger micro-animation hooks
│   ├── types/
│   │   └── portfolio.ts            # Strongly typed TypeScript interfaces
│   └── utils/
│       └── animations.ts           # Framer motion variants & easing curves
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Running the Project Locally

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

---

## ✏️ How to Customize Your Portfolio

### Method A: Live in the Browser (Recommended)
1. Open the website at [http://localhost:3000](http://localhost:3000)
2. Press <kbd>Ctrl</kbd> + <kbd>E</kbd> or click the **"Edit Mode"** button in the top navbar or bottom-right corner.
3. Update any information (Personal info, Stats, Projects, Experience, Tools, Social links).
4. Click **"Save & Apply Live"**.

### Method B: Edit the Configuration File
Open [`src/config/portfolio.config.ts`](file:///d:/Azhar%20Protfolio/src/config/portfolio.config.ts) and modify any values:
- `profile`: Your name, role, bio, headline, and avatar
- `stats`: Numbers and labels for experience, projects, clients
- `projects`: Project titles, images, descriptions, tags, and links
- `experiences`: Work history and achievements
- `tools`: Software skills and proficiency
- `thoughts`: Blog posts and technical write-ups
- `contact`: Email, location, and budget options
