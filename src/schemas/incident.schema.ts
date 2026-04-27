import { z } from 'zod'

export const createIncidentSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().optional(),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  service: z.string().min(1, 'Please select a service'),
  assigneeId: z.string().optional(),
})

export type CreateIncidentFormData = z.infer<typeof createIncidentSchema>
