import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { loginSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import type { LoginFormData } from '@/schemas/auth.schema'

function inputCls(hasError: boolean) {
  return clsx(
    'w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all',
    'focus:border-accent focus:ring-2 focus:ring-accent-bg',
    hasError
      ? 'border-danger bg-danger-bg text-ui-heading'
      : 'border-ui-border bg-ui-bg text-ui-heading',
  )
}

export default function Login() {
  const { login, isLoggingIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  return (
    <>
      <h1
        className="mb-1 text-xl font-bold tracking-tight"
        style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
      >
        Welcome back
      </h1>
      <p className="mb-7 text-sm" style={{ color: 'var(--text-muted)' }}>
        Sign in to your Sentri account
      </p>

      <form onSubmit={handleSubmit((data) => login(data))} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'var(--text-h)' }}>
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className={inputCls(!!errors.email)}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-medium" style={{ color: 'var(--danger)' }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'var(--text-h)' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputCls(!!errors.password)}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs font-medium" style={{ color: 'var(--danger)' }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="mt-1 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: 'var(--accent)', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
          }}
        >
          {isLoggingIn ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
        No account?{' '}
        <Link
          to="/register"
          className="font-semibold hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          Create one free
        </Link>
      </p>
    </>
  )
}
