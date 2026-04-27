import { Link } from 'react-router-dom'

const realtimeSteps = [
  {
    step: '01',
    title: 'Client connects',
    body: 'Browser opens a Socket.io connection to any Node.js instance on startup.',
  },
  {
    step: '02',
    title: 'Event triggered',
    body: 'A team member creates or updates an incident via REST API — hitting any Node instance.',
  },
  {
    step: '03',
    title: 'Redis pub/sub broadcast',
    body: 'The API publishes the event to a Redis channel. The Socket.io Redis adapter fans it out to every connected Node instance.',
  },
  {
    step: '04',
    title: 'All clients notified',
    body: 'Every connected browser receives the event over their WebSocket — under 100ms end-to-end.',
  },
  {
    step: '05',
    title: 'Zustand store updates',
    body: 'The incident slice in Zustand merges the new data. React re-renders only the affected components.',
  },
]

const dbRows = [
  {
    data: 'Users, Teams, Roles',
    db: 'PostgreSQL',
    reason: 'Relational integrity, foreign keys, RBAC joins',
  },
  {
    data: 'Incidents, Services',
    db: 'PostgreSQL',
    reason: 'Structured data, complex filtering, audit trail',
  },
  {
    data: 'On-Call Schedules',
    db: 'PostgreSQL',
    reason: 'Time-range queries, rotation relationships',
  },
  {
    data: 'Service Metrics & Logs',
    db: 'MongoDB',
    reason: 'High write volume, flexible schema per service',
  },
  {
    data: 'Webhook Event Payloads',
    db: 'MongoDB',
    reason: 'Arbitrary JSON structure varies by provider',
  },
  { data: 'Sessions, Cache', db: 'Redis', reason: 'Sub-millisecond reads, TTL expiry built-in' },
  { data: 'Job Queues', db: 'Redis', reason: 'Bull uses Redis for reliable job persistence' },
]

const securityPoints = [
  {
    title: 'Password hashing',
    body: 'bcrypt with cost factor 12 — computationally infeasible to brute-force.',
  },
  {
    title: 'JWT access tokens',
    body: '15-minute expiry limits the damage window of a stolen token.',
  },
  {
    title: 'Refresh token rotation',
    body: 'Each use issues a new token and invalidates the old. Reuse triggers full session revocation.',
  },
  { title: 'Rate limiting', body: 'express-rate-limit backed by Redis on all public endpoints.' },
  {
    title: 'Input validation',
    body: 'Zod validates every request body. No raw user data ever reaches the database.',
  },
  {
    title: 'Webhook signatures',
    body: 'HMAC SHA-256 verified before any GitHub payload is processed.',
  },
  {
    title: 'Multi-tenant isolation',
    body: 'Every Prisma query for workspace data includes WHERE workspace_id = :currentWorkspaceId enforced by middleware.',
  },
]

const deploymentRows = [
  {
    service: 'sentri-web',
    platform: 'Vercel / Netlify',
    note: 'Static deploy, PR preview environments',
  },
  {
    service: 'sentri-api',
    platform: 'Railway / Render',
    note: 'Dockerized Node.js, auto-scales on traffic',
  },
  {
    service: 'PostgreSQL',
    platform: 'Railway managed',
    note: 'Daily backups, PgBouncer connection pooling',
  },
  {
    service: 'MongoDB',
    platform: 'MongoDB Atlas M0',
    note: 'Free tier for MVP, upgrade path available',
  },
  {
    service: 'Redis',
    platform: 'Railway managed',
    note: 'Shared instance for pub/sub + queues + cache',
  },
]

