import { Router } from "express";
//import { BookingController } from "../Controllers/canales/bookingController.js";

//aca van las rutas de los webhooks para recibir reservas de OTAs 

const webhookRouter = Router();

// Ruta para recibir reservas desde Booking
//webhookRouter.post('/booking', BookingController.recibirReservaDesdeBooking);

export default webhookRouter;
