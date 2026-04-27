import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { GitBranch, GitMerge, GitCommit, AlertTriangle, CheckCircle } from 'lucide-react'
import { Avatar } from '@/components/Avatar/Avatar'
import type { ActivityEvent } from '@/types'

export interface TimelineItemProps {
  event: ActivityEvent
  isLast?: boolean
}

const typeConfig: Record<ActivityEvent['type'], { icon: typeof GitCommit; cls: string }> = {
  deployment: { icon: GitBranch, cls: 'bg-[var(--accent-bg)] text-[var(--accent)]' },
  pr_merge: { icon: GitMerge, cls: 'bg-emerald-500/10 text-emerald-600' },
  commit: { icon: GitCommit, cls: 'bg-[var(--code-bg)] text-[var(--text)]' },
  incident_created: { icon: AlertTriangle, cls: 'bg-red-500/10 text-red-500' },
  incident_resolved: { icon: CheckCircle, cls: 'bg-emerald-500/10 text-emerald-600' },
}

export function TimelineItem({ event, isLast = false }: TimelineItemProps) {
  const { icon: Icon, cls } = typeConfig[event.type]

  return (
    <div className="flex gap-3">
      {/* Connector */}
      <div className="flex flex-col items-center">
        <div
          className={clsx(
            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
            cls,
          )}
        >
          <Icon size={13} />
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-[var(--border)]" />}
      </div>

      {/* Content */}
      <div className="pb-4">
        <div className="flex items-center gap-2">
          <Avatar name={event.author.name} size="xs" />
          <span className="text-xs font-medium text-[var(--text-h)]">{event.author.name}</span>
          <span className="text-xs text-[var(--text)]">
            {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
          </span>
        </div>
        <div className="mt-1 text-sm text-[var(--text-h)]">{event.message}</div>
        <div className="mt-0.5 text-xs text-[var(--text)]">{event.service}</div>
      </div>
    </div>
  )
}
