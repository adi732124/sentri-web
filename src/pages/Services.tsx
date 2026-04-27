import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import type { ServiceStatus } from '@/types'

type TimeRange = '1h' | '24h' | '7d' | '30d'

interface ServiceRow {
  id: string
  name: string
  url: string
  status: ServiceStatus
  uptime: number
  p50: string
  p95: string
  p99: string
  errorRate: string
  metrics: { time: string; latency: number; errors: number }[]
}

const genMetrics = (base: number) =>
  Array.from({ length: 30 }, (_, i) => ({
    time: `T-${30 - i}`,
    latency: base + Math.random() * base * 0.4,
    errors: Math.random() * 2,
  }))

const services: ServiceRow[] = [
  {
    id: '1',
    name: 'API Gateway',
    url: 'api.sentri.dev',
    status: 'operational',
    uptime: 99.98,
    p50: '42ms',
    p95: '98ms',
    p99: '210ms',
    errorRate: '0.02%',
    metrics: genMetrics(42),
  },
  {
    id: '2',
    name: 'Auth Service',
    url: 'auth.sentri.dev',
    status: 'operational',
    uptime: 99.95,
    p50: '18ms',
    p95: '45ms',
    p99: '90ms',
    errorRate: '0.01%',
    metrics: genMetrics(18),
  },
  {
    id: '3',
    name: 'Webhook Worker',
    url: 'internal',
    status: 'degraded',
    uptime: 98.12,
    p50: '310ms',
    p95: '820ms',
    p99: '1.4s',
    errorRate: '1.88%',
    metrics: genMetrics(310),
  },
  {
    id: '4',
    name: 'Notification Bus',
    url: 'internal',
    status: 'down',
    uptime: 94.2,
    p50: '—',
    p95: '—',
    p99: '—',
    errorRate: '5.80%',
    metrics: genMetrics(0),
  },
]

const statusConfig: Record<
  ServiceStatus,
  { dotColor: string; badgeColor: string; badgeBg: string; label: string; pulse: boolean }
> = {
  operational: {
    dotColor: 'var(--success)',
    badgeColor: 'var(--success)',
    badgeBg: 'var(--success-bg)',
    label: 'Operational',
    pulse: false,
  },
  degraded: {
    dotColor: 'var(--warning)',
    badgeColor: 'var(--warning)',
    badgeBg: 'var(--warning-bg)',
    label: 'Degraded',
    pulse: true,
  },
  down: {
    dotColor: 'var(--danger)',
    badgeColor: 'var(--danger)',
    badgeBg: 'var(--danger-bg)',
    label: 'Down',
    pulse: true,
  },
  maintenance: {
    dotColor: 'var(--info)',
    badgeColor: 'var(--info)',
    badgeBg: 'var(--info-bg)',
    label: 'Maintenance',
    pulse: false,
  },
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--text-h)' }}>
        {value}
      </p>
    </div>
  )
}

function StatusDot({ status }: { status: ServiceStatus }) {
  const { dotColor, pulse } = statusConfig[status]
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      {pulse && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: dotColor }}
        />
      )}
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ background: dotColor }}
      />
    </span>
  )
}

export default function Services() {
  const [range, setRange] = useState<TimeRange>('24h')
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
          >
            Services
          </h1>
          <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>
            Health and latency for all registered services.
          </p>
        </div>
        <div className="flex gap-1 rounded-xl border p-1" style={{ borderColor: 'var(--border)' }}>
          {(['1h', '24h', '7d', '30d'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
              style={
                range === r
                  ? { background: 'var(--accent)', color: '#fff' }
                  : { color: 'var(--text)' }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((svc) => {
          const cfg = statusConfig[svc.status]
          const isExpanded = expanded === svc.id

          return (
            <div
              key={svc.id}
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : svc.id)}
                className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors sm:px-5"
                style={{ background: 'transparent' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--code-bg)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                <StatusDot status={svc.status} />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                    {svc.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {svc.url}
                  </p>
                </div>

                <div className="hidden items-center gap-5 md:flex lg:gap-7">
                  <Metric label="Uptime" value={`${svc.uptime}%`} />
                  <Metric label="p50" value={svc.p50} />
                  <Metric label="p95" value={svc.p95} />
                  <Metric label="p99" value={svc.p99} />
                  <Metric label="Err rate" value={svc.errorRate} />
                </div>

                <span
                  className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ color: cfg.badgeColor, background: cfg.badgeBg }}
                >
                  {cfg.label}
                </span>

                <ChevronDown
                  size={16}
                  className={clsx(
                    'flex-shrink-0 transition-transform duration-200',
                    isExpanded && 'rotate-180',
                  )}
                  style={{ color: 'var(--text-muted)' }}
                />
              </button>

              {isExpanded && (
                <div
                  className="border-t px-4 pb-5 pt-4 sm:px-5"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div
                    className="mb-4 grid grid-cols-3 gap-3 rounded-xl border p-3 md:hidden"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <Metric label="Uptime" value={`${svc.uptime}%`} />
                    <Metric label="p50" value={svc.p50} />
                    <Metric label="p95" value={svc.p95} />
                    <Metric label="p99" value={svc.p99} />
                    <Metric label="Err rate" value={svc.errorRate} />
                  </div>

                  <p
                    className="mb-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Latency over {range}
                  </p>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart
                      data={svc.metrics}
                      margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id={`grad-${svc.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                        tickLine={false}
                        axisLine={false}
                        unit="ms"
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 10,
                          fontSize: 11,
                          color: 'var(--text-h)',
                          boxShadow: 'var(--shadow-md)',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="latency"
                        stroke="var(--accent)"
                        fill={`url(#grad-${svc.id})`}
                        strokeWidth={2}
                        name="latency (ms)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
