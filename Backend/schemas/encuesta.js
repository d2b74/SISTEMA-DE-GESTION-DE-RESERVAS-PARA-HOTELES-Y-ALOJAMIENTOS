/*import { z } from "zod";
export const crearEncuestaSchema = z.object({
  id_reserva: z.number(),
  id_huesped: z.number(),
  fecha: z.string(), // formato ISO
  preguntas: z.array(
    z.object({
      id_pregunta: z.number()
    })
  )
});*/

import { z } from "zod";

// Validación de una sola respuesta
export const respuestaEncuestaSchema = z.object({
  id_pregunta: z.number().int().positive("ID de pregunta inválido"),
  respuesta: z.string().min(1, "La respuesta no puede estar vacía")
});

// Validación de la encuesta completa
export const encuestaSchema = z.object({
  id_reserva: z.number().int().positive("ID de reserva inválido"),
  id_huesped: z.number().int().positive("ID de huésped inválido"),
  fecha: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Fecha inválida, usar YYYY-MM-DD"
  }),
  respuestas: z.array(respuestaEncuestaSchema).min(1, "Debe haber al menos una respuesta")
});

export const partialEncuestaSchema = encuestaSchema.partial({ respuestas: true });

export function validateEncuesta(data) {
  return encuestaSchema.safeParse(data);
}

export function validatePartialEncuesta(data) {
  return partialEncuestaSchema.safeParse(data);
}
