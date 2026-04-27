import { Link } from 'react-router-dom'

const features = [
  {
    icon: '⚡',
    title: 'Live Incident Feed',
    tag: 'WebSocket · Zustand · Bull',
    what: 'A real-time incident list where every team member sees creates, acknowledges, and resolves the instant they happen — no page refresh.',
    why: 'Delayed incident awareness costs minutes. Traditional tools poll every 30s or require manual refresh. Sentri pushes every event over WebSocket so response time starts at zero.',
    how: [
      'Incident is created via REST API',
      'Event emitted to Redis pub/sub channel',
      'Socket.io broadcasts to all connected clients',
      'Zustand incident slice updates; React re-renders instantly',
    ],
    extras: [
      'Severity levels: Critical, High, Medium, Low — distinct visual treatment',
      'Full timeline of status changes and comments per incident',
      'Bull job escalates after 10 min if unacknowledged',
    ],
  },
  {
    icon: '📊',
    title: 'Service Health Dashboard',
    tag: 'MongoDB · Recharts · Redis',
    what: 'Per-service pages showing uptime %, p50/p95/p99 latency, and error rate over selectable windows (1h / 24h / 7d / 30d).',
    why: 'Metrics are only useful when they\'re visible and in context. A single dashboard showing "is this service healthy right now?" prevents alert fatigue from raw log streams.',
    how: [
      'Monitoring agents post metrics to POST /api/v1/services/:id/metrics',
      'Metrics land in MongoDB with per-service collections',
      'Recharts renders time-series graphs with zoom and threshold markers',
      'Status badge (Operational / Degraded / Down) computed from latest metrics',
    ],
    extras: [
      'Shareable public status URL — no login required for customers',
      'Threshold markers on charts highlight SLA breaches visually',
    ],
  },
  {
    icon: '🔔',
    title: 'Auto Escalation & Alerts',
    tag: 'Bull · Redis · Email · Slack',
    what: "Background job queues fire escalation alerts when incidents aren't acknowledged within a configured timeout window.",
    why: 'Human attention is finite. Automated escalation ensures nothing falls through at 3 AM when the primary on-call misses a notification.',
    how: [
      'Incident created → Bull job scheduled with configurable delay',
      'If still unacknowledged at timeout, job fires escalation handler',
      'Handler sends email (Nodemailer) and/or Slack webhook',
      'Escalation chain: primary → backup → manager',
    ],
    extras: [
      'Dead-letter queue captures failed jobs for replay',
      'Each escalation step has an independent configurable timeout',
      'Alert includes direct deep-link to the incident',
    ],
  },
  {
    icon: '🗓️',
    title: 'On-Call Scheduling',
    tag: 'PostgreSQL · iCal · Date-fns',
    what: 'A drag-and-drop rotation calendar for setting up on-call schedules with primary and backup assignments per service.',
    why: "Knowing who is on-call shouldn't require opening a separate tool. The current on-call badge appears directly on every incident — the right person is one click away.",
    how: [
      'Admins set up weekly/monthly rotations per service',
      'Schedules stored as time-range rows in PostgreSQL',
      'Current on-call resolved by querying active range at query time',
      'iCal endpoint exports schedule for Google Calendar / Outlook sync',
    ],
    extras: [
      'On-call badge visible on every incident card',
      'Escalation policies reference schedule rotations automatically',
    ],
  },
  {
    icon: '🔗',
    title: 'Team Activity Timeline',
    tag: 'GitHub App · Bull · MongoDB',
    what: 'A live feed of deployments, PR merges, and commits ingested via GitHub webhooks — filterable by service, author, or event type.',
    why: 'Correlating "the incident started at 14:32" with "we deployed at 14:28" shouldn\'t require switching to GitHub. Activity and incidents live in the same timeline.',
    how: [
      'GitHub App OAuth connects org repositories in under 60 seconds',
      'Webhooks post to POST /api/v1/webhooks/github',
      'HMAC SHA-256 signature verified before processing',
      'Bull job processes payload and stores event in MongoDB activity_feed',
      'Event pushed to connected clients via Socket.io',
    ],
    extras: [
      'Bull queue absorbs webhook bursts — no events lost during deploy spikes',
      'Deployment events show environment (staging / production) and commit SHA',
    ],
  },
  {
    icon: '🏢',
    title: 'Multi-Workspace RBAC',
    tag: 'Prisma · JWT · PostgreSQL',
    what: 'Full organisation-level isolation — one Sentri deployment hosts multiple teams, each completely invisible to the other.',
    why: 'SaaS products need multi-tenancy from day one. A shared platform without isolation is a security incident waiting to happen.',
    how: [
      'JWT payload carries workspaceId and role',
      'Express middleware injects workspace context on every request',
      'All Prisma queries include WHERE workspace_id = :currentWorkspaceId',
      'Integration tests assert cross-workspace data leakage is impossible',
    ],
    extras: [
      'Roles: Admin (full CRUD), Developer (create/ack incidents), Viewer (read-only)',
      'Workspace settings: name, logo, timezone, notification preferences',
      'Billing tier (Free / Pro / Enterprise) controls feature access',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 10,
        }}
      >
        Features
      </p>
      <h1
        style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'var(--text-h)',
          marginBottom: 12,
        }}
      >
        Everything your team needs
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--text)',
          maxWidth: 540,
          lineHeight: 1.7,
          marginBottom: 56,
        }}
      >
        Six core modules, each solving a distinct pain point for engineering and SRE teams. Click
        any feature to see what it does, why it matters, and how it works under the hood.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '28px 32px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }}>{f.icon}</span>
              <div>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--text-h)',
                    letterSpacing: '-0.02em',
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--accent)',
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-border)',
                    padding: '3px 10px',
                    borderRadius: 99,
                  }}
                >
                  {f.tag}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 0,
              }}
            >
              {/* What */}
              <div
                style={{
                  padding: '24px 32px',
                  borderRight: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 10,
                  }}
                >
                  What
                </p>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{f.what}</p>
              </div>

              {/* Why */}
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)' }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 10,
                  }}
                >
                  Why it matters
                </p>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{f.why}</p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 0,
              }}
            >
              {/* How */}
              <div style={{ padding: '24px 32px', borderRight: '1px solid var(--border)' }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 10,
                  }}
                >
                  How it works
                </p>
                <ol style={{ paddingLeft: 18, margin: 0 }}>
                  {f.how.map((step, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 13,
                        color: 'var(--text)',
                        lineHeight: 1.65,
                        marginBottom: 4,
                      }}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Extras */}
              <div style={{ padding: '24px 32px' }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 10,
                  }}
                >
                  Also included
                </p>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                  {f.extras.map((e, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 13,
                        color: 'var(--text)',
                        lineHeight: 1.65,
                        marginBottom: 4,
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      <span style={{ color: 'var(--success)', flexShrink: 0 }}>✓</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, textAlign: 'center' }}>
        <Link to="/register">
          <button
            style={{
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
            }}
          >
            Start using Sentri →
          </button>
        </Link>
      </div>
    </main>
  )
}
