import { checkinModel } from "../Models/checkinModel.js"; // Importar el modelo de check-in
import { asyncHandler } from "../utils/asyncHandler.js"; // Importar el manejador de errores asíncronos
import { validateCheckin, validatePartialCheckin } from "../schemas/checkin.js"; // Importar los esquemas de validación

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
    const checkin = req.body.checkin;
    const checkinValid = validateCheckin(checkin);
    if (!checkinValid.success) {
  return res.status(400).json({ message: checkinValid.error.errors });
  }
    const result = await checkinModel.createCheckin(checkinValid.data);
    res.status(201).json(result);
  };

  // Actualizar un check-in
  static updateCheckin = async (req, res) => {
    const id = req.params.id;
    const checkin = req.body.checkin;
    const checkinValid = validatePartialCheckin(checkin);
     if (!checkinValid.success) {
  return res.status(400).json({ message: checkinValid.error.errors });
  }
    const result = await checkinModel.updateCheckin(id, checkinValid.data);
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


//la reserva debe existir y que el estado sea
//falta cambiar la tabla de check-in guarde hora y fecha
//falta controlador check-out 
// hacer endpoint de usuarios (login-logout)
//endpoint temporada 
//endpoint de encuestas
//endpoint de reportes
//endpoint de promocion para que aplique a las tarifas
//cambi