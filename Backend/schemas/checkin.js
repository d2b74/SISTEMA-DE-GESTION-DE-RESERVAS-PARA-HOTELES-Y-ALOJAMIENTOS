import { z } from "zod";

export const checkinSchema = z.object({
  id_reserva: z.number().int().positive("ID de reserva inválido"),
  descripcion: z.string().optional(),
  usuario: z.boolean({
    required_error: "Se debe indicar si es usuario",
    invalid_type_error: "Debe ser un valor booleano (true/false)",
  }),
  hora: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Fecha y hora inválidas",
  }),
});

export function validateCheckin(data) {
  return checkinSchema.safeParse(data);
}

export function validatePartialCheckin(data) {
  return checkinSchema.partial().safeParse(data);
}
