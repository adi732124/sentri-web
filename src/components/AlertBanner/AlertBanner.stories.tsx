import type { Meta, StoryObj } from '@storybook/react'
import { AlertBanner } from './AlertBanner'

const meta: Meta<typeof AlertBanner> = {
  title: 'Domain/AlertBanner',
  component: AlertBanner,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AlertBanner>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Scheduled maintenance',
    children: 'API Gateway will be in maintenance mode Sunday 2–4 AM UTC.',
    dismissible: true,
  },
}
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Elevated error rate',
    children: 'Webhook Worker is seeing 1.88% error rate, above the 0.5% threshold.',
    dismissible: true,
  },
}
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Service down',
    children: 'Notification Bus is unreachable. Incident #4 is open.',
    dismissible: false,
  },
}
