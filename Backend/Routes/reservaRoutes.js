//rutas para la reserva
import { Router } from "express";
import { Reserva } from "../Controllers/reservaController.js"; // Importar el controlador de reservas
const reservaRouter = Router();

reservaRouter.get('/',Reserva.getReservas)//para obtener todas las reservas
reservaRouter.get('/huesped/:id',Reserva.getReservasPorHuesped)//para obtener las reservas por huesped
reservaRouter.get('/:id',Reserva.getReservaId)//para obtener la reserva por id
reservaRouter.post('/',Reserva.createReservaHandler)//para crear una reserva
reservaRouter.put('/:id',Reserva.updateReserva)//para actualizar una reserva
reservaRouter.delete('/:id', Reserva.deleteReserva)//para eliminar una reserva

export default reservaRouter;
