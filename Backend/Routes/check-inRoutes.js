import { Router } from "express";
const checkinRouter = Router();

checkinRouter.get('/', (req, res) => {res.send('Check-in')})//para obtener todas las reservas
checkinRouter.get('/:id', (req, res) => {res.send('Check-in por id '+req.params.id)})//para obtener la reserva por id
checkinRouter.post('/', (req, res) => {res.send('Check-in creado')})//para crear una reserva
checkinRouter.put('/:id', (req, res) => {res.send('Check-in actualizado')})//para actualizar una reserva
checkinRouter.delete('/:id', (req, res) => {res.send('Check-in eliminado')})//para eliminar una reserva

export default checkinRouter;
