import { Router } from "express";
import { Encuesta } from "../Controllers/encuestaController.js";

const encuestasRouter = Router();

encuestasRouter.get("/preguntas", Encuesta.getPreguntas);
encuestasRouter.get('/opciones-pregunta', Encuesta.getOpcionesPorPregunta);
encuestasRouter.get("/", Encuesta.getEncuestas);
encuestasRouter.get("/:id", Encuesta.getEncuestaById);
encuestasRouter.post("/", Encuesta.createEncuesta);
encuestasRouter.put("/:id", Encuesta.updateEncuesta);
encuestasRouter.delete("/:id", Encuesta.deleteEncuesta);
export default encuestasRouter;
