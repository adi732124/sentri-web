import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  AlertTriangle,
  Server,
  Phone,
  Settings,
  Bell,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '@/stores/auth.store'
import { useSocket } from '@/hooks/useSocket'
import { Avatar } from '@/components/Avatar/Avatar'
import { queryClient } from '@/lib/queryClient'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/incidents', icon: AlertTriangle, label: 'Incidents' },
  { to: '/services', icon: Server, label: 'Services' },
  { to: '/oncall', icon: Phone, label: 'On-Call' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('sentri_theme')
    if (stored) return stored === 'dark'
    // Default to dark for a monitoring app
    return true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('sentri_theme', dark ? 'dark' : 'light')
  }, [dark])

  return { dark, toggle: () => setDark((d) => !d) }
}

export function MainLayout() {
  useSocket()
  const { dark, toggle } = useDarkMode()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!userMenuOpen) return
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [userMenuOpen])

  const handleLogout = () => {
    setUserMenuOpen(false)
    logout()
    queryClient.clear()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* ── Sidebar — desktop only ─────────────────────────────────────────── */}
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)] md:flex">
        {/* Brand */}
        <div className="flex h-14 items-center gap-2.5 border-b border-[var(--border)] px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
            <span className="text-xs font-bold text-white">S</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-[var(--text-h)]">Sentri</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                    : 'text-[var(--text)] hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 1.75} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <div className="border-t border-[var(--border)] p-2.5">
          <button
            onClick={toggle}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-14 flex-shrink-0 items-center border-b border-[var(--border)] bg-[var(--bg)] px-4">
          {/* Brand — mobile only; flex-1 pushes actions to the right */}
          <div className="flex flex-1 items-center gap-2 md:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-[var(--text-h)]">Sentri</span>
          </div>

          {/* Actions — always on the RIGHT (ml-auto on desktop since brand is gone) */}
          <div className="ml-auto flex items-center gap-1 md:ml-0">
            {/* Dark mode — mobile only */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)] md:hidden"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <button
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
            >
              <Bell size={16} />
            </button>

            {/* User menu */}
            <div ref={userMenuRef} className="relative ml-1">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className={clsx(
                  'flex h-9 items-center gap-2 rounded-lg px-2 transition-colors hover:bg-[var(--code-bg)]',
                  userMenuOpen && 'bg-[var(--code-bg)]',
                )}
              >
                <Avatar name={user?.name ?? 'U'} size="xs" />
                <span className="hidden max-w-[110px] truncate text-sm font-medium text-[var(--text-h)] sm:block">
                  {user?.name ?? 'User'}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-sentri">
                  <div className="border-b border-[var(--border)] px-4 py-3">
                    <p className="truncate text-sm font-semibold text-[var(--text-h)]">
                      {user?.name ?? 'User'}
                    </p>
                    <p className="truncate text-xs text-[var(--text)]">
                      {user?.email ?? 'user@sentri.dev'}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-[var(--text)] transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* ── Bottom tab bar — mobile only ──────────────────────────────────── */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
        <div className="flex h-16 items-stretch px-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-1 flex-col items-center justify-center"
            >
              {({ isActive }) => (
                <>
                  {/* Pill background */}
                  <span
                    className={clsx(
                      'absolute inset-x-1 inset-y-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-[var(--accent-bg)]' : 'bg-transparent',
                    )}
                  />
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.75}
                    className={clsx(
                      'relative z-10 transition-colors',
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]',
                    )}
                  />
                  <span
                    className={clsx(
                      'relative z-10 mt-1 text-[10px] font-semibold leading-none transition-colors',
                      isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]',
                    )}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
