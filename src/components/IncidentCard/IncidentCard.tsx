import { formatDistanceToNow } from 'date-fns'
import { StatusBadge } from '@/components/StatusBadge/StatusBadge'
import { Avatar } from '@/components/Avatar/Avatar'
import type { Incident } from '@/types'

export interface IncidentCardProps {
  incident: Incident
  onAcknowledge?: (id: string) => void
  onResolve?: (id: string) => void
}

const severityBorderColor: Record<Incident['severity'], string> = {
  critical: 'var(--danger)',
  high: 'var(--high)',
  medium: 'var(--warning)',
  low: 'var(--info)',
}

const statusStyle: Record<Incident['status'], { color: string; bg: string }> = {
  open: { color: 'var(--danger)', bg: 'var(--danger-bg)' },
  acknowledged: { color: 'var(--warning)', bg: 'var(--warning-bg)' },
  resolved: { color: 'var(--success)', bg: 'var(--success-bg)' },
}

const statusLabel: Record<Incident['status'], string> = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
}

export function IncidentCard({ incident, onAcknowledge, onResolve }: IncidentCardProps) {
  const st = statusStyle[incident.status]
  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl border bg-[var(--bg)] px-4 py-3 transition-colors hover:bg-[var(--code-bg)]"
      style={{
        borderColor: 'var(--border)',
        borderLeftWidth: 3,
        borderLeftColor: severityBorderColor[incident.severity],
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium" style={{ color: 'var(--text-h)' }}>
          {incident.title}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <StatusBadge severity={incident.severity} />
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ color: st.color, background: st.bg }}
          >
            {statusLabel[incident.status]}
          </span>
          <span className="text-xs" style={{ color: 'var(--text)' }}>
            {incident.service}
          </span>
          <span className="text-xs" style={{ color: 'var(--text)' }}>
            · {formatDistanceToNow(new Date(incident.createdAt), { addSuffix: true })}
          </span>
        </div>
        {incident.assignee && (
          <div className="mt-2 flex items-center gap-1.5">
            <Avatar name={incident.assignee.name} size="xs" />
            <span className="text-xs" style={{ color: 'var(--text)' }}>
              {incident.assignee.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-shrink-0 flex-col gap-1.5">
        {incident.status === 'open' && onAcknowledge && (
          <button
            onClick={() => onAcknowledge(incident.id)}
            className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text)'
            }}
          >
            Acknowledge
          </button>
        )}
        {incident.status === 'acknowledged' && onResolve && (
          <button
            onClick={() => onResolve(incident.id)}
            className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--success)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--success)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--text)'
            }}
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  )
}
