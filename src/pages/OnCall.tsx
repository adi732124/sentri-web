import { useState, useCallback } from 'react'
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Phone, Clock } from 'lucide-react'
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

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: 'var(--border)',
        background: 'var(--surface)',
      }}
      className={clsx(
        'flex items-start gap-3 rounded-2xl border px-4 py-3.5 transition-shadow sm:items-center',
        isDragging && 'opacity-50 shadow-sentri',
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-0.5 cursor-grab rounded-md p-1 transition-colors active:cursor-grabbing sm:mt-0"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = 'var(--code-bg)'
          ;(e.currentTarget as HTMLElement).style.color = 'var(--text-h)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = ''
          ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
        }}
      >
        <GripVertical size={14} />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {isFirst && (
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ color: 'var(--success)', background: 'var(--success-bg)' }}
            >
              Current
            </span>
          )}
          <span className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
            {item.week}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={item.primary.name} size="xs" status={item.primary.status} />
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Primary
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                {item.primary.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Avatar name={item.backup.name} size="xs" status={item.backup.status} />
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Backup
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                {item.backup.name}
              </p>
            </div>
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
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
        >
          On-Call Schedule
        </h1>
        <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>
          Rotation and escalation policy for the engineering team.
        </p>
      </div>

      {/* Currently on-call hero */}
      <div
        className="mb-6 flex items-center gap-4 rounded-2xl border px-5 py-5"
        style={{ borderColor: 'var(--success-border)', background: 'var(--success-bg)' }}
      >
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)' }}
        >
          <Phone size={20} style={{ color: 'var(--success)' }} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--success)' }}
          >
            Currently On-Call
          </p>
          <p className="mt-0.5 text-lg font-bold" style={{ color: 'var(--text-h)' }}>
            {current.primary.name}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {current.week} · Primary
          </p>
        </div>
        <span
          className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-bold"
          style={{
            color: 'var(--success)',
            background: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
          }}
        >
          Active
        </span>
      </div>

      {/* Rotation schedule */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Rotation Schedule
          </h2>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Drag to reorder
          </span>
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
        <h2
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          Escalation Policy
        </h2>
        <div className="flex flex-col gap-2">
          {escalation.map((e) => (
            <div
              key={e.step}
              className="flex items-center gap-4 rounded-2xl border px-4 py-3.5"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
              >
                {e.step}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
                  {e.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {e.name}
                </p>
              </div>
              {e.timeout ? (
                <span
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <Clock size={11} />
                  {e.timeout}
                </span>
              ) : (
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                >
                  Final
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
