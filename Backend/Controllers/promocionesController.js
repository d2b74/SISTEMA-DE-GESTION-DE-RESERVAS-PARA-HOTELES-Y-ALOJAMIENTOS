import { promocionModel } from "../Models/promocionModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {validatePromocion,validatePartialPromocion} from "../schemas/promocion.js";

export class promocionController {
  // Listar todas las promociones
  static getPromociones = async (req, res) => {
    const promos = await promocionModel.getPromociones();
    res.status(200).json(promos);
  };

  // Obtener una promoción por ID
  static getPromocionById = async (req, res) => {
    const promo = await promocionModel.getPromocionById(req.params.id);
    if (promo) {
      res.status(200).json(promo);
    } else {
      res.status(404).json({ message: "Promoción no encontrada" });
    }
  };

  // Crear una nueva promoción
  static createPromocion = async (req, res) => {
    const data = req.body;
    const parsed = validatePromocion(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const result = await promocionModel.createPromocion(parsed.data);
    res.status(201).json(result);
  };

  // Actualizar una promoción
  static updatePromocion = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const parsed = validatePartialPromocion(data);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.errors });
    }
    const affected = await promocionModel.updatePromocion(parsed.data, id);
    if (affected > 0) {
      res.status(200).json({ message: "Promoción actualizada" });
    } else {
      res.status(404).json({ message: "Promoción no encontrada" });
    }
  };

  // Eliminar una promoción
  static deletePromocion = async (req, res) => {
    const id = req.params.id;
    const affected = await promocionModel.deletePromocion(id);
    if (affected > 0) {
      res.status(200).json({ message: "Promoción eliminada" });
    } else {
      res.status(404).json({ message: "Promoción no encontrada" });
    }
  };
}

export const Promocion = {
  getPromociones: asyncHandler(promocionController.getPromociones),
  getPromocionById: asyncHandler(promocionController.getPromocionById),
  createPromocion: asyncHandler(promocionController.createPromocion),
  updatePromocion: asyncHandler(promocionController.updatePromocion),
  deletePromocion: asyncHandler(promocionController.deletePromocion),
};
