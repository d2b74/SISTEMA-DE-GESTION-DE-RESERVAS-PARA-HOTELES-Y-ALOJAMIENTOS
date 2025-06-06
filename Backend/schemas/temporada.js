// schemas/temporada.js
import { z } from "zod";

export const temporadaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  precio: z.number().positive("El precio debe ser un número positivo")
});

export const partialTemporadaSchema = temporadaSchema.partial();

export function validateTemporada(data) {
  return temporadaSchema.safeParse(data);
}

export function validatePartialTemporada(data) {
  return partialTemporadaSchema.safeParse(data);
}
