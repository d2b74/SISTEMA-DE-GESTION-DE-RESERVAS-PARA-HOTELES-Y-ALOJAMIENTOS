import { z } from "zod";

// Regex que acepta sólo “YYYY-MM-DD” (fecha sin hora)
const mysqlDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const reservaSchema = z.object({
  id_huesped: z.number().int().positive("ID del huésped inválido"),

  fecha_inicio: z.string().regex(mysqlDateRegex, {
    message: "Formato de fecha inválido. Debe ser YYYY-MM-DD",
  }),

  fecha_fin: z.string().regex(mysqlDateRegex, {
    message: "Formato de fecha inválido. Debe ser YYYY-MM-DD",
  }),

  estado: z.number().int().positive("Estado de reserva inválido"),

  habitaciones: z
    .array(z.number().int().positive("ID de habitación inválido"))
    .optional(), // quitar .optional() si debe llevar al menos una

  personas: z.number().int().positive(),
  
});

export function validateReserva(data) {
  return reservaSchema.safeParse(data);
}

export function validatePartialReserva(data) {
  return reservaSchema.partial().safeParse(data);
}
// Nuevo esquema SOLO para actualizaciones (requiere habitaciones)
const reservaUpdateSchema = reservaSchema.extend({
  habitaciones: z
    .array(z.number().int().positive("ID de habitación inválido"))
});

export function validateUpdateReserva(data) {
  return reservaUpdateSchema.safeParse(data);
}
