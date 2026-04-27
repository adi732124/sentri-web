import { useState, useCallback } from 'react'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Phone } from 'lucide-react'
import clsx from 'clsx'
import { Avatar } from '@/components/Avatar/Avatar'
import type { AvatarStatus } from '@/types'

interface RotationItem {
  id: string
  week: string
  primary: { name: string; status: AvatarStatus }
  backup: { name: string; status: AvatarStatus }
}

const initialSchedule: RotationItem[] = [
  {
    id: '1',
    week: 'This week (Apr 28 – May 4)',
    primary: { name: 'Aditya Kumar', status: 'online' },
    backup: { name: 'Sara Mehta', status: 'away' },
  },
  {
    id: '2',
    week: 'Next week (May 5 – May 11)',
    primary: { name: 'Sara Mehta', status: 'away' },
    backup: { name: 'John Davis', status: 'offline' },
  },
  {
    id: '3',
    week: 'May 12 – May 18',
    primary: { name: 'John Davis', status: 'offline' },
    backup: { name: 'Aditya Kumar', status: 'online' },
  },
]

const escalation = [
  { step: 1, label: 'Primary on-call', timeout: '10 min', name: 'Aditya Kumar' },
  { step: 2, label: 'Backup on-call', timeout: '10 min', name: 'Sara Mehta' },
  { step: 3, label: 'Engineering Manager', timeout: null, name: 'John Davis' },
]

function SortableRow({ item, isFirst }: { item: RotationItem; isFirst: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3',
        isDragging && 'opacity-50 shadow-sentri',
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-[var(--text)] hover:text-[var(--text-h)] active:cursor-grabbing"
      >
        <GripVertical size={14} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {isFirst && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600">
              Current
            </span>
          )}
          <span className="text-sm font-medium text-[var(--text-h)]">{item.week}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Avatar name={item.primary.name} size="xs" status={item.primary.status} />
          <div>
            <div className="text-xs text-[var(--text)]">Primary</div>
            <div className="text-sm font-medium text-[var(--text-h)]">{item.primary.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar name={item.backup.name} size="xs" status={item.backup.status} />
          <div>
            <div className="text-xs text-[var(--text)]">Backup</div>
            <div className="text-sm font-medium text-[var(--text-h)]">{item.backup.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OnCall() {
  const [schedule, setSchedule] = useState(initialSchedule)

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setSchedule((items) => {
        const oldIdx = items.findIndex((i) => i.id === active.id)
        const newIdx = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIdx, newIdx)
      })
    }
  }, [])

  const current = schedule[0]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--text-h)]">On-Call Schedule</h1>
        <p className="mt-1 text-sm text-[var(--text)]">
          Rotation and escalation policy for the engineering team.
        </p>
      </div>

      {/* Currently on-call hero */}
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
            <Phone size={18} />
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--text)]">
              Currently On-Call
            </div>
            <div className="text-base font-semibold text-[var(--text-h)]">
              {current.primary.name}
            </div>
            <div className="text-xs text-[var(--text)]">{current.week} · Primary</div>
          </div>
        </div>
        <span className="ml-auto rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
          Active
        </span>
      </div>

      {/* Rotation schedule (drag-to-reorder) */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[var(--text-h)]">Rotation Schedule</h2>
          <span className="text-xs text-[var(--text)]">Drag rows to reorder</span>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={schedule.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {schedule.map((item, i) => (
                <SortableRow key={item.id} item={item} isFirst={i === 0} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </section>

      {/* Escalation policy */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-[var(--text-h)]">Escalation Policy</h2>
        <div className="flex flex-col gap-2">
          {escalation.map((e) => (
            <div
              key={e.step}
              className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3"
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] text-xs font-bold text-[var(--accent)]">
                {e.step}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--text-h)]">{e.label}</div>
                <div className="text-xs text-[var(--text)]">{e.name}</div>
              </div>
              {e.timeout && (
                <span className="rounded-full bg-[var(--code-bg)] px-2.5 py-0.5 text-xs text-[var(--text)]">
                  Escalate after {e.timeout}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
