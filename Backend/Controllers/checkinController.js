import { checkinModel } from "../Models/checkinModel.js"; // Importar el modelo de check-in
import { asyncHandler } from "../utils/asyncHandler.js"; // Importar el manejador de errores asíncronos

export class checkinController {
  // Obtener todos los check-ins
  static getCheckins = async (req, res) => {
    const checkins = await checkinModel.getCheckins();
    res.status(200).json(checkins);
  };

  // Obtener un check-in por ID
  static getCheckinById = async (req, res) => {
    const checkin = await checkinModel.getCheckinById(req.params.id);
    if (checkin) {
      res.status(200).json(checkin);
    } else {
      res.status(404).json({ message: "Check-in no encontrado" });
    }
  };

  // Crear un check-in
  static createCheckin = async (req, res) => {
    const data = req.body;
    const result = await checkinModel.createCheckin(data);
    res.status(201).json(result);
  };

  // Actualizar un check-in
  static updateCheckin = async (req, res) => {
    const id = req.params.id;
    const result = await checkinModel.updateCheckin(id, req.body);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Check-in actualizado" });
    } else {
      res.status(404).json({ message: "Check-in no encontrado" });
    }
  };

  // Eliminar un check-in
  static deleteCheckin = async (req, res) => {
    const result = await checkinModel.deleteCheckin(req.params.id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Check-in eliminado" });
    } else {
      res.status(404).json({ message: "Check-in no encontrado" });
    }
  };
}

export const Checkin = {
  getCheckins: asyncHandler(checkinController.getCheckins),
  getCheckinById: asyncHandler(checkinController.getCheckinById),
  createCheckin: asyncHandler(checkinController.createCheckin),
  updateCheckin: asyncHandler(checkinController.updateCheckin),
  deleteCheckin: asyncHandler(checkinController.deleteCheckin),
};
