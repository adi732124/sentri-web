import type { Meta, StoryObj } from '@storybook/react'
import { OnCallBadge } from './OnCallBadge'

const meta: Meta<typeof OnCallBadge> = {
  title: 'Domain/OnCallBadge',
  component: OnCallBadge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof OnCallBadge>

export const Active: Story = { args: { status: 'active', name: 'Aditya Kumar' } }
export const OffDuty: Story = { args: { status: 'off-duty', name: 'Sara Mehta' } }
export const Escalated: Story = { args: { status: 'escalated', name: 'John Davis' } }
