import type { Meta, StoryObj } from '@storybook/react'
import { IncidentCard } from './IncidentCard'
import type { Incident } from '@/types'

const base: Incident = {
  id: '1',
  title: 'Notification Bus latency spike',
  service: 'Notification Bus',
  severity: 'critical',
  status: 'open',
  createdAt: new Date(Date.now() - 15 * 60_000).toISOString(),
  updatedAt: new Date().toISOString(),
  assignee: { id: 'u1', name: 'Aditya Kumar', email: 'aditya@sentri.dev' },
}

const meta: Meta<typeof IncidentCard> = {
  title: 'Domain/IncidentCard',
  component: IncidentCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof IncidentCard>

export const Open: Story = { args: { incident: base } }
export const Acknowledged: Story = {
  args: { incident: { ...base, status: 'acknowledged', severity: 'high' } },
}
export const Resolved: Story = {
  args: { incident: { ...base, status: 'resolved', severity: 'medium' } },
}
export const WithActions: Story = {
  args: {
    incident: base,
    onAcknowledge: (id) => alert(`Acknowledge ${id}`),
    onResolve: (id) => alert(`Resolve ${id}`),
  },
}
