import { z } from "zod";

const mysqlDatetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const checkinSchema = z.object({
  id_reserva: z.number().int().positive("ID de reserva inválido"),
  descripcion: z.string().optional(),
  usuario: z.boolean({
    required_error: "Se debe indicar si es usuario",
    invalid_type_error: "Debe ser un valor booleano (true/false)",
  }),
  hora: z.string()
    .regex(mysqlDatetimeRegex, "Formato de fecha y hora inválido, debe ser YYYY-MM-DD HH:mm:ss"),
});

export function validateCheckin(data) {
  return checkinSchema.safeParse(data);
}

export function validatePartialCheckin(data) {
  return checkinSchema.partial().safeParse(data);
}
