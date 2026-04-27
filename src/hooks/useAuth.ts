import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/stores/auth.store'
import { queryClient } from '@/lib/queryClient'
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema'

export function useAuth() {
  const navigate = useNavigate()
  const { user, token, workspace, setAuth, logout: storeLogout } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      // TODO: replace with real API call once backend is ready
      await new Promise((r) => setTimeout(r, 500))
      return {
        data: {
          user: { id: '1', name: data.email.split('@')[0], email: data.email },
          token: 'mock-token',
          refreshToken: 'mock-refresh-token',
          workspace: { id: 'ws-1', name: 'My Workspace', slug: 'my-workspace', members: [] },
        },
      }
    },
    onSuccess: (res) => {
      const { user: u, token: t, refreshToken, workspace: w } = res.data
      setAuth(u, t, refreshToken, w)
      navigate('/dashboard')
    },
    onError: () => toast.error('Invalid email or password'),
  })

  const registerMutation = useMutation({
    mutationFn: async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
      // TODO: replace with real API call once backend is ready
      await new Promise((r) => setTimeout(r, 500))
      return {
        data: {
          user: { id: '1', name: data.name ?? data.email.split('@')[0], email: data.email },
          token: 'mock-token',
          refreshToken: 'mock-refresh-token',
          workspace: { id: 'ws-1', name: 'My Workspace', slug: 'my-workspace', members: [] },
        },
      }
    },
    onSuccess: (res) => {
      const { user: u, token: t, refreshToken, workspace: w } = res.data
      setAuth(u, t, refreshToken, w)
      navigate('/dashboard')
    },
    onError: () => toast.error('Registration failed. Please try again.'),
  })

  const logout = () => {
    storeLogout()
    queryClient.clear()
    navigate('/login')
  }

  return {
    user,
    token,
    workspace,
    isAuthenticated: !!token,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  }
}
