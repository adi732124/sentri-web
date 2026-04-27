import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatDistanceToNow } from 'date-fns'
import {
  AlertTriangle,
  Activity,
  Server,
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/Avatar/Avatar'
import type { Severity, IncidentStatus, ServiceStatus, AvatarStatus } from '@/types'

const latencyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  p50: 30 + Math.random() * 20,
  p95: 80 + Math.random() * 40,
  p99: 150 + Math.random() * 80,
}))

const mockServices = [
  {
    id: '1',
    name: 'API Gateway',
    status: 'operational' as ServiceStatus,
    uptime: 99.98,
    latency: { p50: 42 },
    errorRate: 0.02,
  },
  {
    id: '2',
    name: 'Auth Service',
    status: 'operational' as ServiceStatus,
    uptime: 99.95,
    latency: { p50: 18 },
    errorRate: 0.01,
  },
  {
    id: '3',
    name: 'Webhook Worker',
    status: 'degraded' as ServiceStatus,
    uptime: 98.12,
    latency: { p50: 310 },
    errorRate: 2.4,
  },
  {
    id: '4',
    name: 'Notification Bus',
    status: 'down' as ServiceStatus,
    uptime: 94.2,
    latency: { p50: 0 },
    errorRate: 100,
  },
]

const mockIncidents = [
  {
    id: '1',
    title: 'Notification Bus latency spike',
    severity: 'critical' as Severity,
    status: 'open' as IncidentStatus,
    createdAt: new Date(Date.now() - 12 * 60_000).toISOString(),
  },
  {
    id: '2',
    title: 'Webhook Worker elevated errors',
    severity: 'high' as Severity,
    status: 'acknowledged' as IncidentStatus,
    createdAt: new Date(Date.now() - 60 * 60_000).toISOString(),
  },
  {
    id: '3',
    title: 'Auth Service memory pressure',
    severity: 'medium' as Severity,
    status: 'resolved' as IncidentStatus,
    createdAt: new Date(Date.now() - 3 * 60 * 60_000).toISOString(),
  },
]

const mockTeam = [
  { name: 'Aditya Kumar', role: 'On-call', status: 'online' as AvatarStatus },
  { name: 'Sara Mehta', role: 'Developer', status: 'busy' as AvatarStatus },
  { name: 'John Davis', role: 'DevOps', status: 'away' as AvatarStatus },
]

const severityConfig: Record<Severity, { bg: string; color: string; border: string }> = {
  critical: { bg: 'var(--danger-bg)', color: 'var(--danger)', border: 'var(--danger-border)' },
  high: { bg: 'rgba(234,88,12,0.08)', color: '#ea580c', border: 'rgba(234,88,12,0.2)' },
  medium: { bg: 'var(--warning-bg)', color: 'var(--warning)', border: 'var(--warning-border)' },
  low: { bg: 'var(--info-bg)', color: 'var(--info)', border: 'var(--info-border)' },
}

const incidentStatusConfig: Record<IncidentStatus, { bg: string; color: string }> = {
  open: { bg: 'var(--danger-bg)', color: 'var(--danger)' },
  acknowledged: { bg: 'var(--warning-bg)', color: 'var(--warning)' },
  resolved: { bg: 'var(--success-bg)', color: 'var(--success)' },
}

const serviceStatusConfig: Record<
  ServiceStatus,
  { dot: string; label: string; bg: string; color: string }
> = {
  operational: {
    dot: '#22c55e',
    label: 'Operational',
    bg: 'var(--success-bg)',
    color: 'var(--success)',
  },
  degraded: {
    dot: 'var(--warning)',
    label: 'Degraded',
    bg: 'var(--warning-bg)',
    color: 'var(--warning)',
  },
  down: { dot: 'var(--danger)', label: 'Down', bg: 'var(--danger-bg)', color: 'var(--danger)' },
  maintenance: {
    dot: 'var(--info)',
    label: 'Maintenance',
    bg: 'var(--info-bg)',
    color: 'var(--info)',
  },
}

const severityBorderLeft: Record<Severity, string> = {
  critical: 'var(--danger)',
  high: '#ea580c',
  medium: 'var(--warning)',
  low: 'var(--info)',
}

/* ── Stat card ─────────────────────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  iconBg,
  iconColor,
  onClick,
}: {
  icon: typeof Activity
  label: string
  value: string
  trend?: 'up' | 'down' | 'neutral'
  trendLabel: string
  iconBg: string
  iconColor: string
  onClick?: () => void
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up' ? 'var(--success)' : trend === 'down' ? 'var(--danger)' : 'var(--text-muted)'

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-5 transition-all duration-200"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-xs)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-xs)'
        ;(e.currentTarget as HTMLElement).style.transform = ''
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: iconBg }}
        >
          <Icon size={17} style={{ color: iconColor }} strokeWidth={2} />
        </span>
      </div>
      <div className="mt-4">
        <p
          className="text-[28px] font-bold leading-none tracking-tight"
          style={{ color: 'var(--text-h)' }}
        >
          {value}
        </p>
        <p className="mt-2 flex items-center gap-1 text-xs" style={{ color: trendColor }}>
          <TrendIcon size={11} />
          <span style={{ color: 'var(--text-muted)' }}>{trendLabel}</span>
        </p>
      </div>
    </div>
  )
}

/* ── Status ping dot ───────────────────────────────────────────────────────── */
function StatusPing({ status }: { status: ServiceStatus }) {
  const { dot } = serviceStatusConfig[status]
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      {status === 'operational' && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
          style={{ background: dot }}
        />
      )}
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
    </span>
  )
}

