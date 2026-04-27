import { Outlet, Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

export function AuthLayout() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg)' }}
    >
      {/* Brand */}
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Link to="/" className="inline-flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background:
                'linear-gradient(135deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 70%, #3b82f6) 100%)',
              boxShadow: '0 4px 12px rgba(124,58,237,0.35)',
            }}
          >
            <Zap size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
          >
            Sentri
          </span>
        </Link>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Real-time developer monitoring
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-7"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
