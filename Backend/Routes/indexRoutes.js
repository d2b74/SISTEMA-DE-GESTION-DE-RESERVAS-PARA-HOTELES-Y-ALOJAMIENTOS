//Archivo principal de las rutas
//Este archivo se encarga de importar todas las rutas y exportarlas para que puedan ser utilizadas en otras partes de la aplicación.
import { Router } from "express";
import reservaRouter from "./reservaRoutes.js";
import checkinRouter from "./check-inRoutes.js";
import tempodasRouter from "./temporadasRoutes.js"; // Importar el router de temporadas
//paso 4 importar el router de habitaciones
import habitacionesRouter from "./habitacionesRoutes.js";
import promocionesRouter from "./promocionesRoutes.js"; // Importar el router de promociones
import checkoutRouter from "./check-outRoutes.js"; // Importar el router de check-out
import encuestasRouter from "./encuestasRoutes.js";
import preguntasRouter from "./preguntaRoutes.js"; // Importar el router de preguntas
import webhookRouter from "./webhookRoutes.js" // Importar el router de webhooks
// Importar el router de check-out
import usuariosRouter from "./usuariosRoutes.js"; 
const router = Router();

//Renderiza pagina el login como home 
router.get('/', (req, res, next) => {res.send('Home')})

//Renderiza pagina el login como home 
router.use('/Reserva', reservaRouter)
router.use('/webhook', webhookRouter) // Usar el router de webhooks

router.use('/Check-in', checkinRouter)
//paso1 crear el router
router.use('/Habitaciones', habitacionesRouter)

router.use('/Temporadas', tempodasRouter) // Usar el router de temporadas

router.use('/Promociones',promocionesRouter) // Usar el router de promociones
router.use('/Usuarios', usuariosRouter);
router.use('/Check-out',checkoutRouter) // Usar el router de check-out

router.use('/Encuestas', encuestasRouter); // Usar el router de encuestas

router.use('/Preguntas', preguntasRouter); // Usar el router de preguntas

//visualiza 404 con cualquier ruta no definida
router.use((req, res, next) => {
  return res.status(404).send('404 Página no encontrada');
});
export default router;