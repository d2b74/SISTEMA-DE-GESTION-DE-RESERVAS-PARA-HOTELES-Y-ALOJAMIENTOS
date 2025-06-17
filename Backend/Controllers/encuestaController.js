import { encuestaModel } from "../Models/encuestaModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  validateEncuesta,
  validatePartialEncuesta,
} from "../schemas/encuesta.js";

export class encuestaController {
  static getEncuestas = async (req, res) => {
    const items = await encuestaModel.getEncuestas();
    res.status(200).json(items);
  };

  static getEncuestaById = async (req, res) => {
    const item = await encuestaModel.getEncuestaById(req.params.id);
    if (item) res.status(200).json(item);
    else res.status(404).json({ message: "Encuesta no encontrada" });
  };

  static createEncuesta = async (req, res) => {
    const data = req.body.encuesta;
    const parsed = validateEncuesta(data);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.errors });

    const result = await encuestaModel.createEncuesta(parsed.data);
    res.status(201).json(result);
  };

  static updateEncuesta = async (req, res) => {
    const id = req.params.id;
    const data = req.body.encuesta;
    const parsed = validatePartialEncuesta(data);
    if (!parsed.success)
      return res.status(400).json({ errors: parsed.error.errors });

    const ok = await encuestaModel.updateEncuesta(parsed.data, id);
    if (ok) res.status(200).json({ message: "Encuesta actualizada" });
    else res.status(404).json({ message: "Encuesta no encontrada" });
  };

 /* static deleteEncuesta = async (req, res) => {
    const id = req.params.id;
    const del = await encuestaModel.deleteEncuesta(id);
    if (del > 0) res.status(200).json({ message: "Encuesta eliminada" });
    else res.status(404).json({ message: "Encuesta no encontrada" });
  };*///se debe eliminar la encuesta y sus respuestas asociadas
}

export const Encuesta = {
  getEncuestas: asyncHandler(encuestaController.getEncuestas),
  getEncuestaById: asyncHandler(encuestaController.getEncuestaById),
  createEncuesta: asyncHandler(encuestaController.createEncuesta),
  updateEncuesta: asyncHandler(encuestaController.updateEncuesta),
  deleteEncuesta: asyncHandler(encuestaController.deleteEncuesta),
};
