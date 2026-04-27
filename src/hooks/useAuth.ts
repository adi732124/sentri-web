import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/stores/auth.store'
import { authApi } from '@/services/auth.api'
import { queryClient } from '@/lib/queryClient'
import type { LoginFormData, RegisterFormData } from '@/schemas/auth.schema'

export function useAuth() {
  const navigate = useNavigate()
  const { user, token, workspace, setAuth, logout: storeLogout } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: (res) => {
      const { user: u, token: t, refreshToken, workspace: w } = res.data
      setAuth(u, t, refreshToken, w)
      navigate('/dashboard')
    },
    onError: () => toast.error('Invalid email or password'),
  })

  const registerMutation = useMutation({
    mutationFn: (data: Omit<RegisterFormData, 'confirmPassword'>) => authApi.register(data),
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
