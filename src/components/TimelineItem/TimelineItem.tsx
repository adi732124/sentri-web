import { formatDistanceToNow } from 'date-fns'
import { GitBranch, GitMerge, GitCommit, AlertTriangle, CheckCircle } from 'lucide-react'
import { Avatar } from '@/components/Avatar/Avatar'
import type { ActivityEvent } from '@/types'

export interface TimelineItemProps {
  event: ActivityEvent
  isLast?: boolean
}

const typeConfig: Record<
  ActivityEvent['type'],
  {
    icon: typeof GitCommit
    color: string
    bg: string
  }
> = {
  deployment: { icon: GitBranch, color: 'var(--accent)', bg: 'var(--accent-bg)' },
  pr_merge: { icon: GitMerge, color: 'var(--success)', bg: 'var(--success-bg)' },
  commit: { icon: GitCommit, color: 'var(--text)', bg: 'var(--code-bg)' },
  incident_created: { icon: AlertTriangle, color: 'var(--danger)', bg: 'var(--danger-bg)' },
  incident_resolved: { icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-bg)' },
}

export function TimelineItem({ event, isLast = false }: TimelineItemProps) {
  const { icon: Icon, color, bg } = typeConfig[event.type]

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
          style={{ color, background: bg }}
        >
          <Icon size={13} />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1" style={{ background: 'var(--border)' }} />}
      </div>

      <div className="pb-4">
        <div className="flex items-center gap-2">
          <Avatar name={event.author.name} size="xs" />
          <span className="text-xs font-medium" style={{ color: 'var(--text-h)' }}>
            {event.author.name}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
          </span>
        </div>
        <div className="mt-1 text-sm" style={{ color: 'var(--text-h)' }}>
          {event.message}
        </div>
        <div className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          {event.service}
        </div>
      </div>
    </div>
  )
}
