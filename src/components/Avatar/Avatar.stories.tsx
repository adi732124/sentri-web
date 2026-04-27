import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithInitials: Story = {
  args: { name: 'Aditya Kumar', size: 'md' },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/80',
    alt: 'User avatar',
    name: 'User',
    size: 'md',
  },
}

export const Online: Story = {
  args: { name: 'Aditya Kumar', size: 'md', status: 'online' },
}

export const Busy: Story = {
  args: { name: 'Aditya Kumar', size: 'md', status: 'busy' },
}

export const Away: Story = {
  args: { name: 'Aditya Kumar', size: 'md', status: 'away' },
}

export const Offline: Story = {
  args: { name: 'Aditya Kumar', size: 'md', status: 'offline' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar name="AK" size="xs" />
      <Avatar name="AK" size="sm" />
      <Avatar name="AK" size="md" />
      <Avatar name="AK" size="lg" />
      <Avatar name="AK" size="xl" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Online" size="lg" status="online" />
      <Avatar name="Busy" size="lg" status="busy" />
      <Avatar name="Away" size="lg" status="away" />
      <Avatar name="Off" size="lg" status="offline" />
    </div>
  ),
}
