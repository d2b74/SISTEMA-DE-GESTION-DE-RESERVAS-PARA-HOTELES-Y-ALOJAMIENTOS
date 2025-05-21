import { Router } from "express";
import { Checkin } from "../Controllers/checkinController.js"; // Importar el controlador de check-in
const checkinRouter = Router();

checkinRouter.get('/',Checkin.getCheckins)//para obtener todas las reservas
checkinRouter.get('/:id',Checkin.getCheckinById)//para obtener la reserva por id
checkinRouter.post('/', Checkin.createCheckin)//para crear una reserva
checkinRouter.put('/:id',Checkin.updateCheckin)//para actualizar una reserva
checkinRouter.delete('/:id',Checkin.deleteCheckin)//para eliminar una reserva

export default checkinRouter;
