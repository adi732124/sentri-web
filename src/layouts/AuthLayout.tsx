import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 py-8">
      {/* Brand */}
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-h)]">Sentri</span>
        </Link>
        <p className="mt-2 text-sm text-[var(--text)]">Real-time developer monitoring</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sentri sm:p-8">
        <Outlet />
      </div>
    </div>
  )
}
