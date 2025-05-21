import { z } from "zod";

export const preguntaSchema = z.object({
  titulo: z.string().max(255),
  descripcion: z.string().max(1000)
});
