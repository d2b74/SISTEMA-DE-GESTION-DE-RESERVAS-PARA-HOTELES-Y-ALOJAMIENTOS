import { z } from "zod";

const mysqlDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const mysqlTimeRegex = /^\d{2}:\d{2}:\d{2}$/;

export const checkinSchema = z.object({
  id_reserva: z
    .number()
    .int()
    .positive("ID de reserva inválido"),
  
  descripcion: z
    .string()
    .optional(),
  
  usuario: z
    .number()
    .int()
    .positive("ID de usuario inválido"),

  
  fecha: z
    .string()
    .regex(mysqlDateRegex, "Formato de fecha inválido, debe ser YYYY-MM-DD"),
  
  hora: z
    .string()
    .regex(mysqlTimeRegex, "Formato de hora inválido, debe ser HH:mm:ss")
});

export function validateCheckin(data) {
  return checkinSchema.safeParse(data);
}

export function validatePartialCheckin(data) {
  return checkinSchema.partial().safeParse(data);
}
