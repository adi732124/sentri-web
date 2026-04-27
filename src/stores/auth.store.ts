import { create } from 'zustand'
import type { User, Workspace } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  workspace: Workspace | null
  setAuth: (user: User, token: string, refreshToken: string, workspace: Workspace) => void
  setWorkspace: (workspace: Workspace) => void
  logout: () => void
}

const storedToken = localStorage.getItem('sentri_token')
const storedUser = localStorage.getItem('sentri_user')
const storedWorkspace = localStorage.getItem('sentri_workspace')

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? (JSON.parse(storedUser) as User) : null,
  token: storedToken,
  workspace: storedWorkspace ? (JSON.parse(storedWorkspace) as Workspace) : null,

  setAuth: (user, token, refreshToken, workspace) => {
    localStorage.setItem('sentri_token', token)
    localStorage.setItem('sentri_refresh_token', refreshToken)
    localStorage.setItem('sentri_user', JSON.stringify(user))
    localStorage.setItem('sentri_workspace', JSON.stringify(workspace))
    set({ user, token, workspace })
  },

  setWorkspace: (workspace) => {
    localStorage.setItem('sentri_workspace', JSON.stringify(workspace))
    set({ workspace })
  },

  logout: () => {
    localStorage.removeItem('sentri_token')
    localStorage.removeItem('sentri_refresh_token')
    localStorage.removeItem('sentri_user')
    localStorage.removeItem('sentri_workspace')
    set({ user: null, token: null, workspace: null })
  },
}))
