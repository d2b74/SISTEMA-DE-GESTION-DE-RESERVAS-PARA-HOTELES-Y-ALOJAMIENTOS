//paso 2crear habitacionesRoutes
import { Router } from "express";
//paso 8 importar el controlador de habitaciones primero controlador de habitaciones que se comunica con el modelo de habitaciones
import { Habitacion } from "../Controllers/habitacionesControllers.js"; // Importar el controlador de habitaciones


//creo el router y lo guardo en una variable get post put y delete 
const habitacionesRouter = Router();
//paso 
habitacionesRouter.get('/', Habitacion.getHabitaciones); //para obtener todas las habitaciones
habitacionesRouter.get('/:id', Habitacion.getHabitacionById); //para obtener la habitación por id
habitacionesRouter.post('/', Habitacion.createHabitacion); //para crear una habitación
habitacionesRouter.put('/:id', Habitacion.updateHabitacion); //para actualizar una habitación
habitacionesRouter.delete('/:id', Habitacion.deleteHabitacion); //para eliminar una habitación
//paso3 Exporto el router para que pueda ser utilizado en otras partes de la aplicación
export default habitacionesRouter;
