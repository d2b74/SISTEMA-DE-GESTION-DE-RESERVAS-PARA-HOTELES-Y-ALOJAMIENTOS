//rutas para la reserva
import { Router } from "express";
const reservaRouter = Router();

reservaRouter.get('/', (req, res) => {res.send('Reserva')})//para obtener todas las reservas
reservaRouter.get('/:id', (req, res) => {res.send('Reserva por id '+req.params.id)})//para obtener la reserva por id
reservaRouter.post('/', (req, res) => {res.send('Reserva creada')})//para crear una reserva
reservaRouter.put('/:id', (req, res) => {res.send('Reserva actualizada')})//para actualizar una reserva
reservaRouter.delete('/:id', (req, res) => {res.send('Reserva eliminada')})//para eliminar una reserva

export default reservaRouter;
