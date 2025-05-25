//paso 6 crear el controlador de habitaciones
import { habitacionModel } from "../Models/habitacionesModel.js"; // Importar el modelo de habitaciones
import { asyncHandler } from "../utils/asyncHandler.js"; // Importar el manejador de errores async
import { validateHabitacion, validatePartialHabitacion } from "../schemas/habitacion.js"; // Importar el esquema de validación de habitaciones

export class habitacionController {
  // Obtener todas las habitaciones
  static getHabitaciones = async (req, res) => {
    const habitaciones = await habitacionModel.getHabitaciones();
    res.status(200).json(habitaciones);
  };

  // Obtener una habitación por ID
  static getHabitacionById = async (req, res) => {
    const habitacion = await habitacionModel.getHabitacionById(req.params.id);
    if (habitacion) {
      res.status(200).json(habitacion);
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  };

  // Crear una habitación
  static createHabitacion = async (req, res) => {
    const habitacion = req.body.habitacion;
    // Validar el cuerpo de la solicitud
    const havitacionValid = validateHabitacion(habitacion);
    if (!havitacionValid.success) {
      return res.status(400).json({ errors: havitacionValid.error.errors });
    }
    const result = await habitacionModel.createHabitacion(havitacionValid.data);
    res.status(201).json(result);
  };

  // Actualizar una habitación
  static updateHabitacion = async (req, res) => {
    const id = req.params.id;
    const habitacion = req.body.habitacion;
    // Validar el cuerpo de la solicitud
    const habitacionValid = validatePartialHabitacion(habitacion);
    if (!habitacionValid.success) {
      return res.status(400).json({ errors: habitacionValid.error.errors });
    }
    const result = await habitacionModel.updateHabitacion(id, habitacionValid.data);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Habitación actualizada" });
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  };

  // Eliminar una habitación
  static deleteHabitacion = async (req, res) => {
    const result = await habitacionModel.deleteHabitacion(req.params.id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Habitación eliminada" });
    } else {
      res.status(404).json({ message: "Habitación no encontrada" });
    }
  };
}

// Exportar funciones con manejo de errores async
export const Habitacion = {
  getHabitaciones: asyncHandler(habitacionController.getHabitaciones),
  getHabitacionById: asyncHandler(habitacionController.getHabitacionById),
  createHabitacion: asyncHandler(habitacionController.createHabitacion),
  updateHabitacion: asyncHandler(habitacionController.updateHabitacion),
  deleteHabitacion: asyncHandler(habitacionController.deleteHabitacion),
};
