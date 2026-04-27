import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinks = [
  { to: '/features', label: 'Features' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/stack', label: 'Tech Stack' },
]

export default function PublicLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--sans)',
      }}
    >
      {/* ─── Nav ─────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 32px',
          height: 56,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          to="/"
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: 'var(--text-h)',
            letterSpacing: '-0.03em',
            textDecoration: 'none',
            marginRight: 8,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>S</span>entri
        </Link>

        <div style={{ display: 'flex', gap: 2, flex: 1 }}>
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={({ isActive }) => ({
                padding: '5px 12px',
                borderRadius: 'var(--radius)',
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'var(--transition)',
                color: isActive ? 'var(--accent)' : 'var(--text)',
                background: isActive ? 'var(--accent-bg)' : 'transparent',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/login">
            <button
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-h)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius)',
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Get started
            </button>
          </Link>
        </div>
      </nav>

      <Outlet />

      {/* ─── Footer ──────────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: '20px 32px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)' }}>
          <span style={{ color: 'var(--accent)' }}>S</span>entri
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Real-Time Developer Monitoring &amp; Collaboration Platform · v1.0 · 2025
        </span>
        <div style={{ display: 'flex', gap: 16 }}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  )
}
