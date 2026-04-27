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

const statusBadge: Record<ServiceStatus, string> = {
  operational: 'bg-emerald-500/10 text-emerald-600',
  degraded: 'bg-yellow-500/10 text-yellow-600',
  down: 'bg-red-500/10 text-red-500',
  maintenance: 'bg-blue-500/10 text-blue-500',
}

const statusLabel: Record<ServiceStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
  maintenance: 'Maintenance',
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-xs text-[var(--text)]">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-[var(--text-h)]">{value}</div>
    </div>
  )
}

export default function Services() {
  const [range, setRange] = useState<TimeRange>('24h')
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-h)]">Services</h1>
          <p className="mt-1 text-sm text-[var(--text)]">
            Health and latency for all registered services.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-[var(--border)] p-0.5">
          {(['1h', '24h', '7d', '30d'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={clsx(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                range === r
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text)] hover:text-[var(--text-h)]',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]"
          >
            <button
              onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--code-bg)]"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[var(--text-h)]">{svc.name}</div>
                <div className="text-xs text-[var(--text)]">{svc.url}</div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Metric label="Uptime" value={`${svc.uptime}%`} />
                <Metric label="p50" value={svc.p50} />
                <Metric label="p95" value={svc.p95} />
                <Metric label="p99" value={svc.p99} />
                <Metric label="Err rate" value={svc.errorRate} />
              </div>

              <span
                className={clsx(
                  'flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium',
                  statusBadge[svc.status],
                )}
              >
                {statusLabel[svc.status]}
              </span>
            </button>

            {expanded === svc.id && (
              <div className="border-t border-[var(--border)] px-5 pb-4 pt-3">
                <div className="mb-2 text-xs font-medium text-[var(--text)]">
                  Latency over {range}
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={svc.metrics}>
                    <defs>
                      <linearGradient id={`grad-${svc.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#aa3bff" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#aa3bff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 10, fill: 'var(--text)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: 'var(--text)' }}
                      tickLine={false}
                      axisLine={false}
                      unit="ms"
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="latency"
                      stroke="#aa3bff"
                      fill={`url(#grad-${svc.id})`}
                      strokeWidth={2}
                      name="latency (ms)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
