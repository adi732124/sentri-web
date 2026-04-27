import type { Meta, StoryObj } from '@storybook/react'
import { ServiceStatusCard } from './ServiceStatusCard'
import type { Service } from '@/types'

const base: Service = {
  id: '1',
  name: 'API Gateway',
  status: 'operational',
  uptime: 99.98,
  latency: { p50: 42, p95: 98, p99: 210 },
  errorRate: 0.02,
}

const meta: Meta<typeof ServiceStatusCard> = {
  title: 'Domain/ServiceStatusCard',
  component: ServiceStatusCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ServiceStatusCard>

export const Operational: Story = { args: { service: base } }
export const Degraded: Story = {
  args: {
    service: {
      ...base,
      status: 'degraded',
      name: 'Webhook Worker',
      uptime: 98.12,
      latency: { p50: 310, p95: 820, p99: 1400 },
      errorRate: 1.88,
    },
  },
}
export const Down: Story = {
  args: {
    service: {
      ...base,
      status: 'down',
      name: 'Notification Bus',
      uptime: 94.2,
      latency: { p50: 0, p95: 0, p99: 0 },
      errorRate: 100,
    },
  },
}
export const Maintenance: Story = {
  args: { service: { ...base, status: 'maintenance', name: 'Auth Service' } },
}
