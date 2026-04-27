# sentri-web — Project Summary

## What Is This

`sentri-web` is the **frontend** of Sentri — a real-time developer monitoring and collaboration platform. This repo is a pure React SPA; the backend (`sentri-api`) is a separate project. All API calls, WebSocket connections, and data fetching talk to that external API.

---

## Full Frontend Tech Stack

### Core

| Layer | Technology | Version | Status |
|---|---|---|---|
| UI Framework | React | 19.x | ✅ Done |
| Language | TypeScript | 6.x | ✅ Done |
| Build Tool | Vite | 8.x | ✅ Done |
| Styling | Tailwind CSS | 3.x | ❌ Pending |
| Routing | React Router | 6.x | ❌ Pending |
| Global State | Zustand | 4.x | ❌ Pending |
| Server State | React Query (TanStack) | 5.x | ❌ Pending |
| HTTP Client | Axios | 1.x | ❌ Pending |
| Real-time | Socket.io client | 4.x | ❌ Pending |
| Charts | Recharts | 2.x | ❌ Pending |

### Forms & Validation

| Layer | Technology | Version | Status |
|---|---|---|---|
| Form handling | React Hook Form | 7.x | ❌ Pending |
| Schema validation | Zod | 3.x | ❌ Pending |

### UI Utilities

| Layer | Technology | Version | Status |
|---|---|---|---|
| Icons | Lucide React | latest | ❌ Pending |
| Drag & drop | @dnd-kit/core + sortable | 6.x | ❌ Pending |
| Toast notifications | react-hot-toast | 2.x | ❌ Pending |
| Date formatting | date-fns | 3.x | ❌ Pending |
| Class utilities | clsx | 2.x | ❌ Pending |

### Component Development

| Layer | Technology | Version | Status |
|---|---|---|---|
| Component docs | Storybook | 8.x | ✅ Done |
| Visual regression | Chromatic | latest | ❌ Pending |

### Code Quality

| Layer | Technology | Version | Status |
|---|---|---|---|
| Linting | ESLint + TypeScript ESLint | 10.x / 8.x | ✅ Done |
| Formatting | Prettier | 3.x | ❌ Pending |
| Pre-commit hooks | Husky + lint-staged | 9.x / 15.x | ❌ Pending |

### Testing

| Layer | Technology | Version | Status |
|---|---|---|---|
| Unit & integration tests | Vitest | 2.x | ❌ Pending |
| Component testing | @testing-library/react | 16.x | ❌ Pending |
| E2E testing | Playwright | 1.x | ❌ Pending |
| Visual regression | Chromatic (CI) | latest | ❌ Pending |

### CI/CD & Deployment

| Layer | Technology | Status |
|---|---|---|
| CI pipeline | GitHub Actions | ❌ Pending |
| Preview deploys | Vercel / Netlify | ❌ Pending |
| Storybook hosting | Chromatic | ❌ Pending |

---

## Target Project Structure (Full)

```
sentri-web/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml             # lint · type-check · test · Chromatic on every PR
│       └── deploy.yml         # build + deploy to Vercel on merge to main
│
├── src/
│   ├── components/            # Reusable UI primitives (Storybook-first)
│   │   ├── index.ts
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Input/
│   │   ├── Avatar/
│   │   ├── StatusBadge/       ← planned
│   │   ├── IncidentCard/      ← planned
│   │   ├── MetricChart/       ← planned
│   │   ├── AlertBanner/       ← planned
│   │   ├── OnCallBadge/       ← planned
│   │   ├── ServiceStatusCard/ ← planned
│   │   └── TimelineItem/      ← planned
│   │
│   ├── layouts/               ← planned
│   │   ├── MainLayout.tsx     # Sidebar + Topbar shell
│   │   └── AuthLayout.tsx     # Centered card for login/register
│   │
│   ├── pages/                 ← planned
│   │   ├── Dashboard.tsx
│   │   ├── Incidents.tsx
│   │   ├── Services.tsx
│   │   ├── OnCall.tsx
│   │   ├── Settings.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── stores/                ← planned (Zustand)
│   │   ├── auth.store.ts
│   │   ├── incidents.store.ts
│   │   ├── services.store.ts
│   │   └── workspace.store.ts
│   │
│   ├── services/              ← planned (Axios + React Query)
│   │   ├── api.ts             # Axios instance + interceptors
│   │   ├── incidents.api.ts
│   │   ├── services.api.ts
│   │   └── oncall.api.ts
│   │
│   ├── hooks/                 ← planned
│   │   ├── useSocket.ts       # Socket.io connection + event subscriptions
│   │   ├── useAuth.ts
│   │   └── useWorkspace.ts
│   │
│   ├── lib/
│   │   └── socket.ts          ← planned — Socket.io client singleton
│   │
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   └── assets/
│
├── tests/
│   ├── unit/                  ← Vitest — stores, utils, Zod schemas
│   ├── components/            ← Testing Library — component render tests
│   └── e2e/                   ← Playwright — login, incident lifecycle
│
├── docs/
│   ├── storybook.md
│   └── components/
│
├── .env.example               ← planned — documents required env vars
├── .prettierrc                ← planned
├── .husky/                    ← planned
├── public/
├── index.html
├── package.json
├── vite.config.ts             # will add @/ path alias
├── playwright.config.ts       ← planned
├── vitest.config.ts           ← planned
└── tsconfig.json
```

