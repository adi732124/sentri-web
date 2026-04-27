import { useState } from 'react'
import { Button, Badge, Card, Input } from '../components'

type Severity = 'error' | 'warning' | 'info' | 'neutral'
type Status = 'Open' | 'Acknowledged' | 'Resolved'

interface Incident {
  id: number
  title: string
  service: string
  severity: Severity
  status: Status
  createdAt: string
  assignee: string
}

const mockIncidents: Incident[] = [
  { id: 1, title: 'Notification Bus latency spike', service: 'Notification Bus', severity: 'error', status: 'Open', createdAt: '12m ago', assignee: 'Aditya K.' },
  { id: 2, title: 'Webhook Worker elevated errors', service: 'Webhook Worker', severity: 'warning', status: 'Acknowledged', createdAt: '1h ago', assignee: 'Sara M.' },
  { id: 3, title: 'Auth Service memory pressure', service: 'Auth Service', severity: 'warning', status: 'Resolved', createdAt: '3h ago', assignee: 'John D.' },
  { id: 4, title: 'API Gateway 503s in eu-west', service: 'API Gateway', severity: 'error', status: 'Open', createdAt: '5h ago', assignee: 'Aditya K.' },
  { id: 5, title: 'DB slow query degrading dashboard', service: 'API Gateway', severity: 'info', status: 'Acknowledged', createdAt: '1d ago', assignee: 'Sara M.' },
]

const severityOrder: Severity[] = ['error', 'warning', 'info', 'neutral']

export default function Incidents() {
  const [search, setSearch] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all')

  const filtered = mockIncidents
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => filterSeverity === 'all' || i.severity === filterSeverity)
    .filter((i) => filterStatus === 'all' || i.status === filterStatus)
    .sort((a, b) => severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity))

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: '0 0 6px', fontSize: 28 }}>Incidents</h1>
          <p style={{ margin: 0, color: 'var(--text)' }}>{filtered.length} incident{filtered.length !== 1 ? 's' : ''} shown</p>
        </div>
        <Button variant="primary" size="sm">+ New Incident</Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'flex-end' }}>
        <div style={{ flex: '1 1 220px' }}>
          <Input placeholder="Search incidents…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'error', 'warning', 'info'] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filterSeverity === s ? 'primary' : 'ghost'}
              onClick={() => setFilterSeverity(s)}
            >
              {s === 'all' ? 'All severity' : s}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['all', 'Open', 'Acknowledged', 'Resolved'] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filterStatus === s ? 'secondary' : 'ghost'}
              onClick={() => setFilterStatus(s)}
            >
              {s === 'all' ? 'All status' : s}
            </Button>
          ))}
        </div>
      </div>

      {/* Incident list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <Card bordered>
            <p style={{ textAlign: 'center', color: 'var(--text)', margin: 0 }}>No incidents match the current filters.</p>
          </Card>
        )}
        {filtered.map((inc) => (
          <Card key={inc.id} bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-h)', marginBottom: 4 }}>{inc.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text)' }}>{inc.service} · {inc.createdAt} · {inc.assignee}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge variant={inc.severity} size="sm">{inc.severity}</Badge>
                <Badge variant={inc.status === 'Open' ? 'error' : inc.status === 'Acknowledged' ? 'warning' : 'success'} size="sm">
                  {inc.status}
                </Badge>
                {inc.status === 'Open' && <Button size="sm" variant="secondary">Acknowledge</Button>}
                {inc.status === 'Acknowledged' && <Button size="sm" variant="ghost">Resolve</Button>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
