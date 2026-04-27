import { useAuthStore } from '@/stores/auth.store'
import { useWorkspaceStore } from '@/stores/workspace.store'

export function useWorkspace() {
  const authWorkspace = useAuthStore((s) => s.workspace)
  const storeWorkspace = useWorkspaceStore((s) => s.workspace)
  const { addMember, removeMember, updateMemberRole } = useWorkspaceStore()

  const workspace = storeWorkspace ?? authWorkspace

  return { workspace, addMember, removeMember, updateMemberRole }
}
