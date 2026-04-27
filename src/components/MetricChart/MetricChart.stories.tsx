import type { Meta, StoryObj } from '@storybook/react'
import { MetricChart } from './MetricChart'
import type { MetricPoint } from '@/types'

const genData = (base: number): MetricPoint[] =>
  Array.from({ length: 30 }, (_, i) => ({
    timestamp: `T-${30 - i}`,
    value: base + Math.random() * base * 0.3,
  }))

const meta: Meta<typeof MetricChart> = {
  title: 'Domain/MetricChart',
  component: MetricChart,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof MetricChart>

export const Latency: Story = {
  args: { data: genData(50), variant: 'latency', label: 'p50 Latency (ms)', height: 200 },
}
export const Uptime: Story = {
  args: {
    data: genData(99).map((p) => ({ ...p, value: Math.min(100, p.value) })),
    variant: 'uptime',
    label: 'Uptime %',
    height: 200,
  },
}
export const ErrorRate: Story = {
  args: { data: genData(0.5), variant: 'error-rate', label: 'Error Rate %', height: 200 },
}
