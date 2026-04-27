import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4">
      <div className="mb-8 text-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[var(--accent)]">
          Sentri
        </Link>
        <p className="mt-1 text-sm text-[var(--text)]">Real-time developer monitoring</p>
      </div>

      <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--bg)] p-8 shadow-sentri">
        <Outlet />
      </div>
    </div>
  )
}
