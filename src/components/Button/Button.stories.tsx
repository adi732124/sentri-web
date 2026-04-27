import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { children: 'Secondary Button', variant: 'secondary', size: 'md' },
}

export const Ghost: Story = {
  args: { children: 'Ghost Button', variant: 'ghost', size: 'md' },
}

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger', size: 'md' },
}

export const Small: Story = {
  args: { children: 'Small', variant: 'primary', size: 'sm' },
}

export const Large: Story = {
  args: { children: 'Large', variant: 'primary', size: 'lg' },
}

export const Loading: Story = {
  args: { children: 'Saving…', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'primary', disabled: true },
}

export const FullWidth: Story = {
  args: { children: 'Full Width', variant: 'primary', fullWidth: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}

export const WithIcon: Story = {
  args: {
    children: 'Add Item',
    variant: 'primary',
    leftIcon: <span>＋</span>,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}
