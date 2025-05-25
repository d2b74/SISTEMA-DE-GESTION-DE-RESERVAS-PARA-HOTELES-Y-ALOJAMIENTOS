import { z } from "zod";

export const habitacionSchema = z.object({
  numero: z.number({
    required_error: "El número de habitación es requerido",
    invalid_type_error: "El número debe ser un valor numérico",
  }),
  estado: z.number({
    required_error: "El estado es requerido",
    invalid_type_error: "El estado debe ser un valor numérico",
  }),
  tipo: z.number({
    required_error: "El tipo es requerido",
    invalid_type_error: "El tipo debe ser un valor numérico",
  }),
  precio: z.number({
    required_error: "El precio es requerido",
    invalid_type_error: "El precio debe ser un valor numérico",
  }),
  descripcion: z.string({
    required_error: "La descripción es requerida",
    invalid_type_error: "La descripción debe ser una cadena de texto",
  }),
});

export function validateHabitacion(data) {
  return habitacionSchema.safeParse(data);
}

export function validatePartialHabitacion(data) {
  return habitacionSchema.partial().safeParse(data);
}
