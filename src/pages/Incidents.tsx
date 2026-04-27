import { useState } from 'react'
import clsx from 'clsx'
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

const severityConfig: Record<Severity, { badge: string; border: string; dot: string }> = {
  critical: { badge: 'bg-red-500/10 text-red-500', border: 'border-l-red-500', dot: 'bg-red-500' },
  high: {
    badge: 'bg-orange-500/10 text-orange-500',
    border: 'border-l-orange-500',
    dot: 'bg-orange-500',
  },
  medium: {
    badge: 'bg-yellow-500/10 text-yellow-500',
    border: 'border-l-yellow-500',
    dot: 'bg-yellow-500',
  },
  low: { badge: 'bg-blue-500/10 text-blue-400', border: 'border-l-blue-500', dot: 'bg-blue-500' },
}

const statusConfig: Record<IncidentStatus, { badge: string; label: string }> = {
  open: { badge: 'bg-red-500/10 text-red-500', label: 'Open' },
  acknowledged: { badge: 'bg-yellow-500/10 text-yellow-500', label: 'Acknowledged' },
  resolved: { badge: 'bg-emerald-500/10 text-emerald-500', label: 'Resolved' },
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
      {/* Page header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-h)]">Incidents</h1>
          <p className="mt-0.5 text-sm text-[var(--text)]">
            {filtered.length} incident{filtered.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-95">
          <Plus size={15} strokeWidth={2.5} />
          New Incident
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Search */}
        <div className="relative flex-1 sm:min-w-48 sm:max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)]"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-h)] placeholder-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]"
          />
        </div>

        {/* Severity pills */}
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'critical', 'high', 'medium', 'low'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={clsx(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                filterSeverity === s
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--text-h)]',
              )}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'open', 'acknowledged', 'resolved'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={clsx(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                filterStatus === s
                  ? 'bg-[var(--accent)] text-white'
                  : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--text-h)]',
              )}
            >
              {s === 'all' ? 'All status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Incident list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] py-16">
            <AlertTriangle size={32} className="text-[var(--text)]" strokeWidth={1.5} />
            <p className="text-sm text-[var(--text)]">No incidents match the current filters.</p>
          </div>
        )}

        {filtered.map((inc) => {
          const sev = severityConfig[inc.severity]
          const st = statusConfig[inc.status]
          return (
            <div
              key={inc.id}
              className={clsx(
                'flex flex-col gap-3 rounded-xl border border-l-4 border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 transition-colors hover:bg-[var(--code-bg)] sm:flex-row sm:items-center sm:justify-between',
                sev.border,
              )}
            >
              {/* Left: title + meta */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={clsx('h-1.5 w-1.5 flex-shrink-0 rounded-full', sev.dot)} />
                  <p className="truncate text-sm font-semibold text-[var(--text-h)]">{inc.title}</p>
                </div>
                <p className="mt-1 pl-3.5 text-xs text-[var(--text)]">
                  {inc.service} ·{' '}
                  {formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true })} ·{' '}
                  {inc.assignee}
                </p>
              </div>

              {/* Right: badges + actions */}
              <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                <span
                  className={clsx('rounded-full px-2.5 py-0.5 text-xs font-semibold', sev.badge)}
                >
                  {inc.severity}
                </span>
                <span
                  className={clsx('rounded-full px-2.5 py-0.5 text-xs font-semibold', st.badge)}
                >
                  {st.label}
                </span>
                {inc.status === 'open' && (
                  <button
                    onClick={() => handleAcknowledge(inc.id)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Acknowledge
                  </button>
                )}
                {inc.status === 'acknowledged' && (
                  <button
                    onClick={() => handleResolve(inc.id)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition-colors hover:border-emerald-500 hover:text-emerald-500"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
