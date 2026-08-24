# JJ Ginon — Frontend Web Developer Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/93a6e5af-942e-4ca9-acf6-aff26f20e1f5/deploy-status)](https://app.netlify.com/projects/jjmginon-dev/deploys)

A personal portfolio site built in 2026 with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. It's a fully self-contained showcase of my projects, including **OptiPix**, **AtmoSeek**, and **NexuSearch**, wrapped in a dark developer-console visual identity with a cyan accent (and a complete light-mode alternative).

**Live site:** [jjmginon-dev.netlify.app](https://jjmginon-dev.netlify.app)

---

## 🌐 Project Overview

This site demonstrates how a personal portfolio can be built entirely from fundamentals — no frameworks, no bundlers — while still feeling deliberate and polished:

- **Semantic HTML5** for structure, accessibility, and maintainability
- **Mobile-first, responsive CSS** using custom properties (design tokens) and BEM naming
- **JavaScript (ES6+)** for theming, navigation, scroll behavior, and project filtering — all vanilla, no modules or bundlers
- **Developer-console visual identity** — dark UI, cyan accent, monospace accents, with the OptiPix gradient reserved exclusively for its featured spotlight
- **Deployed on Netlify**, version-controlled with GitHub

---

## 📂 File Structure

```
jjmginon-dev/
│
├── index.html              # Main entry point
├── css/
│   └── styles.css          # Global styles, design tokens, layout
├── js/
│   └── script.js           # Theme, nav, scroll, filter, and typewriter logic
├── assets/
│   ├── favicon.svg
│   └── og-image.svg        # Open Graph / social preview image
└── images/
    ├── optipix-screenshot-1920x1080.webp
    ├── atmoseek-screenshot-1920x1080.webp
    ├── nexusearch-app-screenshot-1920x1080.webp
    ├── watodo-app-screenshot-1920x1080.webp
    ├── coffeescript-cafe-screenshot-1920x1080.webp
    └── rps-pve-screenshot-1920x1080.webp
```

---

## ✨ Highlights

- **Dark / light theme toggle**
  Persisted via `localStorage`, and defaults to the visitor's OS-level `prefers-color-scheme` on first visit.

- **Accessible mobile navigation**
  Hamburger menu with `inert` focus management, scroll-spy active-link highlighting, and Escape/outside-click dismissal.

- **Scroll-reveal animations**
  Elements fade and slide into view via `IntersectionObserver`, with a `.no-js` fallback and full support for `prefers-reduced-motion`.

- **Featured project spotlight**
  OptiPix is highlighted in its own section with a custom violet-to-orange gradient glow, distinct from the rest of the site's cyan theme.

- **Filterable project grid**
  Client-side filtering by category — Serverless, SCSS Architecture, Accessibility-First, and Interactive & Games.

- **Animated hero typewriter & scroll progress bar**
  Small interactive touches — a rotating tagline in the hero and a fixed top bar reflecting scroll position — that add polish without extra dependencies.

---

## 🚀 Getting Started

This is a static site with no build step, so it can be run directly.

1. Clone the repository:
   ```bash
   git clone https://github.com/jjmginon/jjmginon-dev.git
   ```
2. Navigate into the project folder:
   ```bash
   cd jjmginon-dev
   ```
3. Open `index.html` directly in a browser, or serve it locally (recommended, so relative paths and fonts behave the same as in production):
   ```bash
   npx serve .
   ```

---

## 🛠️ Technologies

- **HTML5** — semantic structure and accessibility
- **CSS3** — custom properties, BEM methodology, mobile-first responsive layout
- **JavaScript (ES6+)** — vanilla, no modules/bundlers; organized into small `init*()` functions
- **Google Fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (UI/code accents)
- **Netlify** — hosting and continuous deployment from GitHub

---

## 📖 Context

This portfolio pulls together everything learned across the projects it showcases — accessibility-first markup, mobile-first CSS architecture, and vanilla JavaScript UI patterns — into a single cohesive site. It was also rebuilt from scratch in its own multi-session effort, working through layout and overflow issues (mobile menu, horizontal scroll, screenshot letterboxing, card alignment) to land on its current dark developer-console aesthetic.

## Featured Project: OptiPix

[OptiPix](https://optipix.netlify.app) is the flagship project featured on this site — a mobile-first image compression tool built with vanilla JavaScript on the frontend and a Netlify Function powered by `sharp` on the backend. See its [repository](https://github.com/jjmginon/optipix) for details.

## Other Projects

| Project                  | Description                                                        | Live                                           | Source                                                  |
| ------------------------ | ------------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| AtmoSeek                 | Weather app with serverless API proxy and ARIA autocomplete        | [Demo](https://atmoseek.netlify.app)           | [GitHub](https://github.com/jjmginon/atmoseek)          |
| NexuSearch               | Wikipedia-powered search app with a cold-tech visual identity      | [Demo](https://nexusearch-app.netlify.app/)    | [GitHub](https://github.com/jjmginon/nexusearch-app)    |
| WaTodo                   | Lightweight, accessible task manager with localStorage persistence | [Demo](https://watodo-app.netlify.app/)        | [GitHub](https://github.com/jjmginon/watodo-app)        |
| CoffeeScript Café        | Multi-page café site rebuilt with a modern, accessible design      | [Demo](https://coffeescript-cafe.netlify.app/) | [GitHub](https://github.com/jjmginon/coffeescript-cafe) |
| Rock Paper Scissors: PvE | RPG-themed reimagining of the classic game                         | [Demo](https://rps-pve.netlify.app/)           | [GitHub](https://github.com/jjmginon/rps-pve)           |

---

## 👨‍💻 Author

**JJ Ginon**
Frontend Web Developer building fast, accessible, and thoughtful web experiences with HTML, CSS, JavaScript, and serverless functions.

|           |                                                              |
| --------- | ------------------------------------------------------------ |
| Portfolio | [jjmginon-dev.netlify.app](https://jjmginon-dev.netlify.app) |
| GitHub    | [github.com/jjmginon](https://github.com/jjmginon)           |
| LinkedIn  | [linkedin.com/in/jjmginon](https://linkedin.com/in/jjmginon) |
| Threads   | [@jjmginon](https://www.threads.net/@jjmginon)               |
| X         | [@jjmginon](https://x.com/jjmginon)                          |

---

## License

MIT License — see [LICENSE](./LICENSE) for details.
Note: source code is MIT licensed; project screenshots and written descriptions of individual projects are not.
