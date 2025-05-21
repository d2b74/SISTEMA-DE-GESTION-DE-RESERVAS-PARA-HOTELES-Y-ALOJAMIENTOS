import { z } from 'zod'

export const usuarioSchema = z.object({
  nombre: z.string().min(1),
  apellido: z.string().min(1),
  dni: z.string().min(5),
  mail: z.string().email(),
  telefono: z.string().min(5),
  contrasena: z.string().min(6),
  tipo: z.boolean()
})

export const usuarioUpdateSchema = usuarioSchema.partial()