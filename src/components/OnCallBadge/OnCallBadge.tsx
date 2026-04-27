import clsx from 'clsx'
import { Phone, PhoneOff, PhoneMissed } from 'lucide-react'
import type { OnCallStatus } from '@/types'

export interface OnCallBadgeProps {
  status: OnCallStatus
  name: string
  className?: string
}

const config: Record<OnCallStatus, { cls: string; icon: typeof Phone; label: string }> = {
  active: {
    cls: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: Phone,
    label: 'On-Call',
  },
  'off-duty': {
    cls: 'bg-[var(--code-bg)] text-[var(--text)] border-[var(--border)]',
    icon: PhoneOff,
    label: 'Off-Duty',
  },
  escalated: {
    cls: 'bg-red-500/10 text-red-500 border-red-500/20',
    icon: PhoneMissed,
    label: 'Escalated',
  },
}

export function OnCallBadge({ status, name, className }: OnCallBadgeProps) {
  const { cls, icon: Icon, label } = config[status]
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5',
        cls,
        className,
      )}
    >
      <Icon size={12} />
      <span className="text-xs font-medium">{name}</span>
      <span className="text-xs opacity-70">· {label}</span>
    </div>
  )
}
