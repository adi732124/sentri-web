import clsx from 'clsx'
import { Phone, PhoneOff, PhoneMissed } from 'lucide-react'
import type { OnCallStatus } from '@/types'

export interface OnCallBadgeProps {
  status: OnCallStatus
  name: string
  className?: string
}

const config: Record<
  OnCallStatus,
  { color: string; bg: string; border: string; icon: typeof Phone; label: string }
> = {
  active: {
    color: 'var(--success)',
    bg: 'var(--success-bg)',
    border: 'var(--success-border)',
    icon: Phone,
    label: 'On-Call',
  },
  'off-duty': {
    color: 'var(--text)',
    bg: 'var(--code-bg)',
    border: 'var(--border)',
    icon: PhoneOff,
    label: 'Off-Duty',
  },
  escalated: {
    color: 'var(--danger)',
    bg: 'var(--danger-bg)',
    border: 'var(--danger-border)',
    icon: PhoneMissed,
    label: 'Escalated',
  },
}

export function OnCallBadge({ status, name, className }: OnCallBadgeProps) {
  const { color, bg, border, icon: Icon, label } = config[status]
  return (
    <div
      className={clsx('inline-flex items-center gap-2 rounded-full border px-3 py-1.5', className)}
      style={{ color, background: bg, borderColor: border }}
    >
      <Icon size={12} />
      <span className="text-xs font-medium">{name}</span>
      <span className="text-xs opacity-70">· {label}</span>
    </div>
  )
}