---

## Scripts (Current + Planned)

```bash
# Development
npm run dev              # Vite dev server → http://localhost:5173
npm run storybook        # Storybook → http://localhost:6006

# Build
npm run build            # tsc -b && vite build → dist/
npm run build-storybook  # Static Storybook → storybook-static/
npm run preview          # Serve production build locally

# Code quality
npm run lint             # ESLint
npm run format           # Prettier (planned)
npm run type-check       # tsc --noEmit (planned)

# Testing
npm run test             # Vitest unit + component tests (planned)
npm run test:e2e         # Playwright E2E (planned)
npm run test:coverage    # Vitest coverage report (planned)
```

---

## What Still Needs to Be Built

### Phase 2 — Styling & Routing Foundation
- [ ] Install **Tailwind CSS** + configure dark mode (`class` strategy)
- [ ] Extend `tailwind.config.ts` with Sentri design tokens (accent, text, bg colors)
- [ ] Install **Prettier** and `.prettierrc` with Tailwind plugin for class sorting
- [ ] Set up **Husky** + **lint-staged** (runs ESLint + Prettier on staged files before commit)
- [ ] Add `@/` path alias in `vite.config.ts` and `tsconfig.app.json`
- [ ] Install **Lucide React** for icons
- [ ] Install **clsx** for conditional class merging
- [ ] Migrate existing component CSS to Tailwind utility classes
- [ ] Install **React Router v6** and define route tree
- [ ] Create `AuthLayout` and `MainLayout` (Sidebar + Topbar)
- [ ] Add pages: `Dashboard`, `Incidents`, `Services`, `OnCall`, `Settings`, `Login`

### Phase 3 — HTTP, Forms & Validation
- [ ] Install **Axios** and create `src/services/api.ts`:
  - Base URL from `VITE_API_URL` env var
  - Request interceptor: attach JWT `Authorization` header
  - Response interceptor: catch 401 → refresh token → retry request
- [ ] Create `.env.example` documenting `VITE_API_URL`, `VITE_WS_URL`
- [ ] Install **Zod** — define schemas for all API request/response shapes
- [ ] Install **React Hook Form** — wire up Login, Register, Incident Create, Workspace Invite forms
- [ ] Install **date-fns** for timeline date formatting and on-call calendar ranges

### Phase 4 — State Management & Auth
- [ ] Install **Zustand** — create stores:
  - `auth.store` — user, token, workspace context, login/logout actions
  - `incidents.store` — incident list, active filters, optimistic updates
  - `services.store` — service list + health summaries
  - `workspace.store` — current workspace, members, roles
- [ ] Install **React Query** — wrap all Axios calls; handle loading/error/success states, caching, background sync
- [ ] Implement protected routes (redirect to login if no JWT)
- [ ] Connect all pages to `sentri-api` REST endpoints

### Phase 5 — Real-Time Features
- [ ] Install **Socket.io client** — create `src/lib/socket.ts` singleton
- [ ] Create `useSocket` hook — connects on auth, disconnects on logout, subscribes to workspace room
- [ ] `incidents.store` receives `incident:created` / `incident:updated` → updates list live
- [ ] Activity feed receives `activity:new` events
- [ ] Service status badge reacts to `service:status:changed`
- [ ] Install **react-hot-toast** — show toasts on `notification:alert` events and on mutation success/error

### Phase 6 — Feature Pages
- [ ] **Incident Feed** — list with severity/status filters, acknowledge/resolve actions, real-time badge counts
- [ ] **Service Health Dashboard** — uptime %, Recharts area chart (p50/p95/p99 latency), error rate over 1h/24h/7d/30d
- [ ] **Team Activity Timeline** — deployment/PR/commit feed, filterable by service/author/type/date
- [ ] **On-Call Schedule** — rotation calendar with **@dnd-kit** drag & drop, escalation chain display, current on-call badge
- [ ] **Multi-Workspace UI** — workspace switcher, invite-by-email flow, member role management

### Phase 7 — Storybook Domain Components
- [ ] `StatusBadge` — Critical · High · Medium · Low severity indicators
- [ ] `IncidentCard` — Open · Acknowledged · Resolved states with action buttons
- [ ] `MetricChart` — Recharts time-series wrapper (latency, uptime, error rate variants)
- [ ] `AlertBanner` — dismissible Info · Warning · Danger banner
- [ ] `OnCallBadge` — Active · Off-duty · Escalated states
- [ ] `ServiceStatusCard` — health overview card (all status states)
- [ ] `TimelineItem` — Deploy · PR merge · Commit event entries

