import { create } from 'zustand'
import type { Incident, Severity, IncidentStatus } from '@/types'

interface IncidentsFilter {
  search: string
  severity: Severity | 'all'
  status: IncidentStatus | 'all'
}

interface IncidentsState {
  incidents: Incident[]
  filter: IncidentsFilter
  setIncidents: (incidents: Incident[]) => void
  upsertIncident: (incident: Incident) => void
  setFilter: (filter: Partial<IncidentsFilter>) => void
}

export const useIncidentsStore = create<IncidentsState>((set) => ({
  incidents: [],
  filter: { search: '', severity: 'all', status: 'all' },

  setIncidents: (incidents) => set({ incidents }),

  upsertIncident: (incident) =>
    set((state) => {
      const idx = state.incidents.findIndex((i) => i.id === incident.id)
      if (idx === -1) return { incidents: [incident, ...state.incidents] }
      const updated = [...state.incidents]
      updated[idx] = incident
      return { incidents: updated }
    }),

  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
}))
