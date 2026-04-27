import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { MetricPoint } from '@/types'

export type MetricChartVariant = 'latency' | 'uptime' | 'error-rate'

export interface MetricChartProps {
  data: MetricPoint[]
  variant?: MetricChartVariant
  height?: number
  label?: string
}

const variantConfig: Record<MetricChartVariant, { color: string; unit: string; gradId: string }> = {
  latency: { color: 'var(--accent)', unit: 'ms', gradId: 'grad-latency' },
  uptime: { color: 'var(--success)', unit: '%', gradId: 'grad-uptime' },
  'error-rate': { color: 'var(--danger)', unit: '%', gradId: 'grad-errors' },
}

const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 11,
  color: 'var(--text-h)',
  boxShadow: 'var(--shadow-md)',
}

export function MetricChart({ data, variant = 'latency', height = 180, label }: MetricChartProps) {
  const { color, unit, gradId } = variantConfig[variant]
  const chartData = data.map((p) => ({ time: p.timestamp, value: p.value }))

  return (
    <div>
      {label && (
        <div className="mb-2 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {label}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {variant === 'latency' ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
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
              unit={unit}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#${gradId})`}
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
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
              unit={unit}
            />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
