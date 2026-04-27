import clsx from 'clsx'
import type { Severity } from '@/types'

export interface StatusBadgeProps {
  severity: Severity
  /** Show a pulsing dot */
  pulse?: boolean
  className?: string
}

const config: Record<Severity, { label: string; cls: string; dot: string }> = {
  critical: {
    label: 'Critical',
    cls: 'bg-red-500/10 text-red-500 border-red-500/20',
    dot: 'bg-red-500',
  },
  high: {
    label: 'High',
    cls: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    dot: 'bg-orange-500',
  },
  medium: {
    label: 'Medium',
    cls: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    dot: 'bg-yellow-500',
  },
  low: { label: 'Low', cls: 'bg-blue-500/10 text-blue-500 border-blue-500/20', dot: 'bg-blue-400' },
}

export function StatusBadge({ severity, pulse = false, className }: StatusBadgeProps) {
  const { label, cls, dot } = config[severity]
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        cls,
        className,
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', dot, pulse && 'animate-pulse')} />
      {label}
    </span>
  )
}
