import { z } from 'zod'

export const habitacionSchema = z.object({
  numero: z.number(),
  estado: z.number(),
  tipo: z.number(),
  precio: z.number(),
  descripcion: z.string()
})

export const habitacionUpdateSchema = habitacionSchema.partial()