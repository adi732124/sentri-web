import { useState } from 'react'
import { X, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import clsx from 'clsx'
import type { ReactNode } from 'react'

export type AlertVariant = 'info' | 'warning' | 'danger'

export interface AlertBannerProps {
  variant?: AlertVariant
  title?: string
  children: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const config: Record<AlertVariant, { cls: string; icon: typeof Info }> = {
  info: { cls: 'bg-blue-500/10 border-blue-500/20 text-blue-600', icon: Info },
  warning: { cls: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-700', icon: AlertTriangle },
  danger: { cls: 'bg-red-500/10 border-red-500/20 text-red-600', icon: AlertCircle },
}

export function AlertBanner({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const { cls, icon: Icon } = config[variant]

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className={clsx('flex items-start gap-3 rounded-xl border px-4 py-3 text-sm', cls)}
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
