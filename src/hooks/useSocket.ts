import { useEffect } from 'react'
import { connectSocket, disconnectSocket, getSocket } from '@/lib/socket'
import { useAuthStore } from '@/stores/auth.store'
import { useIncidentsStore } from '@/stores/incidents.store'
import { useServicesStore } from '@/stores/services.store'
import type { Incident, Service } from '@/types'

export function useSocket() {
  const token = useAuthStore((s) => s.token)
  const upsertIncident = useIncidentsStore((s) => s.upsertIncident)
  const updateServiceStatus = useServicesStore((s) => s.updateServiceStatus)

  useEffect(() => {
    if (!token) return

    connectSocket(token)
    const socket = getSocket()

    socket.on('incident:created', (incident: Incident) => upsertIncident(incident))
    socket.on('incident:updated', (incident: Incident) => upsertIncident(incident))
    socket.on(
      'service:status:changed',
      ({ id, status }: { id: string; status: Service['status'] }) =>
        updateServiceStatus(id, status),
    )

    return () => {
      socket.off('incident:created')
      socket.off('incident:updated')
      socket.off('service:status:changed')
      disconnectSocket()
    }
  }, [token, upsertIncident, updateServiceStatus])
}
