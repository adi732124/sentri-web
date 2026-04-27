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
import { AlertTriangle, Activity, Server, Users } from 'lucide-react'
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
  medium: 'bg-yellow-500/10 text-yellow-600',
  low: 'bg-blue-500/10 text-blue-500',
}

const svcStatusColor: Record<ServiceStatus, string> = {
  operational: 'bg-emerald-500/10 text-emerald-600',
  degraded: 'bg-yellow-500/10 text-yellow-600',
  down: 'bg-red-500/10 text-red-500',
  maintenance: 'bg-blue-500/10 text-blue-500',
}

const svcStatusLabel: Record<ServiceStatus, string> = {
  operational: 'Up',
  degraded: 'Degraded',
  down: 'Down',
  maintenance: 'Maintenance',
}

const incStatusColor: Record<IncidentStatus, string> = {
  open: 'bg-red-500/10 text-red-500',
  acknowledged: 'bg-yellow-500/10 text-yellow-600',
  resolved: 'bg-emerald-500/10 text-emerald-600',
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Activity
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
      <div className="mb-3 flex items-center gap-2 text-[var(--text)]">
        <Icon size={14} />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-[var(--text-h)]">{value}</div>
      <div className="mt-1 text-xs text-[var(--text)]">{sub}</div>
    </div>
  )
}

export default function Dashboard() {
  const openCount = mockIncidents.filter((i) => i.status === 'open').length
  const degradedCount = mockServices.filter((s) => s.status !== 'operational').length

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--text-h)]">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--text)]">
          Real-time overview of all services and incidents.
        </p>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={AlertTriangle}
          label="Open incidents"
          value={String(openCount)}
          sub="right now"
        />
        <StatCard
          icon={Server}
          label="Services affected"
          value={String(degradedCount)}
          sub={`of ${mockServices.length} total`}
        />
        <StatCard icon={Activity} label="Avg uptime (7d)" value="97.8%" sub="across all services" />
        <StatCard icon={Users} label="On-call" value="1" sub="engineer active" />
      </div>

      {/* Latency chart */}
      <div className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
        <h2 className="mb-4 text-sm font-semibold text-[var(--text-h)]">
          API Gateway — Latency (24h)
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={latencyData}>
            <defs>
              <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#aa3bff" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#aa3bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: 'var(--text)' }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--text)' }}
              tickLine={false}
              axisLine={false}
              unit="ms"
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="p50"
              stroke="#aa3bff"
              fill="url(#colorP50)"
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Service health */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-[var(--text-h)]">Service Health</h2>
          <div className="flex flex-col gap-2">
            {mockServices.map((svc) => (
              <div
                key={svc.id}
                className="flex items-center justify-between rounded-lg border border-[var(--border)] px-4 py-3"
              >
                <div>
                  <div className="text-sm font-medium text-[var(--text-h)]">{svc.name}</div>
                  <div className="mt-0.5 text-xs text-[var(--text)]">
                    Uptime {svc.uptime}% · p50 {svc.latency.p50}ms · err {svc.errorRate}%
                  </div>
                </div>
                <span
                  className={clsx(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    svcStatusColor[svc.status],
                  )}
                >
                  {svcStatusLabel[svc.status]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-[var(--text-h)]">Active Incidents</h2>
            <div className="flex flex-col gap-2">
              {mockIncidents.map((inc) => (
                <div key={inc.id} className="rounded-lg border border-[var(--border)] px-4 py-3">
                  <div className="mb-1.5 text-sm font-medium leading-snug text-[var(--text-h)]">
                    {inc.title}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        severityColor[inc.severity],
                      )}
                    >
                      {inc.severity}
                    </span>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
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

          <div>
            <h2 className="mb-3 text-sm font-semibold text-[var(--text-h)]">On-Call Team</h2>
            <div className="flex flex-col gap-2">
              {mockTeam.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center gap-3 rounded-lg border border-[var(--border)] px-4 py-3"
                >
                  <Avatar name={m.name} size="sm" status={m.status} />
                  <div>
                    <div className="text-sm font-medium text-[var(--text-h)]">{m.name}</div>
                    <div className="text-xs text-[var(--text)]">{m.role}</div>
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
