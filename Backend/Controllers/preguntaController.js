import { preguntaModel } from "../Models/preguntaModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validatePregunta, validatePartialPregunta } from "../schemas/pregunta.js";

export class preguntaController {
  static getPreguntas = async (req, res) => {
    const items = await preguntaModel.getPreguntas();
    res.status(200).json(items);
  };

  static getPreguntaById = async (req, res) => {
    const item = await preguntaModel.getPreguntaById(req.params.id);
    if (item) res.status(200).json(item);
    else res.status(404).json({ message: "Pregunta no encontrada" });
  };

  static createPregunta = async (req, res) => {
    const data = req.body.pregunta;
    const parsed = validatePregunta(data);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });
    const result = await preguntaModel.createPregunta(parsed.data);
    res.status(201).json(result);
  };

  static updatePregunta = async (req, res) => {
    const id = req.params.id;
    const data = req.body.pregunta;
    const parsed = validatePartialPregunta(data);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.errors });
    const affected = await preguntaModel.updatePregunta(parsed.data, id);
    if (affected > 0) res.status(200).json({ message: "Pregunta actualizada" });
    else res.status(404).json({ message: "Pregunta no encontrada" });
  };

  static deletePregunta = async (req, res) => {
    const id = req.params.id;
    const affected = await preguntaModel.deletePregunta(id);
    if (affected > 0) res.status(200).json({ message: "Pregunta eliminada" });
    else res.status(404).json({ message: "Pregunta no encontrada" });
  };
}

export const Pregunta = {
  getPreguntas: asyncHandler(preguntaController.getPreguntas),
  getPreguntaById: asyncHandler(preguntaController.getPreguntaById),
  createPregunta: asyncHandler(preguntaController.createPregunta),
  updatePregunta: asyncHandler(preguntaController.updatePregunta),
  deletePregunta: asyncHandler(preguntaController.deletePregunta)
};
