import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus, Trash2, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { Avatar } from '@/components/Avatar/Avatar'
import { inviteMemberSchema } from '@/schemas/auth.schema'
import type { InviteMemberFormData } from '@/schemas/auth.schema'
import type { WorkspaceRole, AvatarStatus } from '@/types'

interface Member {
  id: string
  name: string
  email: string
  role: WorkspaceRole
  status: AvatarStatus
}

const initialMembers: Member[] = [
  { id: '1', name: 'Aditya Kumar', email: 'aditya@sentri.dev', role: 'admin', status: 'online' },
  { id: '2', name: 'Sara Mehta', email: 'sara@sentri.dev', role: 'developer', status: 'away' },
  { id: '3', name: 'John Davis', email: 'john@sentri.dev', role: 'viewer', status: 'offline' },
]

const roleBadge: Record<WorkspaceRole, { color: string; bg: string }> = {
  admin: { color: 'var(--accent)', bg: 'var(--accent-bg)' },
  developer: { color: 'var(--success)', bg: 'var(--success-bg)' },
  viewer: { color: 'var(--text)', bg: 'var(--code-bg)' },
}

const inputCls = clsx(
  'w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-all',
  'focus:border-accent focus:ring-2 focus:ring-accent-bg',
  'border-ui-border bg-ui-bg text-ui-heading',
)

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: 'var(--border)' }}>
        <p className="text-sm font-bold" style={{ color: 'var(--text-h)' }}>
          {title}
        </p>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function Settings() {
  const [workspaceName, setWorkspaceName] = useState('My Workspace')
  const [members, setMembers] = useState(initialMembers)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
  })

  const handleInvite = (data: InviteMemberFormData) => {
    const newMember: Member = {
      id: crypto.randomUUID(),
      name: data.email.split('@')[0],
      email: data.email,
      role: data.role,
      status: 'offline',
    }
    setMembers((prev) => [...prev, newMember])
    toast.success(`Invite sent to ${data.email}`)
    reset()
  }

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
    toast.success('Member removed')
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1
          className="text-xl font-bold tracking-tight"
          style={{ color: 'var(--text-h)', letterSpacing: '-0.02em' }}
        >
          Settings
        </h1>
        <p className="mt-0.5 text-sm" style={{ color: 'var(--text-muted)' }}>
          Workspace configuration and team management.
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {/* Workspace */}
        <Section title="Workspace" description="General settings for your workspace.">
          <div className="flex flex-col gap-4">
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'var(--text-h)' }}
              >
                Workspace name
              </label>
              <input
                className={inputCls}
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'var(--text-h)' }}
              >
                Slug
              </label>
              <input
                className={clsx(inputCls, 'cursor-not-allowed opacity-50')}
                value="my-workspace"
                disabled
              />
              <p className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                Used in URLs — contact support to change.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => toast.success('Workspace saved')}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </Section>

        {/* Members */}
        <Section title="Team Members" description="Manage roles and access for your team.">
          <div className="flex flex-col gap-3">
            {members.map((m) => {
              const badge = roleBadge[m.role]
              return (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-xl border px-3.5 py-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Avatar name={m.name} size="sm" status={m.status} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: 'var(--text-h)' }}
                    >
                      {m.name}
                    </p>
                    <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                      {m.email}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{ color: badge.color, background: badge.bg }}
                  >
                    {m.role}
                  </span>
                  {m.role !== 'admin' ? (
                    <button
                      onClick={() => handleRemove(m.id)}
                      className="rounded-lg p-1.5 transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = 'var(--danger-bg)'
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--danger)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = ''
                        ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  ) : (
                    <div className="p-1.5" style={{ color: 'var(--text-muted)' }}>
                      <Shield size={13} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Section>

        {/* Invite */}
        <Section title="Invite Member" description="Send an invite link by email.">
          <form onSubmit={handleSubmit(handleInvite)} className="flex flex-col gap-4">
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'var(--text-h)' }}
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="colleague@example.com"
                className={inputCls}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium" style={{ color: 'var(--danger)' }}>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'var(--text-h)' }}
              >
                Role
              </label>
              <select className={inputCls} {...register('role')}>
                <option value="developer">Developer</option>
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && (
                <p className="mt-1.5 text-xs font-medium" style={{ color: 'var(--danger)' }}>
                  {errors.role.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--accent)'
                }}
              >
                <UserPlus size={14} />
                Send Invite
              </button>
            </div>
          </form>
        </Section>
      </div>
    </div>
  )
}