### Phase 8 — Testing
- [ ] Install **Vitest** + `@testing-library/react` + `jsdom`
- [ ] Unit tests: Zustand store actions, Axios interceptors, Zod schemas, date-fns helpers
- [ ] Component tests: render + interaction tests for all Storybook components
- [ ] Install **Playwright** — E2E tests for critical paths:
  - Register → login → create incident → acknowledge → resolve
  - Workspace invite → member joins → sees live incident
- [ ] Set up **Chromatic** — publish Storybook on every PR for visual regression diffs
- [ ] Target: 70% unit/component coverage, all critical E2E paths covered

### Phase 9 — CI/CD & Deploy
- [ ] `.github/workflows/ci.yml` — triggers on every PR:
  - `npm run lint`
  - `npm run type-check`
  - `npm run test`
  - Chromatic visual regression
- [ ] `.github/workflows/deploy.yml` — triggers on merge to `main`:
  - `npm run build`
  - Deploy `dist/` to Vercel / Netlify
  - Post-deploy smoke test (ping production URL)
- [ ] Configure Vercel / Netlify:
  - Production branch: `main`
  - Preview deploys on every PR with unique URL
  - Environment variables: `VITE_API_URL`, `VITE_WS_URL`

### Phase 10 — Polish
- [ ] Full dark mode via Tailwind `dark:` classes throughout all pages
- [ ] Responsive layout — mobile sidebar drawer, stacked charts on small screens
- [ ] `ErrorBoundary` component wrapping each page for graceful fallback
- [ ] Accessibility audit pass (keyboard nav, ARIA labels, focus management)
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices

---

## Component Library (Done)

All base components exported from `src/components/index.ts`:

```tsx
import { Button, Card, Badge, Input, Avatar } from './components'
```

| Component | Variants / Sizes | Key Props |
|---|---|---|
| `Button` | primary · secondary · ghost · danger × sm · md · lg | `loading`, `fullWidth`, `leftIcon`, `rightIcon` |
| `Card` | bordered · shadow | `title`, `description`, `footer` slot |
| `Badge` | success · warning · error · info · neutral × sm · md | `dot` |
| `Input` | default · error · disabled | `label`, `hint`, `error`, `leftIcon`, `rightIcon` |
| `Avatar` | xs · sm · md · lg · xl | `name` (initials), `src`, `status` (online/busy/away/offline) |

---

## Storybook

| Addon | Purpose |
|---|---|
| `addon-essentials` | Controls, Actions, Viewport, Backgrounds, Docs |
| `addon-interactions` | Play-function interaction testing |
| `addon-a11y` | Accessibility audit panel |

---

## Environment Variables

```bash
# .env.local (not committed — copy from .env.example)
VITE_API_URL=http://localhost:4000/api/v1
VITE_WS_URL=http://localhost:4000
```

---

## Design Tokens

Defined in `src/index.css` — will be migrated to `tailwind.config.ts` once Tailwind is added.

| Token | Light | Dark |
|---|---|---|
| `--accent` | `#aa3bff` | `#c084fc` |
| `--text` | `#6b6375` | `#9ca3af` |
| `--text-h` | `#08060d` | `#f3f4f6` |
| `--bg` | `#ffffff` | `#16171d` |
| `--border` | `#e5e4e7` | `#2e303a` |

---

## Module Documentation Index

| Module | Doc |
|---|---|
| Button | [docs/components/Button.md](docs/components/Button.md) |
| Card | [docs/components/Card.md](docs/components/Card.md) |
| Badge | [docs/components/Badge.md](docs/components/Badge.md) |
| Input | [docs/components/Input.md](docs/components/Input.md) |
| Avatar | [docs/components/Avatar.md](docs/components/Avatar.md) |
| Storybook | [docs/storybook.md](docs/storybook.md) |

---

## Progress Tracker

| Phase | Work | Status |
|---|---|---|
| 1 | Scaffold · base components · Storybook | ✅ Done |
| 2 | Tailwind · Prettier · Husky · React Router · Layout | ❌ Not started |
| 3 | Axios · Zod · React Hook Form · date-fns · env vars | ❌ Not started |
| 4 | Zustand stores · React Query · Auth · API wiring | ❌ Not started |
| 5 | Socket.io client · real-time incident/activity/toast | ❌ Not started |
| 6 | Incident feed · Service dashboard · On-call · Workspace UI | ❌ Not started |
| 7 | Storybook domain components (StatusBadge, IncidentCard…) | ❌ Not started |
| 8 | Vitest · Testing Library · Playwright · Chromatic | ❌ Not started |
| 9 | GitHub Actions CI/CD · Vercel deploy · preview URLs | ❌ Not started |
| 10 | Dark mode · Responsive · ErrorBoundary · Accessibility | ❌ Not started |

---

## Notes

- Backend (`sentri-api`) is a **separate repository** — this frontend talks to it over HTTP + WebSocket
- Node v23.9.0 triggers ESLint engine warnings (ESLint 10 needs `^20.19.0 || ^22.13.0 || >=24`) — upgrading to Node v24 silences them
- Build output: `dist/` — static files, deployable to Vercel / Netlify / any CDN