/* ── Section header ────────────────────────────────────────────────────────── */
function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <h2
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--text-muted)' }}
      >
        {title}
      </h2>
      {count !== undefined && (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
          style={{ background: 'var(--code-bg)', color: 'var(--text-muted)' }}
        >
          {count}
        </span>
      )}
    </div>
  )
}

/* ── Dashboard ─────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const openCount = mockIncidents.filter((i) => i.status === 'open').length
  const degradedCount = mockServices.filter((s) => s.status !== 'operational').length

  return (
    <div className="mx-auto max-w-[1400px] p-5 sm:p-6 lg:p-8">
      {/* Page header */}
      <div className="mb-7">
        <h1
          className="text-[22px] font-bold tracking-tight"
          style={{ color: 'var(--text-h)', letterSpacing: '-0.03em' }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
          Real-time overview of all services and incidents.
        </p>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={AlertTriangle}
          label="Open incidents"
          value={String(openCount)}
          trend="down"
          trendLabel="Active right now"
          iconBg="var(--danger-bg)"
          iconColor="var(--danger)"
          onClick={() => navigate('/incidents')}
        />
        <StatCard
          icon={Server}
          label="Services down"
          value={String(degradedCount)}
          trend="neutral"
          trendLabel={`of ${mockServices.length} services`}
          iconBg="rgba(234,88,12,0.1)"
          iconColor="#ea580c"
          onClick={() => navigate('/services')}
        />
        <StatCard
          icon={Activity}
          label="Avg uptime"
          value="97.8%"
          trend="up"
          trendLabel="Last 7 days"
          iconBg="var(--success-bg)"
          iconColor="var(--success)"
          onClick={() => navigate('/services')}
        />
        <StatCard
          icon={Users}
          label="On-call"
          value="1"
          trend="neutral"
          trendLabel="Engineer active"
          iconBg="var(--accent-bg)"
          iconColor="var(--accent)"
          onClick={() => navigate('/oncall')}
        />
      </div>

      {/* ── Latency chart ───────────────────────────────────────────────────── */}
      <div
        className="mb-6 rounded-xl p-5"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2
              className="text-sm font-semibold"
              style={{ color: 'var(--text-h)', letterSpacing: '-0.01em' }}
            >
              API Gateway — Latency
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              Last 24 hours · p50 / p95 / p99
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4 rounded"
                style={{ background: 'var(--accent)' }}
              />
              p50
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4 rounded border-dashed"
                style={{ borderTop: '2px dashed #f97316' }}
              />
              p95
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-0.5 w-4 rounded"
                style={{ borderTop: '2px dashed var(--danger)' }}
              />
              p99
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160} className="sm:!h-[200px]">
          <AreaChart data={latencyData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="gp50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.18} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.7} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              tickLine={false}
              axisLine={false}
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
                fontSize: 12,
                color: 'var(--text-h)',
                boxShadow: 'var(--shadow-md)',
              }}
              cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="p50"
              stroke="var(--accent)"
              fill="url(#gp50)"
              strokeWidth={2}
              name="p50"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="p95"
              stroke="#f97316"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              name="p95"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="p99"
              stroke="var(--danger)"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              name="p99"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Service health */}
        <div className="lg:col-span-2">
          <SectionTitle title="Service Health" count={mockServices.length} />
          <div className="flex flex-col gap-2">
            {mockServices.map((svc) => {
              const cfg = serviceStatusConfig[svc.status]
              return (
                <div
                  key={svc.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-150"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  }}
                >
                  <StatusPing status={svc.status} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: 'var(--text-h)' }}
                    >
                      {svc.name}
                    </p>
                    <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {svc.uptime}% uptime · {svc.latency.p50}ms p50 · {svc.errorRate}% err
                    </p>
                  </div>
                  <span
                    className="flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Active incidents */}
          <div>
            <SectionTitle
              title="Active Incidents"
              count={mockIncidents.filter((i) => i.status !== 'resolved').length}
            />
            <div className="flex flex-col gap-2">
              {mockIncidents.map((inc) => {
                const sev = severityConfig[inc.severity]
                const sta = incidentStatusConfig[inc.status]
                return (
                  <div
                    key={inc.id}
                    className="cursor-pointer rounded-xl px-4 py-3.5 transition-all duration-150"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderLeft: `3px solid ${severityBorderLeft[inc.severity]}`,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                    }}
                  >
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: 'var(--text-h)' }}
                    >
                      {inc.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{
                          background: sev.bg,
                          color: sev.color,
                          border: `1px solid ${sev.border}`,
                        }}
                      >
                        {inc.severity}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                        style={{ background: sta.bg, color: sta.color }}
                      >
                        {inc.status}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* On-call team */}
          <div>
            <SectionTitle title="On-Call Team" count={mockTeam.length} />
            <div className="flex flex-col gap-2">
              {mockTeam.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-150"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  }}
                >
                  <Avatar name={m.name} size="sm" status={m.status} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: 'var(--text-h)' }}
                    >
                      {m.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {m.role}
                    </p>
                  </div>
                  {m.status === 'online' && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: 'var(--success-bg)', color: 'var(--success)' }}
                    >
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
