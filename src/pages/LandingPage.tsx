import { Link } from 'react-router-dom'

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

      {/* ─── Features teaser ───────────────────────────────────────────────── */}
      <section style={{ padding: '24px 24px 48px', maxWidth: 880, margin: '0 auto' }}>
        <Link to="/features" style={{ textDecoration: 'none' }}>
          <div
            style={{
              padding: '28px 28px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              transition: 'box-shadow var(--transition), transform var(--transition)',
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
            <span style={{ fontSize: 36, flexShrink: 0 }}>⚡</span>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--text-h)',
                  letterSpacing: '-0.02em',
                  marginBottom: 6,
                }}
              >
                Six core features
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, margin: 0 }}>
                Live incident feed, service health dashboards, on-call scheduling, team activity
                timeline, auto-escalation, and multi-workspace RBAC — each with full What / Why /
                How breakdowns.
              </p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', flexShrink: 0 }}>
              Explore features →
            </span>
          </div>
        </Link>
      </section>

      {/* ─── Why We Built This ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: '72px 24px',
          maxWidth: 880,
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                marginBottom: 16,
                padding: '4px 12px',
                borderRadius: 99,
                border: '1px solid var(--accent-border)',
                background: 'var(--accent-bg)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Why we built this
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-h)',
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              Born from the frustration of context-switching during live incidents
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--text)',
                lineHeight: 1.75,
                marginBottom: 16,
              }}
            >
              Every major incident we responded to followed the same painful pattern: one tab for
              metrics, another for alerts, a Slack thread spiraling out of control, and a Linear
              ticket nobody had time to update. By the time we assembled the full picture, precious
              minutes had already been lost.
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--text)',
                lineHeight: 1.75,
              }}
            >
              Sentri was built to collapse that stack into a single real-time surface — so on-call
              engineers can focus on fixing the problem, not hunting for context across four tools.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {[
              {
                icon: '🎯',
                title: 'Single source of truth',
                body: 'Every alert, metric, schedule change, and team note in one place — no syncing, no duplication.',
              },
              {
                icon: '⏱️',
                title: 'Seconds, not minutes',
                body: 'Sub-100ms real-time updates mean your dashboard reflects reality the moment it changes.',
              },
              {
                icon: '🤝',
                title: 'Built for the whole team',
                body: 'Engineers, managers, and stakeholders each get the view they need without stepping on each other.',
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: '18px 20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text-h)',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Us ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '72px 24px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div
              style={{
                display: 'inline-block',
                marginBottom: 16,
                padding: '4px 12px',
                borderRadius: 99,
                border: '1px solid var(--accent-border)',
                background: 'var(--accent-bg)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              About us
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-h)',
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              A small team obsessed with developer experience
            </h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--text)',
                lineHeight: 1.75,
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              We're engineers who have been on-call, run postmortems, and felt the pain of
              fragmented tooling firsthand. Sentri is the platform we always wished existed.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              {
                stat: '100ms',
                label: 'Real-time event delivery',
                sub: 'WebSocket + Redis pub/sub',
              },
              { stat: '6', label: 'Core features shipped', sub: 'From incident to RBAC' },
              { stat: '1', label: 'Unified workspace', sub: 'Replaces 4+ tools' },
              { stat: '0', label: 'Vendor lock-in', sub: 'Open, composable design' },
            ].map((s) => (
              <div
                key={s.stat}
                style={{
                  padding: '24px 20px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: 'var(--accent)',
                    letterSpacing: '-0.04em',
                    marginBottom: 4,
                  }}
                >
                  {s.stat}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-h)',
                    marginBottom: 2,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--accent-border)',
              background: 'var(--accent-bg)',
              fontSize: 14,
              lineHeight: 1.75,
              color: 'var(--text)',
            }}
          >
            <strong style={{ color: 'var(--accent)' }}>Our philosophy:</strong> every design
            decision in Sentri starts with a real problem that real on-call engineers face. We don't
            add features because they look impressive — we add them because a teammate once had to
            work around their absence at 2 AM.
          </div>
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
