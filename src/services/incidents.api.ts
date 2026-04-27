import { api } from './api'
import type { Incident, PaginatedResponse, ApiResponse } from '@/types'
import type { CreateIncidentFormData } from '@/schemas/incident.schema'

export const incidentsApi = {
  list: (params?: { page?: number; limit?: number; status?: string; severity?: string }) =>
    api.get<PaginatedResponse<Incident>>('/incidents', { params }),

  get: (id: string) => api.get<ApiResponse<Incident>>(`/incidents/${id}`),

  create: (data: CreateIncidentFormData) => api.post<ApiResponse<Incident>>('/incidents', data),

  acknowledge: (id: string) => api.patch<ApiResponse<Incident>>(`/incidents/${id}/acknowledge`),

  resolve: (id: string) => api.patch<ApiResponse<Incident>>(`/incidents/${id}/resolve`),

  delete: (id: string) => api.delete(`/incidents/${id}`),
}
