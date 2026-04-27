import { useState } from 'react'
import { Plus, Search, AlertTriangle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Severity, IncidentStatus } from '@/types'

interface MockIncident {
  id: string
  title: string
  service: string
  severity: Severity
  status: IncidentStatus
  createdAt: string
  assignee: string
}

const mockIncidents: MockIncident[] = [
  {
    id: '1',
    title: 'Notification Bus latency spike',
    service: 'Notification Bus',
    severity: 'critical',
    status: 'open',
    createdAt: new Date(Date.now() - 12 * 60_000).toISOString(),
    assignee: 'Aditya K.',
  },
  {
    id: '2',
    title: 'Webhook Worker elevated errors',
    service: 'Webhook Worker',
    severity: 'high',
    status: 'acknowledged',
    createdAt: new Date(Date.now() - 60 * 60_000).toISOString(),
    assignee: 'Sara M.',
  },
  {
    id: '3',
    title: 'Auth Service memory pressure',
    service: 'Auth Service',
    severity: 'medium',
    status: 'resolved',
    createdAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
    assignee: 'John D.',
  },
  {
    id: '4',
    title: 'API Gateway 503s in eu-west',
    service: 'API Gateway',
    severity: 'critical',
    status: 'open',
    createdAt: new Date(Date.now() - 5 * 60 * 60_000).toISOString(),
    assignee: 'Aditya K.',
  },
  {
    id: '5',
    title: 'DB slow query degrading dashboard',
    service: 'API Gateway',
    severity: 'low',
    status: 'acknowledged',
    createdAt: new Date(Date.now() - 24 * 60 * 60_000).toISOString(),
    assignee: 'Sara M.',
  },
]

const severityOrder: Severity[] = ['critical', 'high', 'medium', 'low']

const severityColor: Record<Severity, string> = {
  critical: 'var(--danger)',
  high: 'var(--high)',
  medium: 'var(--warning)',
  low: 'var(--info)',
}

const severityBg: Record<Severity, string> = {
  critical: 'var(--danger-bg)',
  high: 'var(--high-bg)',
  medium: 'var(--warning-bg)',
  low: 'var(--info-bg)',
}

const statusColor: Record<IncidentStatus, string> = {
  open: 'var(--danger)',
  acknowledged: 'var(--warning)',
  resolved: 'var(--success)',
}

const statusBg: Record<IncidentStatus, string> = {
  open: 'var(--danger-bg)',
  acknowledged: 'var(--warning-bg)',
  resolved: 'var(--success-bg)',
}

const statusLabel: Record<IncidentStatus, string> = {
  open: 'Open',
  acknowledged: 'Acknowledged',
  resolved: 'Resolved',
}

type SeverityFilter = Severity | 'all'
type StatusFilter = IncidentStatus | 'all'

export default function Incidents() {
  const [search, setSearch] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<SeverityFilter>('all')
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all')
  const [incidents, setIncidents] = useState(mockIncidents)

  const filtered = incidents
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => filterSeverity === 'all' || i.severity === filterSeverity)
    .filter((i) => filterStatus === 'all' || i.status === filterStatus)
    .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity))

  const handleAcknowledge = (id: string) =>
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'acknowledged' as IncidentStatus } : i)),
    )

  const handleResolve = (id: string) =>
    setIncidents((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'resolved' as IncidentStatus } : i)),
    )

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
          >
            Incidents
          </h1>
          <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>
            {filtered.length} incident{filtered.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{ background: 'var(--accent)', boxShadow: '0 2px 8px rgba(124,58,237,0.3)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
          }}
        >
          <Plus size={15} strokeWidth={2.5} />
          New Incident
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-48 sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents…"
            className="w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent-bg"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg)',
              color: 'var(--text-h)',
            }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              style={
                filterSeverity === s
                  ? { background: 'var(--accent)', color: '#fff' }
                  : {
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      background: 'transparent',
                    }
              }
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'open', 'acknowledged', 'resolved'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all"
              style={
                filterStatus === s
                  ? { background: 'var(--accent)', color: '#fff' }
                  : {
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      background: 'transparent',
                    }
              }
            >
              {s === 'all' ? 'All status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border py-16"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
          >
            <AlertTriangle size={32} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No incidents match the current filters.
            </p>
          </div>
        )}

        {filtered.map((inc) => (
          <div
            key={inc.id}
            className="flex flex-col gap-3 rounded-xl border bg-[var(--surface)] px-4 py-3.5 transition-colors hover:bg-[var(--code-bg)] sm:flex-row sm:items-center sm:justify-between"
            style={{
              borderColor: 'var(--border)',
              borderLeftWidth: 3,
              borderLeftColor: severityColor[inc.severity],
            }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ background: severityColor[inc.severity] }}
                />
                <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                  {inc.title}
                </p>
              </div>
              <p className="mt-1 pl-3.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                {inc.service} · {formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true })}{' '}
                · {inc.assignee}
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: severityColor[inc.severity], background: severityBg[inc.severity] }}
              >
                {inc.severity}
              </span>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: statusColor[inc.status], background: statusBg[inc.status] }}
              >
                {statusLabel[inc.status]}
              </span>
              {inc.status === 'open' && (
                <button
                  onClick={() => handleAcknowledge(inc.id)}
                  className="rounded-lg border px-3 py-1 text-xs font-semibold transition-colors"
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
              {inc.status === 'acknowledged' && (
                <button
                  onClick={() => handleResolve(inc.id)}
                  className="rounded-lg border px-3 py-1 text-xs font-semibold transition-colors"
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
        ))}
      </div>
    </div>
  )
}
