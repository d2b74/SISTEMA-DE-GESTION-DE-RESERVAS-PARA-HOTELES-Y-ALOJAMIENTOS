import { reservaModel } from "../Models/reservaModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class reservaController {
    // Obtener todas las reservas
    static getReservas = async (req, res) => {
        const reservas = await reservaModel.getReservas();
        res.status(200).json(reservas);
    };

    // Obtener una reserva por ID
    static getReservaId = async (req, res) => {
        const reserva = await reservaModel.getReservaId(req.params.id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };

    // Crear una reserva
    static createReservaHandler = async (req, res) => {
        const result = await reservaModel.createReserva(req.body);
        res.status(201).json(result);
    };

    // Actualizar una reserva
    static updateReserva = async (req, res) => {
        const id = req.params.id;
        const affectedRows = await reservaModel.updateReserva(req.body, id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Reserva actualizada' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };

    // Eliminar una reserva
    static deleteReserva = async (req, res) => {
        const id = req.params.id;
        const response = await reservaModel.deleteReserva(id);
        if (response > 0) {
            res.status(200).json({ message: 'Reserva eliminada' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };
}

// Exportar con asyncHandler
export const Reserva = {
    getReservas: asyncHandler(reservaController.getReservas),
    getReservaId: asyncHandler(reservaController.getReservaId),
    createReservaHandler: asyncHandler(reservaController.createReservaHandler),
    updateReserva: asyncHandler(reservaController.updateReserva),
    deleteReserva: asyncHandler(reservaController.deleteReserva),
};
