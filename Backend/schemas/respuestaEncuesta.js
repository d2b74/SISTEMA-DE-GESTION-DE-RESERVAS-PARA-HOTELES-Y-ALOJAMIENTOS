import { z } from "zod";

export const responderEncuestaSchema = z.object({
  id_encuesta: z.number(),
  respuestas: z.array(
    z.object({
      id_pregunta: z.number(),
      respuesta: z.string().max(1000)
    })
  )
});
