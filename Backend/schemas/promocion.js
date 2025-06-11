// schemas/promocion.js
import { z } from "zod";

export const promocionSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  precio: z.number().positive("El precio debe ser un número positivo")
});

export const partialPromocionSchema = promocionSchema.partial();

export function validatePromocion(data) {
  return promocionSchema.safeParse(data);
}

export function validatePartialPromocion(data) {
  return partialPromocionSchema.safeParse(data);
}
