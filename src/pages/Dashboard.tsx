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
import clsx from 'clsx'
import { AlertTriangle, Activity, Server, Users, ArrowUpRight } from 'lucide-react'
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

const severityColor: Record<Severity, string> = {
  critical: 'bg-red-500/10 text-red-500',
  high: 'bg-orange-500/10 text-orange-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  low: 'bg-blue-500/10 text-blue-400',
}

const incStatusColor: Record<IncidentStatus, string> = {
  open: 'bg-red-500/10 text-red-500',
  acknowledged: 'bg-yellow-500/10 text-yellow-500',
  resolved: 'bg-emerald-500/10 text-emerald-500',
}

const svcStatusConfig: Record<ServiceStatus, { dot: string; label: string; badge: string }> = {
  operational: {
    dot: 'bg-emerald-500',
    label: 'Operational',
    badge: 'bg-emerald-500/10 text-emerald-500',
  },
  degraded: { dot: 'bg-yellow-500', label: 'Degraded', badge: 'bg-yellow-500/10 text-yellow-500' },
  down: { dot: 'bg-red-500', label: 'Down', badge: 'bg-red-500/10 text-red-500' },
  maintenance: { dot: 'bg-blue-500', label: 'Maintenance', badge: 'bg-blue-500/10 text-blue-400' },
}

/* ── Stat card ─────────────────────────────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  iconBg,
  iconColor,
}: {
  icon: typeof Activity
  label: string
  value: string
  sub: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">{label}</p>
        <span
          className={clsx(
            'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl',
            iconBg,
          )}
        >
          <Icon size={17} className={iconColor} strokeWidth={2} />
        </span>
      </div>
      <div>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-h)]">{value}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text)]">
          <ArrowUpRight size={11} className="text-emerald-500" />
          {sub}
        </p>
      </div>
    </div>
  )
}

/* ── Status ping dot ───────────────────────────────────────────────────────── */
function StatusDot({ status }: { status: ServiceStatus }) {
  const { dot } = svcStatusConfig[status]
  return (
    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
      {status === 'operational' && (
        <span
          className={clsx(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-60',
            dot,
          )}
        />
      )}
      <span className={clsx('relative inline-flex h-2.5 w-2.5 rounded-full', dot)} />
    </span>
  )
}

/* ── Section header ────────────────────────────────────────────────────────── */
function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text)]">
      {title}
    </h2>
  )
}

/* ── Dashboard ─────────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const openCount = mockIncidents.filter((i) => i.status === 'open').length
  const degradedCount = mockServices.filter((s) => s.status !== 'operational').length

  return (
    <div className="p-4 sm:p-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--text-h)]">Dashboard</h1>
        <p className="mt-0.5 text-sm text-[var(--text)]">
          Real-time overview of all services and incidents.
        </p>
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={AlertTriangle}
          label="Open incidents"
          value={String(openCount)}
          sub="active right now"
          iconBg="bg-red-500/10"
          iconColor="text-red-500"
        />
        <StatCard
          icon={Server}
          label="Services down"
          value={String(degradedCount)}
          sub={`of ${mockServices.length} services`}
          iconBg="bg-orange-500/10"
          iconColor="text-orange-500"
        />
        <StatCard
          icon={Activity}
          label="Avg uptime"
          value="97.8%"
          sub="over last 7 days"
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-500"
        />
        <StatCard
          icon={Users}
          label="On-call"
          value="1"
          sub="engineer active"
          iconBg="bg-[var(--accent-bg)]"
          iconColor="text-[var(--accent)]"
        />
      </div>

      {/* ── Latency chart ─────────────────────────────────────────────────── */}
      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-h)]">API Gateway — Latency</h2>
            <p className="mt-0.5 text-xs text-[var(--text)]">Last 24 hours · p50 / p95 / p99</p>
          </div>
          <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium text-[var(--text)]">
            24h
          </span>
        </div>
        <ResponsiveContainer width="100%" height={160} className="sm:!h-[200px]">
          <AreaChart data={latencyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gp50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--text)' }} tickLine={false} />
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
                borderRadius: 10,
                fontSize: 12,
                color: 'var(--text-h)',
              }}
            />
            <Area
              type="monotone"
              dataKey="p50"
              stroke="var(--accent)"
              fill="url(#gp50)"
              strokeWidth={2}
              name="p50"
            />
            <Area
              type="monotone"
              dataKey="p95"
              stroke="#f97316"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="4 2"
              name="p95"
            />
            <Area
              type="monotone"
              dataKey="p99"
              stroke="#ef4444"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              name="p99"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Service health */}
        <div className="lg:col-span-2">
          <SectionTitle title="Service Health" />
          <div className="flex flex-col gap-2">
            {mockServices.map((svc) => {
              const cfg = svcStatusConfig[svc.status]
              return (
                <div
                  key={svc.id}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
                >
                  <StatusDot status={svc.status} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--text-h)]">
                      {svc.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--text)]">
                      {svc.uptime}% uptime · {svc.latency.p50}ms p50 · {svc.errorRate}% err
                    </p>
                  </div>
                  <span
                    className={clsx('rounded-full px-2.5 py-0.5 text-xs font-semibold', cfg.badge)}
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
            <SectionTitle title="Active Incidents" />
            <div className="flex flex-col gap-2">
              {mockIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
                >
                  <p className="mb-2 text-sm font-medium leading-snug text-[var(--text-h)]">
                    {inc.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        severityColor[inc.severity],
                      )}
                    >
                      {inc.severity}
                    </span>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs font-semibold',
                        incStatusColor[inc.status],
                      )}
                    >
                      {inc.status}
                    </span>
                    <span className="text-xs text-[var(--text)]">
                      {formatDistanceToNow(new Date(inc.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* On-call team */}
          <div>
            <SectionTitle title="On-Call Team" />
            <div className="flex flex-col gap-2">
              {mockTeam.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
                >
                  <Avatar name={m.name} size="sm" status={m.status} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-h)]">{m.name}</p>
                    <p className="text-xs text-[var(--text)]">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
