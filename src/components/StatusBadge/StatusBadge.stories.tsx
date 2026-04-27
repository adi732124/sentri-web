import type { Meta, StoryObj } from '@storybook/react'
import { StatusBadge } from './StatusBadge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Domain/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StatusBadge>

export const Critical: Story = { args: { severity: 'critical', pulse: true } }
export const High: Story = { args: { severity: 'high' } }
export const Medium: Story = { args: { severity: 'medium' } }
export const Low: Story = { args: { severity: 'low' } }

export const AllSeverities: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge severity="critical" pulse />
      <StatusBadge severity="high" />
      <StatusBadge severity="medium" />
      <StatusBadge severity="low" />
    </div>
  ),
}
