import clsx from 'clsx'
import type { Service } from '@/types'

export interface ServiceStatusCardProps {
  service: Service
  onClick?: () => void
}

const statusConfig: Record<
  Service['status'],
  { borderColor: string; dotColor: string; label: string; pulse: boolean }
> = {
  operational: {
    borderColor: 'var(--border)',
    dotColor: 'var(--success)',
    label: 'Up',
    pulse: false,
  },
  degraded: {
    borderColor: 'var(--warning-border)',
    dotColor: 'var(--warning)',
    label: 'Degraded',
    pulse: true,
  },
  down: {
    borderColor: 'var(--danger-border)',
    dotColor: 'var(--danger)',
    label: 'Down',
    pulse: true,
  },
  maintenance: {
    borderColor: 'var(--info-border)',
    dotColor: 'var(--info)',
    label: 'Maintenance',
    pulse: false,
  },
}

export function ServiceStatusCard({ service, onClick }: ServiceStatusCardProps) {
  const { borderColor, dotColor, label, pulse } = statusConfig[service.status]

  return (
    <div
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        'rounded-xl border p-4 transition-shadow',
        onClick && 'cursor-pointer hover:shadow-sentri',
      )}
      style={{ background: 'var(--bg)', borderColor }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
          {service.name}
        </span>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text)' }}>
          <span
            className={clsx('h-2 w-2 rounded-full', pulse && 'animate-pulse')}
            style={{ background: dotColor }}
          />
          {label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div style={{ color: 'var(--text)' }}>Uptime</div>
          <div className="font-semibold" style={{ color: 'var(--text-h)' }}>
            {service.uptime.toFixed(2)}%
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text)' }}>Error rate</div>
          <div className="font-semibold" style={{ color: 'var(--text-h)' }}>
            {service.errorRate.toFixed(2)}%
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text)' }}>p50</div>
          <div className="font-semibold" style={{ color: 'var(--text-h)' }}>
            {service.latency.p50}ms
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text)' }}>p95</div>
          <div className="font-semibold" style={{ color: 'var(--text-h)' }}>
            {service.latency.p95}ms
          </div>
        </div>
      </div>
    </div>
  )
}
