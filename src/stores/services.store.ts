import { create } from 'zustand'
import type { Service } from '@/types'

interface ServicesState {
  services: Service[]
  setServices: (services: Service[]) => void
  updateServiceStatus: (id: string, status: Service['status']) => void
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: [],

  setServices: (services) => set({ services }),

  updateServiceStatus: (id, status) =>
    set((state) => ({
      services: state.services.map((s) => (s.id === id ? { ...s, status } : s)),
    })),
}))
