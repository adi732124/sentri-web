// ─── Severity & Status ────────────────────────────────────────────────────────

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type IncidentStatus = 'open' | 'acknowledged' | 'resolved'
export type ServiceStatus = 'operational' | 'degraded' | 'down' | 'maintenance'
export type WorkspaceRole = 'admin' | 'developer' | 'viewer'
export type OnCallStatus = 'active' | 'off-duty' | 'escalated'
export type ActivityType =
  | 'deployment'
  | 'pr_merge'
  | 'commit'
  | 'incident_created'
  | 'incident_resolved'
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline'

// ─── Entities ─────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  members: WorkspaceMember[]
}

export interface WorkspaceMember {
  user: User
  role: WorkspaceRole
}

export interface Incident {
  id: string
  title: string
  description?: string
  severity: Severity
  status: IncidentStatus
  service: string
  assignee?: User
  createdAt: string
  updatedAt: string
  acknowledgedAt?: string
  resolvedAt?: string
}

export interface MetricPoint {
  timestamp: string
  value: number
}

export interface Service {
  id: string
  name: string
  status: ServiceStatus
  uptime: number
  latency: {
    p50: number
    p95: number
    p99: number
  }
  errorRate: number
  metrics?: MetricPoint[]
}

export interface OnCallRotation {
  id: string
  user: User
  startDate: string
  endDate: string
  isCurrentlyOnCall: boolean
}

export interface EscalationStep {
  order: number
  user: User
  delayMinutes: number
}

export interface EscalationPolicy {
  id: string
  name: string
  steps: EscalationStep[]
}

export interface ActivityEvent {
  id: string
  type: ActivityType
  message: string
  service: string
  author: User
  timestamp: string
  metadata?: Record<string, unknown>
}

// ─── API shapes ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  workspace: Workspace
}
