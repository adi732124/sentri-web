import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_doe',
    hint: 'Letters, numbers, and underscores only.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    error: 'Password must be at least 8 characters.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Read-only field',
    value: 'locked value',
    disabled: true,
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search…',
    leftIcon: <span>🔍</span>,
  },
}

export const NoLabel: Story = {
  args: { placeholder: 'Enter a value…' },
}
