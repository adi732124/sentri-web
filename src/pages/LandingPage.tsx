import { Link } from 'react-router-dom'

const teasers = [
  {
    icon: '⚡',
    title: 'Six core features',
    body: 'Live incident feed, service health dashboards, on-call scheduling, team activity timeline, auto-escalation, and multi-workspace RBAC — each with full What / Why / How breakdowns.',
    link: '/features',
    cta: 'Explore features →',
  },
  {
    icon: '🏗️',
    title: 'Production architecture',
    body: 'WebSocket + Redis pub/sub for sub-100ms delivery, polyglot persistence (PostgreSQL + MongoDB + Redis), JWT rotation, and Docker-based CI/CD.',
    link: '/architecture',
    cta: 'See architecture →',
  },
  {
    icon: '🧰',
    title: 'Modern tech stack',
    body: 'React 18, Vite, Zustand, Node.js, Express, Socket.io, Bull, Prisma, Mongoose — every technology justified by a concrete requirement, not novelty.',
    link: '/stack',
    cta: 'View full stack →',
  },
]

const problems = [
  { icon: '🔀', label: 'Context-switching', sub: '3–4 tools open at once' },
  { icon: '🐌', label: 'Delayed response', sub: 'Alerts siloed in PagerDuty' },
  { icon: '💸', label: 'Tooling cost', sub: 'Datadog + Linear + Slack bills' },
  { icon: '🕳️', label: 'Lost context', sub: 'No unified incident history' },
]

export default function LandingPage() {
  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          textAlign: 'center',
          padding: '96px 24px 80px',
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-bg) 0%, transparent 70%)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 20,
            padding: '4px 12px',
            borderRadius: 99,
            border: '1px solid var(--accent-border)',
            background: 'var(--accent-bg)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          Real-Time Developer Platform
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--text-h)',
            lineHeight: 1.1,
            maxWidth: 720,
            margin: '0 auto 20px',
          }}
        >
          One platform for
          <br />
          <span style={{ color: 'var(--accent)' }}>every incident, every service.</span>
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'var(--text)',
            maxWidth: 500,
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          Sentri consolidates incident management, service health, on-call schedules, and team
          activity into a single real-time workspace.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Start for free →
            </button>
          </Link>
          <Link to="/login">
            <button
              style={{
                padding: '12px 28px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text-h)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Sign in
            </button>
          </Link>
        </div>

        <p style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)' }}>
          No credit card required · Free tier available
        </p>
      </section>

      {/* ─── Problem strip ─────────────────────────────────────────────────── */}
      <section style={{ padding: '56px 24px', maxWidth: 880, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(20px, 3.5vw, 30px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-h)',
            marginBottom: 10,
          }}
        >
          Your team is juggling too many tools
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text)',
            maxWidth: 480,
            margin: '0 auto 36px',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Datadog for metrics, PagerDuty for alerts, Linear for incidents, Slack for comms — four
          tools doing one job, none sharing context.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 12,
            marginBottom: 20,
          }}
        >
          {problems.map((p) => (
            <div
              key={p.label}
              style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{p.icon}</div>
              <div
                style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: 13, marginBottom: 2 }}
              >
                {p.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.sub}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--accent-bg)',
            border: '1px solid var(--accent-border)',
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          <strong style={{ color: 'var(--accent)' }}>Sentri replaces all of them</strong>
          <span style={{ color: 'var(--text)' }}>
            {' '}
            — one real-time platform where alerts, metrics, schedules, and activity live together.
          </span>
        </div>
      </section>

      {/* ─── Detail teasers ────────────────────────────────────────────────── */}
      <section style={{ padding: '24px 24px 72px', maxWidth: 880, margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(20px, 3.5vw, 30px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--text-h)',
            marginBottom: 36,
          }}
        >
          Go deeper
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}
        >
          {teasers.map((t) => (
            <Link key={t.title} to={t.link} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '28px 24px',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  height: '100%',
                  boxSizing: 'border-box',
                  transition: 'box-shadow var(--transition), transform var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = 'var(--accent-border)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <span style={{ fontSize: 32 }}>{t.icon}</span>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--text-h)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, flex: 1 }}>
                  {t.body}
                </p>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                  {t.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 100%, var(--accent-bg) 0%, transparent 70%)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(26px, 4.5vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--text-h)',
            marginBottom: 14,
            lineHeight: 1.15,
          }}
        >
          Ready to unify your team?
        </h2>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text)',
            marginBottom: 32,
            maxWidth: 380,
            margin: '0 auto 32px',
            lineHeight: 1.7,
          }}
        >
          Monitor, respond, and collaborate — all in one place.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register">
            <button
              style={{
                padding: '13px 30px',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Create free account →
            </button>
          </Link>
          <Link to="/login">
            <button
              style={{
                padding: '13px 30px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text-h)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Sign in
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
