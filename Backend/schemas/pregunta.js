import { z } from "zod";

export const preguntaSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().optional()
});

export const partialPreguntaSchema = preguntaSchema.partial();

export function validatePregunta(data) {
  return preguntaSchema.safeParse(data);
}

export function validatePartialPregunta(data) {
  return partialPreguntaSchema.safeParse(data);
}