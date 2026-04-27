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
  Zap,
  CheckCheck,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '@/stores/auth.store'
import { useSocket } from '@/hooks/useSocket'
import { Avatar } from '@/components/Avatar/Avatar'
import { queryClient } from '@/lib/queryClient'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/incidents', icon: AlertTriangle, label: 'Incidents', badge: 2 },
  { to: '/services', icon: Server, label: 'Services' },
  { to: '/oncall', icon: Phone, label: 'On-Call' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('sentri_theme')
    if (stored) return stored === 'dark'
    return true
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('sentri_theme', dark ? 'dark' : 'light')
  }, [dark])
  return { dark, toggle: () => setDark((d) => !d) }
}

const mockNotifications = [
  { id: '1', title: 'API Gateway 503s in eu-west', time: '2m ago', unread: true },
  { id: '2', title: 'Webhook Worker elevated errors', time: '15m ago', unread: true },
  { id: '3', title: 'Auth Service memory pressure resolved', time: '1h ago', unread: false },
]

export function MainLayout() {
  useSocket()
  const { dark, toggle } = useDarkMode()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const notifRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter((n) => n.unread).length

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

  useEffect(() => {
    if (!notifOpen) return
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [notifOpen])

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))

  const handleLogout = () => {
    setUserMenuOpen(false)
    logout()
    queryClient.clear()
    navigate('/login')
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className="hidden w-[240px] flex-shrink-0 flex-col md:flex"
        style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
      >
        {/* Brand */}
        <div
          className="flex h-[57px] flex-shrink-0 items-center gap-3 px-5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
            style={{
              background:
                'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #3b82f6) 100%)',
              boxShadow: '0 2px 8px rgba(124,58,237,0.35)',
            }}
          >
            <Zap size={15} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span
              className="text-[15px] font-bold tracking-tight"
              style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
            >
              Sentri
            </span>
            <span
              className="ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
            >
              Pro
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
          <p
            className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Menu
          </p>
          {navItems.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                  isActive ? 'nav-active' : 'nav-default',
                )
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: 'var(--accent-bg)',
                      color: 'var(--accent)',
                    }
                  : {
                      color: 'var(--text)',
                    }
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    strokeWidth={isActive ? 2.5 : 1.75}
                    style={{ flexShrink: 0, transition: 'color 150ms' }}
                  />
                  <span className="flex-1">{label}</span>
                  {badge && !isActive && (
                    <span
                      className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
                      style={{ background: 'var(--danger)', color: '#fff' }}
                    >
                      {badge}
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div
          className="flex-shrink-0 space-y-1 p-3"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150"
            style={{ color: 'var(--text)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'var(--code-bg)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text-h)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = ''
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text)'
            }}
          >
            {dark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
            <span>{dark ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="flex h-[57px] flex-shrink-0 items-center gap-3 px-5"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          {/* Mobile brand */}
          <div className="flex flex-1 items-center gap-2.5 md:hidden">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background:
                  'linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #3b82f6))',
              }}
            >
              <Zap size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-bold" style={{ color: 'var(--text-h)' }}>
              Sentri
            </span>
          </div>

          <div className="ml-auto flex items-center gap-1">
            {/* Mobile theme */}
            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
              style={{ color: 'var(--text)' }}
            >
              {dark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            </button>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-150"
                style={{
                  color: 'var(--text)',
                  background: notifOpen ? 'var(--code-bg)' : '',
                }}
                onMouseEnter={(e) => {
                  if (!notifOpen)
                    (e.currentTarget as HTMLElement).style.background = 'var(--code-bg)'
                }}
                onMouseLeave={(e) => {
                  if (!notifOpen) (e.currentTarget as HTMLElement).style.background = ''
                }}
              >
                <Bell size={16} strokeWidth={1.75} />
                {unreadCount > 0 && (
                  <span
                    className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
                    style={{ background: 'var(--danger)', boxShadow: '0 0 0 2px var(--surface)' }}
                  />
                )}
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-2.5"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                      Notifications
                      {unreadCount > 0 && (
                        <span
                          className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                          style={{ background: 'var(--danger)', color: '#fff' }}
                        >
                          {unreadCount}
                        </span>
                      )}
                    </p>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-xs transition-colors"
                        style={{ color: 'var(--accent)' }}
                      >
                        <CheckCheck size={12} />
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 transition-colors"
                        style={{
                          background: n.unread ? 'var(--accent-bg)' : '',
                          borderBottom: '1px solid var(--border)',
                          cursor: 'default',
                        }}
                      >
                        {n.unread && (
                          <span
                            className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                            style={{ background: 'var(--accent)' }}
                          />
                        )}
                        <div className={n.unread ? '' : 'pl-[18px]'}>
                          <p className="text-xs font-medium" style={{ color: 'var(--text-h)' }}>
                            {n.title}
                          </p>
                          <p className="mt-0.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setNotifOpen(false)
                        navigate('/incidents')
                      }}
                      className="w-full rounded-lg py-2 text-xs font-medium transition-colors"
                      style={{ color: 'var(--accent)' }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-bg)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = ''
                      }}
                    >
                      View all incidents
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div ref={userMenuRef} className="relative ml-1">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex h-9 items-center gap-2 rounded-lg px-2 transition-all duration-150"
                style={userMenuOpen ? { background: 'var(--code-bg)' } : {}}
                onMouseEnter={(e) => {
                  if (!userMenuOpen)
                    (e.currentTarget as HTMLElement).style.background = 'var(--code-bg)'
                }}
                onMouseLeave={(e) => {
                  if (!userMenuOpen) (e.currentTarget as HTMLElement).style.background = ''
                }}
              >
                <Avatar name={user?.name ?? 'U'} size="xs" />
                <span
                  className="hidden max-w-[120px] truncate text-sm font-medium sm:block"
                  style={{ color: 'var(--text-h)' }}
                >
                  {user?.name ?? 'User'}
                </span>
                <ChevronDown
                  size={14}
                  className="hidden transition-transform duration-150 sm:block"
                  style={{
                    color: 'var(--text-muted)',
                    transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-xl"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: 'var(--text-h)' }}
                    >
                      {user?.name ?? 'User'}
                    </p>
                    <p className="mt-0.5 truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                      {user?.email ?? 'user@sentri.dev'}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors"
                      style={{ color: 'var(--text)' }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = 'var(--danger-bg)'
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--danger)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = ''
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--text)'
                      }}
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

      {/* ── Mobile bottom nav ────────────────────────────────────────────────── */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
      >
        <div className="flex h-16 items-stretch px-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="relative flex flex-1 flex-col items-center justify-center"
            >
              {({ isActive }) => (
                <>
                  <span
                    className="absolute inset-x-1 inset-y-1.5 rounded-xl transition-all duration-200"
                    style={isActive ? { background: 'var(--accent-bg)' } : {}}
                  />
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.75}
                    className="relative z-10 transition-colors"
                    style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
                  />
                  <span
                    className="relative z-10 mt-1 text-[10px] font-semibold leading-none transition-colors"
                    style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
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
