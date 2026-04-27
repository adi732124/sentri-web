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
  ChevronDown,
} from 'lucide-react'
import { useState, useEffect } from 'react'
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
    return window.matchMedia('(prefers-color-scheme: dark)').matches
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

  const handleLogout = () => {
    logout()
    queryClient.clear()
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      {/* ── Sidebar ── */}
      <aside className="flex w-56 flex-shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg)]">
        <div className="flex h-14 items-center border-b border-[var(--border)] px-4">
          <span className="text-base font-bold tracking-tight text-[var(--accent)]">Sentri</span>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                    : 'text-[var(--text)] hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]',
                )
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <button
            onClick={toggle}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-[var(--border)] px-6">
          <div />
          <div className="flex items-center gap-3">
            <button className="rounded-md p-1.5 text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]">
              <Bell size={16} />
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
              >
                <Avatar name={user?.name ?? 'U'} size="xs" />
                <span className="max-w-[120px] truncate font-medium text-[var(--text-h)]">
                  {user?.name ?? 'User'}
                </span>
                <ChevronDown size={12} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-sentri">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[var(--text)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--text-h)]"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
