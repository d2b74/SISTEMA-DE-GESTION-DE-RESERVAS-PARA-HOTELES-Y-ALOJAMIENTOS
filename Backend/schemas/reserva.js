import { z } from "zod";

export const reservaSchema = z.object({
  id_huesped: z.number().int().positive("ID del huésped inválido"),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }),
  fecha_fin: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }),
  estado: z.number().int().positive("Estado de reserva inválido"),
});

export function validateReserva(data) {
  return reservaSchema.safeParse(data);
}

export function validatePartialReserva(data) {
  return reservaSchema.partial().safeParse(data);
}
