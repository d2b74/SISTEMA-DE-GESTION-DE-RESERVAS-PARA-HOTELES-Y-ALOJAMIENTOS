import { Router } from "express";
import { Temporada } from "../Controllers/temporadaControllers.js"; // Importar el controlador de temporadas 
const temporadasRouter = Router();
// Definir las rutas para las temporadas
temporadasRouter.get('/', Temporada.getTemporadas); // Obtener todas las temporadas  
temporadasRouter.get('/:id', Temporada.getTemporadaById); // Obtener una temporada por ID
temporadasRouter.post('/', Temporada.createTemporada); // Crear una nueva temporada
temporadasRouter.put('/:id', Temporada.updateTemporada); // Actualizar una temporada existente  
temporadasRouter.delete('/:id', Temporada.deleteTemporada); // Eliminar una temporada

export default temporadasRouter;
