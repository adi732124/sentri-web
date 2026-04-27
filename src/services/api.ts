import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sentri_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const originalRequest = error.config as typeof error.config & { _retry?: boolean }
    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (originalRequest) originalRequest._retry = true

      const refreshToken = localStorage.getItem('sentri_refresh_token')
      if (!refreshToken) {
        localStorage.removeItem('sentri_token')
        localStorage.removeItem('sentri_refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        localStorage.setItem('sentri_token', data.token as string)
        if (originalRequest) {
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers['Authorization'] = `Bearer ${data.token as string}`
          return api(originalRequest)
        }
      } catch {
        localStorage.removeItem('sentri_token')
        localStorage.removeItem('sentri_refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)
