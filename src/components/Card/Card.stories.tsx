import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '../Button/Button'
import { Badge } from '../Badge/Badge'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
    shadow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'A short description of the card content.',
    children: 'This is the main body content of the card. It can contain any React nodes.',
  },
}

export const WithShadow: Story = {
  args: {
    title: 'Shadow Card',
    description: 'Elevated with a shadow.',
    shadow: true,
    bordered: false,
    children: 'Card body content.',
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    children: 'This action cannot be undone. All related data will be removed.',
    footer: (
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Confirm</Button>
      </div>
    ),
  },
}

export const WithBadge: Story = {
  render: () => (
    <Card
      title="System Status"
      description="All services are operational."
      footer={<Badge variant="success" dot>Operational</Badge>}
    >
      Uptime: 99.98% · Last incident: 42 days ago
    </Card>
  ),
}

export const BodyOnly: Story = {
  args: {
    children: 'A minimal card with only body content and no header or footer.',
  },
}
