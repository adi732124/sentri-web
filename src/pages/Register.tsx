import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { registerSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import type { RegisterFormData } from '@/schemas/auth.schema'

function inputCls(hasError: boolean) {
  return clsx(
    'w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all',
    'focus:border-accent focus:ring-2 focus:ring-accent-bg',
    hasError
      ? 'border-danger bg-danger-bg text-ui-heading'
      : 'border-ui-border bg-ui-bg text-ui-heading',
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold" style={{ color: 'var(--text-h)' }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium" style={{ color: 'var(--danger)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function Register() {
  const { register: registerUser, isRegistering } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _cp, ...rest } = data
    registerUser(rest)
  }

  return (
    <>
      <h1
        className="mb-1 text-xl font-bold tracking-tight"
        style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
      >
        Create account
      </h1>
      <p className="mb-7 text-sm" style={{ color: 'var(--text-muted)' }}>
        Get started with Sentri for free
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field label="Full name" error={errors.name?.message}>
          <input
            className={inputCls(!!errors.name)}
            placeholder="Aditya Kumar"
            {...register('name')}
          />
        </Field>

        <Field label="Workspace name" error={errors.workspaceName?.message}>
          <input
            className={inputCls(!!errors.workspaceName)}
            placeholder="My Team"
            {...register('workspaceName')}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            className={inputCls(!!errors.email)}
            placeholder="you@example.com"
            {...register('email')}
          />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input
            type="password"
            className={inputCls(!!errors.password)}
            placeholder="••••••••"
            {...register('password')}
          />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            type="password"
            className={inputCls(!!errors.confirmPassword)}
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
        </Field>

        <button
          type="submit"
          disabled={isRegistering}
          className="mt-1 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: 'var(--accent)', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
          }}
        >
          {isRegistering ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
