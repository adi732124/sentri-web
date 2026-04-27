import { create } from 'zustand'
import type { Workspace, WorkspaceMember } from '@/types'

interface WorkspaceState {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
  addMember: (member: WorkspaceMember) => void
  removeMember: (userId: string) => void
  updateMemberRole: (userId: string, role: WorkspaceMember['role']) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspace: null,

  setWorkspace: (workspace) => set({ workspace }),

  addMember: (member) =>
    set((state) =>
      state.workspace
        ? { workspace: { ...state.workspace, members: [...state.workspace.members, member] } }
        : state,
    ),

  removeMember: (userId) =>
    set((state) =>
      state.workspace
        ? {
            workspace: {
              ...state.workspace,
              members: state.workspace.members.filter((m) => m.user.id !== userId),
            },
          }
        : state,
    ),

  updateMemberRole: (userId, role) =>
    set((state) =>
      state.workspace
        ? {
            workspace: {
              ...state.workspace,
              members: state.workspace.members.map((m) =>
                m.user.id === userId ? { ...m, role } : m,
              ),
            },
          }
        : state,
    ),
}))
