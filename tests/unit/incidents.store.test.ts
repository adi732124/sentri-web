import { describe, it, expect, beforeEach } from 'vitest'
import { useIncidentsStore } from '@/stores/incidents.store'
import type { Incident } from '@/types'

const inc: Incident = {
  id: '1',
  title: 'Test incident',
  service: 'API',
  severity: 'critical',
  status: 'open',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('incidents.store', () => {
  beforeEach(() =>
    useIncidentsStore.setState({
      incidents: [],
      filter: { search: '', severity: 'all', status: 'all' },
    }),
  )

  it('setIncidents replaces list', () => {
    useIncidentsStore.getState().setIncidents([inc])
    expect(useIncidentsStore.getState().incidents).toHaveLength(1)
  })

  it('upsertIncident adds new incident', () => {
    useIncidentsStore.getState().upsertIncident(inc)
    expect(useIncidentsStore.getState().incidents[0]).toEqual(inc)
  })

  it('upsertIncident updates existing incident', () => {
    useIncidentsStore.getState().setIncidents([inc])
    const updated = { ...inc, status: 'acknowledged' as const }
    useIncidentsStore.getState().upsertIncident(updated)
    expect(useIncidentsStore.getState().incidents[0].status).toBe('acknowledged')
    expect(useIncidentsStore.getState().incidents).toHaveLength(1)
  })

  it('setFilter merges partial filter', () => {
    useIncidentsStore.getState().setFilter({ severity: 'critical' })
    expect(useIncidentsStore.getState().filter.severity).toBe('critical')
    expect(useIncidentsStore.getState().filter.status).toBe('all')
  })
})