export default function ArchitecturePage() {
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
        Architecture
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
        How Sentri is built
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--text)',
          maxWidth: 600,
          lineHeight: 1.7,
          marginBottom: 64,
        }}
      >
        A monorepo full-stack system with a polyglot data layer, horizontal real-time scalability,
        JWT authentication with refresh rotation, and row-level multi-tenant isolation.
      </p>

      {/* ─── Monorepo ──────────────────────────────────────────────────────── */}
      <Section label="Monorepo Structure" title="One repo, two apps, shared packages">
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 20 }}>
          Sentri uses a <strong style={{ color: 'var(--text-h)' }}>pnpm monorepo</strong> — a single
          Git repository containing the React frontend, Node.js API, and shared TypeScript packages.
          This enables shared types, shared ESLint config, and atomic commits across frontend and
          backend.
        </p>
        <pre
          style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            fontSize: 12,
            color: 'var(--text)',
            lineHeight: 1.8,
            overflow: 'auto',
            fontFamily: 'var(--mono)',
          }}
        >{`sentri/
├── apps/
│   ├── web/          ← React + Vite (sentri-web)
│   └── api/          ← Node.js + Express (sentri-api)
├── packages/
│   ├── ui/           ← Storybook component library
│   ├── types/        ← shared TypeScript interfaces
│   └── config/       ← shared ESLint + tsconfig
├── docker-compose.yml
└── .github/workflows/`}</pre>
      </Section>

      {/* ─── Real-time ─────────────────────────────────────────────────────── */}
      <Section label="Real-Time System" title="WebSocket delivery at scale">
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 24 }}>
          The challenge: when an incident is created, <em>all</em> connected clients across{' '}
          <em>all</em> server instances must receive it instantly, regardless of which Node.js
          process they're connected to. The solution is Socket.io with a Redis adapter — Redis acts
          as the central message bus.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {realtimeSteps.map((s) => (
            <div
              key={s.step}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--accent-bg)',
                  border: '1px solid var(--accent-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {s.step}
              </span>
              <div>
                <div
                  style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-h)', marginBottom: 2 }}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Database ──────────────────────────────────────────────────────── */}
      <Section label="Data Layer" title="Polyglot persistence — right tool, right job">
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 24 }}>
          Sentri uses three databases, each chosen for what it does best. The rule is simple:
          relational data with strong consistency requirements goes to PostgreSQL; schema-flexible,
          high-write event data goes to MongoDB; ephemeral fast-access data goes to Redis.
        </p>
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)' }}>
                {['Data', 'Database', 'Why'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--text-h)',
                      borderBottom: '1px solid var(--border)',
                      fontSize: 12,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dbRows.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < dbRows.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <td style={{ padding: '12px 16px', color: 'var(--text-h)', fontWeight: 500 }}>
                    {r.data}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 99,
                        background:
                          r.db === 'PostgreSQL'
                            ? 'var(--info-bg)'
                            : r.db === 'MongoDB'
                              ? 'var(--success-bg)'
                              : 'var(--warning-bg)',
                        color:
                          r.db === 'PostgreSQL'
                            ? 'var(--info)'
                            : r.db === 'MongoDB'
                              ? 'var(--success)'
                              : 'var(--warning)',
                        border: `1px solid ${r.db === 'PostgreSQL' ? 'var(--info-border)' : r.db === 'MongoDB' ? 'var(--success-border)' : 'var(--warning-border)'}`,
                      }}
                    >
                      {r.db}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ─── Auth ──────────────────────────────────────────────────────────── */}
      <Section label="Authentication" title="JWT with refresh token rotation">
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 16 }}>
          Access tokens expire in <strong style={{ color: 'var(--text-h)' }}>15 minutes</strong>.
          Refresh tokens last 7 days and are rotated on every use — the previous token is
          immediately invalidated. If an already-used refresh token is ever presented (replay
          attack), <em>all sessions</em> for that user are revoked.
        </p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>
          RBAC is enforced at two layers: Express middleware validates the JWT and checks the role
          before every protected route, and Prisma queries include workspace-scoped{' '}
          <code
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--code-bg)',
              padding: '1px 5px',
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            WHERE
          </code>{' '}
          clauses ensuring complete row-level isolation between organizations.
        </p>
      </Section>

      {/* ─── Security ──────────────────────────────────────────────────────── */}
      <Section label="Security" title="Defence in depth">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {securityPoints.map((s) => (
            <div
              key={s.title}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <div
                style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-h)', marginBottom: 4 }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Deployment ────────────────────────────────────────────────────── */}
      <Section label="Deployment" title="Docker-based, CI/CD on every push">
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 24 }}>
          GitHub Actions runs lint, type-check, and tests on every push. Merging to{' '}
          <code
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--code-bg)',
              padding: '1px 5px',
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            main
          </code>{' '}
          triggers an automatic deploy. A post-deploy smoke test pings{' '}
          <code
            style={{
              fontFamily: 'var(--mono)',
              background: 'var(--code-bg)',
              padding: '1px 5px',
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            /api/v1/health
          </code>{' '}
          to confirm the API is up.
        </p>
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)' }}>
                {['Service', 'Platform', 'Notes'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--text-h)',
                      borderBottom: '1px solid var(--border)',
                      fontSize: 12,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deploymentRows.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i < deploymentRows.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <td
                    style={{
                      padding: '12px 16px',
                      color: 'var(--text-h)',
                      fontWeight: 500,
                      fontFamily: 'var(--mono)',
                      fontSize: 12,
                    }}
                  >
                    {r.service}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-h)', fontWeight: 500 }}>
                    {r.platform}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

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

function Section({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 8,
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--text-h)',
          marginBottom: 20,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
