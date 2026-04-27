import { useState } from 'react'
import { Button, Card, Input, Avatar, Badge } from '../components'

const members = [
  { name: 'Aditya Kumar', email: 'aditya@sentri.dev', role: 'Admin', status: 'online' as const },
  { name: 'Sara Mehta', email: 'sara@sentri.dev', role: 'Developer', status: 'away' as const },
  { name: 'John Davis', email: 'john@sentri.dev', role: 'Viewer', status: 'offline' as const },
]

export default function Settings() {
  const [workspaceName, setWorkspaceName] = useState('My Workspace')
  const [inviteEmail, setInviteEmail] = useState('')

  return (
    <div style={{ padding: '32px 24px', maxWidth: 740, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>Settings</h1>
        <p style={{ margin: 0, color: 'var(--text)' }}>Workspace configuration and team management.</p>
      </div>

      {/* Workspace */}
      <Card title="Workspace" description="General workspace settings." bordered style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <Input label="Slug" value="my-workspace" hint="Used in URLs — contact support to change." disabled />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="sm">Save changes</Button>
          </div>
        </div>
      </Card>

      {/* Members */}
      <Card title="Team Members" description="Manage roles and access." bordered style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {members.map((m) => (
            <div key={m.email} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Avatar name={m.name} size="sm" status={m.status} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-h)' }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text)' }}>{m.email}</div>
              </div>
              <Badge variant={m.role === 'Admin' ? 'info' : m.role === 'Developer' ? 'success' : 'neutral'} size="sm">
                {m.role}
              </Badge>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Invite */}
      <Card title="Invite Member" description="Send an invite link by email." bordered>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Email address"
              placeholder="colleague@example.com"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
          </div>
          <Button variant="primary" size="md">Send Invite</Button>
        </div>
      </Card>
    </div>
  )
}
