import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth.store'
import type { User, Workspace } from '@/types'

const mockUser: User = { id: 'u1', name: 'Aditya Kumar', email: 'aditya@test.com' }
const mockWorkspace: Workspace = { id: 'w1', name: 'Test WS', slug: 'test-ws', members: [] }

describe('auth.store', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, workspace: null })
    localStorage.clear()
  })

  it('setAuth persists token and user', () => {
    useAuthStore.getState().setAuth(mockUser, 'tok123', 'ref123', mockWorkspace)
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe('tok123')
    expect(localStorage.getItem('sentri_token')).toBe('tok123')
  })

  it('logout clears state and localStorage', () => {
    useAuthStore.getState().setAuth(mockUser, 'tok123', 'ref123', mockWorkspace)
    useAuthStore.getState().logout()
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(localStorage.getItem('sentri_token')).toBeNull()
  })
})
