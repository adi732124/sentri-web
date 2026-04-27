import { Card, Badge, Avatar } from '../components'

const mockServices = [
  { name: 'API Gateway', status: 'success' as const, uptime: '99.98%', latency: '42ms' },
  { name: 'Auth Service', status: 'success' as const, uptime: '99.95%', latency: '18ms' },
  { name: 'Webhook Worker', status: 'warning' as const, uptime: '98.12%', latency: '310ms' },
  { name: 'Notification Bus', status: 'error' as const, uptime: '94.20%', latency: '—' },
]

const mockIncidents = [
  { id: 1, title: 'Notification Bus latency spike', severity: 'error' as const, status: 'Open', ago: '12m ago' },
  { id: 2, title: 'Webhook Worker elevated errors', severity: 'warning' as const, status: 'Acknowledged', ago: '1h ago' },
  { id: 3, title: 'Auth Service memory pressure', severity: 'warning' as const, status: 'Resolved', ago: '3h ago' },
]

const mockTeam = [
  { name: 'Aditya Kumar', role: 'On-call', status: 'online' as const },
  { name: 'Sara Mehta', role: 'Developer', status: 'busy' as const },
  { name: 'John Davis', role: 'DevOps', status: 'away' as const },
]

export default function Dashboard() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>Dashboard</h1>
        <p style={{ margin: 0, color: 'var(--text)' }}>Real-time overview of all services and incidents.</p>
      </div>

      {/* Service health summary */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--text-h)' }}>Service Health</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {mockServices.map((svc) => (
            <Card key={svc.name} bordered>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-h)', marginBottom: 6 }}>{svc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text)' }}>Uptime: {svc.uptime} · p50: {svc.latency}</div>
                </div>
                <Badge variant={svc.status} dot size="sm">
                  {svc.status === 'success' ? 'Up' : svc.status === 'warning' ? 'Degraded' : 'Down'}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Active incidents */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--text-h)' }}>Active Incidents</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mockIncidents.map((inc) => (
            <Card key={inc.id} bordered>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-h)' }}>{inc.title}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Badge variant={inc.severity} size="sm">{inc.severity}</Badge>
                  <Badge variant="neutral" size="sm">{inc.status}</Badge>
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>{inc.ago}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* On-call team */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--text-h)' }}>On-Call Team</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {mockTeam.map((member) => (
            <Card key={member.name} bordered>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar name={member.name} size="md" status={member.status} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-h)' }}>{member.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text)' }}>{member.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
