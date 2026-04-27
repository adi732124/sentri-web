import clsx from 'clsx'
import type { Severity } from '@/types'

export interface StatusBadgeProps {
  severity: Severity
  pulse?: boolean
  className?: string
}

const config: Record<Severity, { label: string; color: string; bg: string; border: string }> = {
  critical: {
    label: 'Critical',
    color: 'var(--danger)',
    bg: 'var(--danger-bg)',
    border: 'var(--danger-border)',
  },
  high: { label: 'High', color: 'var(--high)', bg: 'var(--high-bg)', border: 'var(--high-border)' },
  medium: {
    label: 'Medium',
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
    border: 'var(--warning-border)',
  },
  low: { label: 'Low', color: 'var(--info)', bg: 'var(--info-bg)', border: 'var(--info-border)' },
}

export function StatusBadge({ severity, pulse = false, className }: StatusBadgeProps) {
  const { label, color, bg, border } = config[severity]
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        className,
      )}
      style={{ color, background: bg, borderColor: border }}
    >
      <span
        className={clsx('h-1.5 w-1.5 rounded-full', pulse && 'animate-pulse')}
        style={{ background: color }}
      />
      {label}
    </span>
  )
}
