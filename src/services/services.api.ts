import { api } from './api'
import type { Service, ApiResponse } from '@/types'

export const servicesApi = {
  list: () => api.get<ApiResponse<Service[]>>('/services'),

  get: (id: string) => api.get<ApiResponse<Service>>(`/services/${id}`),

  metrics: (id: string, range: '1h' | '24h' | '7d' | '30d') =>
    api.get<ApiResponse<Service>>(`/services/${id}/metrics`, { params: { range } }),
}
