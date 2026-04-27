import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'
import { Avatar } from '@/components/Avatar/Avatar'
import type { Incident } from '@/types'

export interface IncidentCardProps {
  incident: Incident
  onAcknowledge?: (id: string) => void
  onResolve?: (id: string) => void
}

const statusStyle: Record<Incident['status'], string> = {
  open: 'bg-red-500/10 text-red-500',
  acknowledged: 'bg-yellow-500/10 text-yellow-600',
  resolved: 'bg-emerald-500/10 text-emerald-600',
}

const borderLeft: Record<Incident['severity'], string> = {
  critical: 'border-l-red-500',
  high: 'border-l-orange-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-500',
}

export function IncidentCard({ incident, onAcknowledge, onResolve }: IncidentCardProps) {
  return (
    <div
      className={clsx(
        'flex items-start justify-between gap-4 rounded-xl border border-l-4 border-[var(--border)] bg-[var(--bg)] px-4 py-3',
        borderLeft[incident.severity],
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-[var(--text-h)]">{incident.title}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <StatusBadge severity={incident.severity} />
          <span
            className={clsx(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              statusStyle[incident.status],
            )}
          >
            {incident.status}
          </span>
          <span className="text-xs text-[var(--text)]">{incident.service}</span>
          <span className="text-xs text-[var(--text)]">
            · {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
          </span>
        </div>
        {incident.assignee && (
          <div className="mt-2 flex items-center gap-1.5">
            <Avatar name={incident.assignee.name} size="xs" />
            <span className="text-xs text-[var(--text)]">{incident.assignee.name}</span>
          </div>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col gap-1.5">
        {incident.status === 'open' && onAcknowledge && (
          <button
            onClick={() => onAcknowledge(incident.id)}
            className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Acknowledge
          </button>
        )}
        {incident.status === 'acknowledged' && onResolve && (
          <button
            onClick={() => onResolve(incident.id)}
            className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text)] transition-colors hover:border-emerald-500 hover:text-emerald-600"
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  )
}
