import { Badge, Card } from '../components'

const services = [
  { name: 'API Gateway', url: 'https://api.sentri.dev', status: 'success' as const, uptime: '99.98', p50: '42ms', p95: '98ms', p99: '210ms', errorRate: '0.02%' },
  { name: 'Auth Service', url: 'https://auth.sentri.dev', status: 'success' as const, uptime: '99.95', p50: '18ms', p95: '45ms', p99: '90ms', errorRate: '0.01%' },
  { name: 'Webhook Worker', url: 'internal', status: 'warning' as const, uptime: '98.12', p50: '310ms', p95: '820ms', p99: '1.4s', errorRate: '1.88%' },
  { name: 'Notification Bus', url: 'internal', status: 'error' as const, uptime: '94.20', p50: '—', p95: '—', p99: '—', errorRate: '5.80%' },
]

const statusLabel: Record<string, string> = {
  success: 'Operational',
  warning: 'Degraded',
  error: 'Down',
}

export default function Services() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>Services</h1>
        <p style={{ margin: 0, color: 'var(--text)' }}>Health and latency for all registered services.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {services.map((svc) => (
          <Card key={svc.name} bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ minWidth: 160 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-h)', marginBottom: 4 }}>{svc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text)' }}>{svc.url}</div>
              </div>

              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontSize: 13 }}>
                <div>
                  <div style={{ color: 'var(--text)', marginBottom: 2 }}>Uptime</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{svc.uptime}%</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text)', marginBottom: 2 }}>p50</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{svc.p50}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text)', marginBottom: 2 }}>p95</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{svc.p95}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text)', marginBottom: 2 }}>p99</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{svc.p99}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text)', marginBottom: 2 }}>Error rate</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-h)' }}>{svc.errorRate}</div>
                </div>
              </div>

              <Badge variant={svc.status} dot size="sm">{statusLabel[svc.status]}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
