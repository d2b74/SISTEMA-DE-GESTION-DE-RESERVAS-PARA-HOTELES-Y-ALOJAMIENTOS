import { z } from "zod";

const mysqlDatetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const reservaSchema = z.object({
  id_huesped: z.number().int().positive("ID del huésped inválido"),
  fecha_fin: z.string().regex(mysqlDatetimeRegex, {
    message: "Formato de fecha y hora inválido. Debe ser YYYY-MM-DD HH:mm:ss",
  }),ha_fin: z.string().regex(mysqlDatetimeRegex, {
    message: "Formato de fecha y hora inválido. Debe ser YYYY-MM-DD HH:mm:ss",
  }),
  estado: z.number().int().positive("Estado de reserva inválido"),
});

export function validateReserva(data) {
  return reservaSchema.safeParse(data);
}

export function validatePartialReserva(data) {
  return reservaSchema.partial().safeParse(data);
}
