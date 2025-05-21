import { z } from "zod";

export const crearEncuestaSchema = z.object({
  id_reserva: z.number(),
  id_huesped: z.number(),
  fecha: z.string(), // formato ISO
  preguntas: z.array(
    z.object({
      id_pregunta: z.number()
    })
  )
});
