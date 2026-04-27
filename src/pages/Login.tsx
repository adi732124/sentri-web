import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { loginSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import type { LoginFormData } from '@/schemas/auth.schema'

export default function Login() {
  const { login, isLoggingIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-[var(--text-h)]">Sign in</h1>
      <p className="mb-6 text-sm text-[var(--text)]">Welcome back to Sentri</p>

      <form onSubmit={handleSubmit((data) => login(data))} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-h)]">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] placeholder-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-h)]">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] placeholder-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="mt-2 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isLoggingIn ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text)]">
        No account?{' '}
        <Link to="/register" className="font-medium text-[var(--accent)] hover:underline">
          Create one
        </Link>
      </p>
    </>
  )
}
