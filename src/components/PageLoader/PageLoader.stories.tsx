import type { Meta, StoryObj } from '@storybook/react'
import { PageLoader } from './PageLoader'

const meta: Meta<typeof PageLoader> = {
  title: 'Components/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    inline: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof PageLoader>

export const FullPage: Story = {
  args: { inline: false },
}

export const Inline: Story = {
  args: { inline: true },
  parameters: { layout: 'padded' },
}
