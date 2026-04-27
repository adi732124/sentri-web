import clsx from 'clsx'
import type { Service } from '@/types'

export interface ServiceStatusCardProps {
  service: Service
  onClick?: () => void
}

const statusConfig: Record<Service['status'], { cls: string; dotCls: string; label: string }> = {
  operational: { cls: 'border-[var(--border)]', dotCls: 'bg-emerald-500', label: 'Up' },
  degraded: {
    cls: 'border-yellow-500/30',
    dotCls: 'bg-yellow-500 animate-pulse',
    label: 'Degraded',
  },
  down: { cls: 'border-red-500/30', dotCls: 'bg-red-500 animate-pulse', label: 'Down' },
  maintenance: { cls: 'border-blue-500/30', dotCls: 'bg-blue-400', label: 'Maintenance' },
}

export function ServiceStatusCard({ service, onClick }: ServiceStatusCardProps) {
  const { cls, dotCls, label } = statusConfig[service.status]

  return (
    <div
      role={onClick ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        'rounded-xl border bg-[var(--bg)] p-4 transition-shadow',
        cls,
        onClick && 'cursor-pointer hover:shadow-sentri',
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[var(--text-h)]">{service.name}</span>
        <span className="flex items-center gap-1.5 text-xs text-[var(--text)]">
          <span className={clsx('h-2 w-2 rounded-full', dotCls)} />
          {label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-[var(--text)]">Uptime</div>
          <div className="font-semibold text-[var(--text-h)]">{service.uptime.toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-[var(--text)]">Error rate</div>
          <div className="font-semibold text-[var(--text-h)]">{service.errorRate.toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-[var(--text)]">p50</div>
          <div className="font-semibold text-[var(--text-h)]">{service.latency.p50}ms</div>
        </div>
        <div>
          <div className="text-[var(--text)]">p95</div>
          <div className="font-semibold text-[var(--text-h)]">{service.latency.p95}ms</div>
        </div>
      </div>
    </div>
  )
}
