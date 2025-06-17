import { Router } from "express";
import { Pregunta } from "../Controllers/preguntaController.js";

const preguntasRouter = Router();

preguntasRouter.get("/", Pregunta.getPreguntas);
preguntasRouter.get("/:id", Pregunta.getPreguntaById);
preguntasRouter.post("/", Pregunta.createPregunta);
preguntasRouter.put("/:id", Pregunta.updatePregunta);
preguntasRouter.delete("/:id", Pregunta.deletePregunta);

export default preguntasRouter;