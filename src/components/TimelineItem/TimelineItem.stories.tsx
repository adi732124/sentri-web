import type { Meta, StoryObj } from '@storybook/react'
import { TimelineItem } from './TimelineItem'
import type { ActivityEvent } from '@/types'

const author = { id: 'u1', name: 'Aditya Kumar', email: 'aditya@sentri.dev' }

const events: ActivityEvent[] = [
  {
    id: '1',
    type: 'deployment',
    message: 'Deployed v1.4.2 to production',
    service: 'API Gateway',
    author,
    timestamp: new Date(Date.now() - 10 * 60_000).toISOString(),
  },
  {
    id: '2',
    type: 'pr_merge',
    message: 'Merged PR #142: Add rate limiting',
    service: 'Auth Service',
    author,
    timestamp: new Date(Date.now() - 30 * 60_000).toISOString(),
  },
  {
    id: '3',
    type: 'incident_created',
    message: 'Incident #5 created: Latency spike',
    service: 'Notification Bus',
    author,
    timestamp: new Date(Date.now() - 60 * 60_000).toISOString(),
  },
]

const meta: Meta<typeof TimelineItem> = {
  title: 'Domain/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof TimelineItem>

export const Deployment: Story = { args: { event: events[0] } }
export const PrMerge: Story = { args: { event: events[1] } }
export const IncidentCreated: Story = { args: { event: events[2] } }

export const Feed: Story = {
  render: () => (
    <div>
      {events.map((e, i) => (
        <TimelineItem key={e.id} event={e} isLast={i === events.length - 1} />
      ))}
    </div>
  ),
}
