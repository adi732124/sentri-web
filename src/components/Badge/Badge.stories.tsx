import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: { children: 'Success', variant: 'success' },
}

export const Warning: Story = {
  args: { children: 'Warning', variant: 'warning' },
}

export const Error: Story = {
  args: { children: 'Error', variant: 'error' },
}

export const Info: Story = {
  args: { children: 'Info', variant: 'info' },
}

export const Neutral: Story = {
  args: { children: 'Draft', variant: 'neutral' },
}

export const WithDot: Story = {
  args: { children: 'Live', variant: 'success', dot: true },
}

export const Small: Story = {
  args: { children: 'Small', variant: 'info', size: 'sm' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="warning">Degraded</Badge>
      <Badge variant="error">Outage</Badge>
      <Badge variant="info">Beta</Badge>
      <Badge variant="neutral">Draft</Badge>
    </div>
  ),
}
