import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { registerSchema } from '@/schemas/auth.schema'
import { useAuth } from '@/hooks/useAuth'
import type { RegisterFormData } from '@/schemas/auth.schema'

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
      <label className="mb-1.5 block text-sm font-medium text-[var(--text-h)]">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
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

  const inputCls =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text-h)] placeholder-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]'

  const onSubmit = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _cp, ...rest } = data
    registerUser(rest)
  }

  return (
    <>
      <h1 className="mb-1 text-xl font-semibold text-[var(--text-h)]">Create account</h1>
      <p className="mb-6 text-sm text-[var(--text)]">Get started with Sentri</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field label="Full name" error={errors.name?.message}>
          <input className={inputCls} placeholder="Aditya Kumar" {...register('name')} />
        </Field>

        <Field label="Workspace name" error={errors.workspaceName?.message}>
          <input className={inputCls} placeholder="My Team" {...register('workspaceName')} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            className={inputCls}
            placeholder="you@example.com"
            {...register('email')}
          />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <input
            type="password"
            className={inputCls}
            placeholder="••••••••"
            {...register('password')}
          />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <input
            type="password"
            className={inputCls}
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
        </Field>

        <button
          type="submit"
          disabled={isRegistering}
          className="mt-2 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isRegistering ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text)]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </>
  )
}
