import { temporadaModel } from "../Models/temporadaModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {validateTemporada,validatePartialTemporada,} from "../schemas/temporada.js"; // ← Importa tus validadores

export class temporadaController {
  // Listar todas las temporadas
  static getTemporadas = async (req, res) => {
    const temporadas = await temporadaModel.getTemporadas();
    res.status(200).json(temporadas);
  };

  // Obtener una temporada por ID
  static getTemporadaById = async (req, res) => {
    const temporada = await temporadaModel.getTemporadaById(req.params.id);
    if (temporada) {
      res.status(200).json(temporada);
    } else {
      res.status(404).json({ message: "Temporada no encontrada" });
    }
  };

  // Crear una temporada
  static createTemporada = async (req, res) => {
    const data = req.body; // ahora tomamos todo el body
    const parsed = validateTemporada(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const result = await temporadaModel.createTemporada(parsed.data);
    res.status(201).json(result);
  };

  // Actualizar una temporada
  static updateTemporada = async (req, res) => {
    const id = req.params.id;
    const data = req.body; // idem, todo el body
    const parsed = validatePartialTemporada(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const affected = await temporadaModel.updateTemporada(parsed.data, id);
    if (affected > 0) {
      res.status(200).json({ message: "Temporada actualizada" });
    } else {
      res.status(404).json({ message: "Temporada no encontrada" });
    }
  };

  // Eliminar una temporada
  static deleteTemporada = async (req, res) => {
    const id = req.params.id;
    const affected = await temporadaModel.deleteTemporada(id);
    if (affected > 0) {
      res.status(200).json({ message: "Temporada eliminada" });
    } else {
      res.status(404).json({ message: "Temporada no encontrada" });
    }
  };
}

export const Temporada = {
  getTemporadas: asyncHandler(temporadaController.getTemporadas),
  getTemporadaById: asyncHandler(temporadaController.getTemporadaById),
  createTemporada: asyncHandler(temporadaController.createTemporada),
  updateTemporada: asyncHandler(temporadaController.updateTemporada),
  deleteTemporada: asyncHandler(temporadaController.deleteTemporada),
};
