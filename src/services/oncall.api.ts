import { api } from './api'
import type { OnCallRotation, EscalationPolicy, ApiResponse } from '@/types'

export const oncallApi = {
  schedule: () => api.get<ApiResponse<OnCallRotation[]>>('/oncall/schedule'),

  policy: () => api.get<ApiResponse<EscalationPolicy>>('/oncall/policy'),

  updateRotation: (rotations: OnCallRotation[]) =>
    api.put<ApiResponse<OnCallRotation[]>>('/oncall/schedule', { rotations }),
}
