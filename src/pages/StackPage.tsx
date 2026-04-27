import { Link } from 'react-router-dom'

const frontend = [
  {
    name: 'React 18',
    version: '18.x',
    purpose: 'UI framework',
    why: 'Industry standard with concurrent rendering and the largest ecosystem — every tool, library, and hire speaks React.',
  },
  {
    name: 'Vite 5',
    version: '5.x',
    purpose: 'Build tool & dev server',
    why: '10× faster HMR than CRA/Webpack. Native ESM in dev, Rollup for production. Near-instant cold starts matter at 14 weeks of iteration.',
  },
  {
    name: 'Tailwind CSS',
    version: '3.x',
    purpose: 'Utility-first styling',
    why: 'Rapid UI development with a consistent spacing/colour scale. Dark mode via class strategy costs almost nothing to set up.',
  },
  {
    name: 'Zustand',
    version: '4.x',
    purpose: 'Global state management',
    why: 'Minimal boilerplate versus Redux. Perfect for real-time slices — socket events write directly to the store without action/reducer ceremony.',
  },
  {
    name: 'React Query',
    version: '5.x',
    purpose: 'Server state',
    why: 'Caching, background refetch, optimistic updates, and stale-while-revalidate — removes a large class of hand-rolled fetch/loading/error state.',
  },
  {
    name: 'React Router',
    version: '6.x',
    purpose: 'Client-side routing',
    why: "Nested routes and data loaders match the app's layout hierarchy cleanly. The lazy import pattern keeps the initial bundle lean.",
  },
  {
    name: 'Recharts',
    version: '2.x',
    purpose: 'Data visualisation',
    why: 'React-native composable charts. Customisable tooltips and threshold reference lines are first-class features — no hacks needed.',
  },
  {
    name: 'Storybook',
    version: '8.x',
    purpose: 'Component development',
    why: 'Isolated component development prevents implicit dependencies. Chromatic visual regression on every PR catches unintended UI drift.',
  },
]

const backend = [
  {
    name: 'Node.js',
    version: '20 LTS',
    purpose: 'Runtime',
    why: 'Non-blocking I/O is ideal for a real-time platform where thousands of WebSocket connections are held open concurrently.',
  },
  {
    name: 'Express',
    version: '4.x',
    purpose: 'HTTP framework',
    why: 'Flexible, lightweight middleware chain. No opinions about structure means the codebase can evolve without fighting the framework.',
  },
  {
    name: 'Socket.io',
    version: '4.x',
    purpose: 'WebSocket server',
    why: 'Built-in fallback transports, rooms, and — critically — a first-class Redis adapter for multi-instance fan-out. Saves weeks of custom pub/sub code.',
  },
  {
    name: 'Bull',
    version: '4.x',
    purpose: 'Job queue',
    why: 'Redis-backed, battle-tested background jobs with retry, delay, and dead-letter queues. Escalation timeouts are Bull delayed jobs — trivial to implement.',
  },
  {
    name: 'Prisma',
    version: '5.x',
    purpose: 'PostgreSQL ORM',
    why: 'Type-safe queries generated from the schema mean a wrong column name is a compile error, not a runtime surprise. Migrations are tracked in git.',
  },
  {
    name: 'Mongoose',
    version: '8.x',
    purpose: 'MongoDB ODM',
    why: 'Schema validation at the ODM layer even for flexible documents. Prevents the "schema-less means schema-chaos" failure mode.',
  },
  {
    name: 'Passport.js',
    version: '0.7.x',
    purpose: 'Authentication',
    why: 'Strategy pattern means adding OAuth (GitHub, Google) later requires adding one strategy, not rewriting auth middleware.',
  },
  {
    name: 'Zod',
    version: '3.x',
    purpose: 'Schema validation',
    why: 'TypeScript-first validation. Schemas are the single source of truth for both runtime validation and static types — no duplication.',
  },
]

export default function StackPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>
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
        Tech Stack
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
        Every technology justified
      </h1>
      <p
        style={{
          fontSize: 16,
          color: 'var(--text)',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 64,
        }}
      >
        Nothing in this stack is included for novelty. Each technology was chosen because it's the
        best fit for a specific, concrete requirement. Here's the reasoning behind every decision.
      </p>

      <StackSection
        title="Frontend"
        rows={frontend}
        cols={['Library', 'Version', 'Purpose', 'Why chosen']}
      />
      <StackSection
        title="Backend"
        rows={backend}
        cols={['Library', 'Version', 'Purpose', 'Why chosen']}
      />
      <InfraSection />

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

function StackSection({
  title,
  rows,
  cols,
}: {
  title: string
  rows: { name: string; version: string; purpose: string; why: string }[]
  cols: string[]
}) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-h)',
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
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
              {cols.map((c) => (
                <th
                  key={c}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--text-h)',
                    borderBottom: '1px solid var(--border)',
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                  verticalAlign: 'top',
                }}
              >
                <td
                  style={{
                    padding: '14px 16px',
                    fontWeight: 700,
                    color: 'var(--text-h)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.name}
                </td>
                <td
                  style={{
                    padding: '14px 16px',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.version}
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text)', whiteSpace: 'nowrap' }}>
                  {r.purpose}
                </td>
                <td
                  style={{
                    padding: '14px 16px',
                    color: 'var(--text)',
                    lineHeight: 1.65,
                    maxWidth: 340,
                  }}
                >
                  {r.why}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function InfraSection() {
  const infra = [
    {
      name: 'PostgreSQL 16',
      role: 'Primary relational DB',
      why: 'ACID guarantees for financial and incident data. Row-level security, complex joins, and foreign key constraints are prerequisites for RBAC.',
    },
    {
      name: 'MongoDB 7',
      role: 'Document / time-series store',
      why: 'High write volume and wildly different shapes per service make a fixed schema counterproductive. Handles arbitrary webhook payloads without schema migrations.',
    },
    {
      name: 'Redis 7',
      role: 'Cache + pub/sub + queue',
      why: 'One instance serves three purposes: session cache, Socket.io multi-instance broadcast, and Bull queue backend. Sub-millisecond reads with TTL built in.',
    },
    {
      name: 'Docker + Compose',
      role: 'Containerisation',
      why: 'docker-compose up spins the entire stack in one command. Eliminates "works on my machine" across the team.',
    },
    {
      name: 'GitHub Actions',
      role: 'CI/CD',
      why: 'Lint, type-check, and test on every push. Automatic deploy on merge to main via Railway webhook. Zero additional tooling.',
    },
    {
      name: 'pnpm workspaces',
      role: 'Monorepo manager',
      why: 'Hoisted dependencies, symlinked packages, workspace:* protocol ties versions without publish cycles.',
    },
  ]

  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-h)',
          marginBottom: 16,
        }}
      >
        Infrastructure & Data Layer
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {infra.map((r) => (
          <div
            key={r.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 140px 1fr',
              gap: 16,
              alignItems: 'start',
              padding: '16px 20px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            <span style={{ fontWeight: 700, color: 'var(--text-h)', fontSize: 13 }}>{r.name}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--accent)',
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent-border)',
                padding: '3px 8px',
                borderRadius: 99,
                alignSelf: 'start',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              {r.role}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65 }}>{r.why}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
