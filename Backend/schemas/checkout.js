import { z } from "zod";

const mysqlDateRegex = /^\d{4}-\d{2}-\d{2}$/;
const mysqlTimeRegex = /^\d{2}:\d{2}:\d{2}$/;

export const checkoutSchema = z.object({
  id_reserva: z
    .number()
    .int()
    .positive("ID de reserva inválido"),
  
  descripcion: z
    .string()
    .optional(),
  
  usuario: z
    .boolean({
      required_error: "Se debe indicar si es usuario",
      invalid_type_error: "Debe ser un valor booleano (true/false)"
    }),
  
  fecha: z
    .string()
    .regex(mysqlDateRegex, "Formato de fecha inválido, debe ser YYYY-MM-DD"),
  
  hora: z
    .string()
    .regex(mysqlTimeRegex, "Formato de hora inválido, debe ser HH:mm:ss")
});

export function validateCheckout(data) {
  return checkoutSchema.safeParse(data);
}

export function validatePartialCheckout(data) {
  return checkoutSchema.partial().safeParse(data);
}
