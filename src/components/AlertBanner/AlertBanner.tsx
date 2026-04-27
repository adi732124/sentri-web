import { useState } from 'react'
import { X, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

export type AlertVariant = 'info' | 'warning' | 'danger'

export interface AlertBannerProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const config: Record<
  AlertVariant,
  { color: string; bg: string; border: string; icon: typeof Info }
> = {
  info: { color: 'var(--info)', bg: 'var(--info-bg)', border: 'var(--info-border)', icon: Info },
  warning: {
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
    border: 'var(--warning-border)',
    icon: AlertTriangle,
  },
  danger: {
    color: 'var(--danger)',
    bg: 'var(--danger-bg)',
    border: 'var(--danger-border)',
    icon: AlertCircle,
  },
}

export function AlertBanner({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const { color, bg, border, icon: Icon } = config[variant]

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border px-4 py-3 text-sm"
      style={{ color, background: bg, borderColor: border }}
    >
      <Icon size={16} className="mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        {title && <div className="mb-0.5 font-semibold">{title}</div>}
        <div className="leading-relaxed">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 rounded p-0.5 transition-opacity hover:opacity-70"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
