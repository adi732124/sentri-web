import { api } from './api'
import type { AuthResponse, ApiResponse } from '@/types'
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema'

export const authApi = {
  login: (data: LoginFormData) => api.post<AuthResponse>('/auth/login', data),

  register: (data: Omit<RegisterFormData, 'confirmPassword'>) =>
    api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post<ApiResponse<null>>('/auth/logout'),

  me: () => api.get<ApiResponse<AuthResponse['user']>>('/auth/me'),
}
