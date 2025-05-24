//Archivo principal de las rutas
//Este archivo se encarga de importar todas las rutas y exportarlas para que puedan ser utilizadas en otras partes de la aplicación.
import { Router } from "express";
import reservaRouter from "./reservaRoutes.js";
import checkinRouter from "./check-inRoutes.js";
//paso 4 importar el router de habitaciones
import habitacionesRouter from "./habitacionesRoutes.js";

const router = Router();


//Renderiza pagina el login como home 
router.get('/', (req, res, next) => {res.send('Home')})

//Renderiza pagina el login como home 
router.use('/Reserva', reservaRouter)

router.use('/Check-in', checkinRouter)
//paso1 crear el router
router.use('/Habitaciones', habitacionesRouter)



//visualiza 404 con cualquier ruta no definida
router.use((req, res, next) => {
  return res.status(404).send('404 Página no encontrada');
});
export default router;