import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { PageLoader } from './components/PageLoader/PageLoader'
import './App.css'

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
// Each page is a separate chunk — loaded only when the user navigates to it.
const Home       = lazy(() => import('./pages/Home'))
const Dashboard  = lazy(() => import('./pages/Dashboard'))
const Incidents  = lazy(() => import('./pages/Incidents'))
const Services   = lazy(() => import('./pages/Services'))
const OnCall     = lazy(() => import('./pages/OnCall'))
const Settings   = lazy(() => import('./pages/Settings'))

// ─── Navigation ───────────────────────────────────────────────────────────────
const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/incidents', label: 'Incidents' },
  { to: '/services',  label: 'Services'  },
  { to: '/oncall',    label: 'On-Call'   },
  { to: '/settings',  label: 'Settings'  },
]

function Nav() {
  return (
    <nav className="app-nav">
      <NavLink to="/" className="app-nav__brand">
        Sentri
      </NavLink>
      <div className="app-nav__links">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      {/*
        Suspense catches every lazy() import below this point.
        The <PageLoader /> skeleton is shown while the chunk downloads.
        Each route is its own JS chunk — users only download what they visit.
      */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/services"  element={<Services />}  />
          <Route path="/oncall"    element={<OnCall />}    />
          <Route path="/settings"  element={<Settings />}  />

          {/* Catch-all → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
