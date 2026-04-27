# sentri-web — Project Summary

## Purpose

`sentri-web` is the React + TypeScript web frontend for the **Sentri** project. Currently scaffolded from the Vite React-TS template, it provides the foundational setup for building a modern single-page application with HMR and strict TypeScript.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19.2.5 |
| Language | TypeScript | 6.0.2 |
| Build Tool | Vite | 8.0.10 |
| React Plugin | @vitejs/plugin-react (Oxc) | 6.0.1 |
| Linting | ESLint + TypeScript ESLint | 10.2.1 / 8.58.2 |

---

## Project Structure

```
sentri-web/
├── src/
│   ├── main.tsx          # App entry point — mounts <App /> into #root
│   ├── App.tsx           # Root component (counter demo, logo, links)
│   ├── App.css           # Component-scoped styles
│   ├── index.css         # Global styles, CSS custom properties, dark mode
│   └── assets/           # Static assets (hero.png, react.svg, vite.svg)
├── public/               # Served as-is (favicon.svg, icons.svg)
├── index.html            # HTML shell
├── vite.config.ts        # Vite config (React plugin)
├── tsconfig.json         # Root TS config (references app + node configs)
├── tsconfig.app.json     # App TS config (target ES2023, strict, react-jsx)
├── tsconfig.node.json    # Node/build-tools TS config
├── eslint.config.js      # Flat ESLint config (recommended + hooks + refresh)
└── package.json
```

---

## Scripts

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # tsc -b && vite build → dist/
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
```

---

## TypeScript Configuration Highlights

- **Target:** ES2023
- **Module:** ESNext
- **JSX:** react-jsx (automatic transform, no import needed)
- **Strict flags:** `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `erasableSyntaxOnly`

---

## Styling

- CSS custom properties for theming (light + dark via `prefers-color-scheme`)
- System font stack (`system-ui`, `Segoe UI`, `Roboto`)
- Responsive breakpoint at **1024px**
- Max container width: **1126px**
- Accent color: `#aa3bff` (light) / `#c084fc` (dark)

---

## Current State

The app renders a minimal hero page with:
- Animated Vite + React logos
- An interactive counter button (`useState`)
- Documentation links and social links (GitHub, Discord, X, Bluesky)

This is a **starter scaffold** — ready to be replaced with Sentri's actual features.

---

## Notes

- No API integrations or environment variables configured yet
- No routing library installed
- No state management library installed
- Build output: `dist/` (static files, suitable for CDN / static hosting)
