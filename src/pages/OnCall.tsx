import { Avatar, Badge, Card } from '../components'

const schedule = [
  { week: 'This week (Apr 28 – May 4)', primary: { name: 'Aditya Kumar', status: 'online' as const }, backup: { name: 'Sara Mehta', status: 'away' as const } },
  { week: 'Next week (May 5 – May 11)', primary: { name: 'Sara Mehta', status: 'away' as const }, backup: { name: 'John Davis', status: 'offline' as const } },
  { week: 'May 12 – May 18', primary: { name: 'John Davis', status: 'offline' as const }, backup: { name: 'Aditya Kumar', status: 'online' as const } },
]

const escalation = [
  { step: 1, label: 'Primary on-call', timeout: '10 min', name: 'Aditya Kumar' },
  { step: 2, label: 'Backup on-call', timeout: '10 min', name: 'Sara Mehta' },
  { step: 3, label: 'Engineering Manager', timeout: '—', name: 'John Davis' },
]

export default function OnCall() {
  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>On-Call Schedule</h1>
        <p style={{ margin: 0, color: 'var(--text)' }}>Rotation and escalation policy for the engineering team.</p>
      </div>

      {/* Current on-call */}
      <Card title="Currently On-Call" bordered shadow style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Avatar name="Aditya Kumar" size="lg" status="online" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-h)' }}>Aditya Kumar</div>
            <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 2 }}>This week · Primary</div>
          </div>
          <Badge variant="success" dot>Active</Badge>
        </div>
      </Card>

      {/* Rotation schedule */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--text-h)' }}>Rotation Schedule</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {schedule.map((row, i) => (
            <Card key={row.week} bordered>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-h)', minWidth: 220 }}>
                  {i === 0 && <Badge variant="info" size="sm" style={{ marginRight: 8 }}>Current</Badge>}
                  {row.week}
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={row.primary.name} size="sm" status={row.primary.status} />
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text)' }}>Primary</div>
                      <div style={{ fontSize: 13, color: 'var(--text-h)', fontWeight: 500 }}>{row.primary.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={row.backup.name} size="sm" status={row.backup.status} />
                    <div>
                      <div style={{ fontSize: 12, color: 'var(--text)' }}>Backup</div>
                      <div style={{ fontSize: 13, color: 'var(--text-h)', fontWeight: 500 }}>{row.backup.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Escalation policy */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 16px', color: 'var(--text-h)' }}>Escalation Policy</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {escalation.map((e) => (
            <Card key={e.step} bordered>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: 'var(--accent)', flexShrink: 0 }}>
                  {e.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-h)' }}>{e.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text)' }}>{e.name}</div>
                </div>
                {e.timeout !== '—' && (
                  <Badge variant="neutral" size="sm">Escalate after {e.timeout}</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
