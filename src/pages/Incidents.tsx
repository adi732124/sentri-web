import { useState } from 'react'
import clsx from 'clsx'
import { Plus, Search } from 'lucide-react'
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

const severityBadge: Record<Severity, string> = {
  critical: 'bg-red-500/10 text-red-500 border border-red-500/20',
  high: 'bg-orange-500/10 text-orange-500 border border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
}

const severityBorderLeft: Record<Severity, string> = {
  critical: 'border-l-red-500',
  high: 'border-l-orange-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-500',
}

const statusBadge: Record<IncidentStatus, string> = {
  open: 'bg-red-500/10 text-red-500',
  acknowledged: 'bg-yellow-500/10 text-yellow-600',
  resolved: 'bg-emerald-500/10 text-emerald-600',
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
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Incidents</h1>
          <p className="mt-1 text-sm text-[var(--text)]">
            {filtered.length} incident{filtered.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
          <Plus size={14} />
          New incident
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-48 flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents…"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-2 pl-8 pr-3 text-sm text-[var(--text-h)] placeholder-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                filterSeverity === s
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] text-[var(--text)] hover:text-[var(--text-h)]',
              )}
            >
              {s === 'all' ? 'All severity' : s}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'open', 'acknowledged', 'resolved'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={clsx(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                filterStatus === s
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] text-[var(--text)] hover:text-[var(--text-h)]',
              )}
            >
              {s === 'all' ? 'All status' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Incident list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[var(--border)] px-6 py-10 text-center text-sm text-[var(--text)]">
            No incidents match the current filters.
          </div>
        )}

        {filtered.map((inc) => (
          <div
            key={inc.id}
            className={clsx(
              'flex items-center justify-between gap-4 rounded-xl border border-l-4 border-[var(--border)] bg-[var(--bg)] px-4 py-3',
              severityBorderLeft[inc.severity],
            )}
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-[var(--text-h)]">{inc.title}</div>
              <div className="mt-0.5 text-xs text-[var(--text)]">
                {inc.service} · {formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true })}{' '}
                · {inc.assignee}
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
              <span
                className={clsx(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  severityBadge[inc.severity],
                )}
              >
                {inc.severity}
              </span>
              <span
                className={clsx(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  statusBadge[inc.status],
                )}
              >
                {inc.status}
              </span>
              {inc.status === 'open' && (
                <button
                  onClick={() => handleAcknowledge(inc.id)}
                  className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Acknowledge
                </button>
              )}
              {inc.status === 'acknowledged' && (
                <button
                  onClick={() => handleResolve(inc.id)}
                  className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text)] transition-colors hover:border-emerald-500 hover:text-emerald-600"
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
