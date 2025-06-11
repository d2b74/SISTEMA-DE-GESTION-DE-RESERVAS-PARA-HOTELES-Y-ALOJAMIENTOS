import { Router } from "express";
// Importar el controlador de promociones
import { Promocion } from "../Controllers/promocionesController.js"; // Importar el controlador de promociones todavia no lo tengo

const promocionesRouter = Router();
// Definir las rutas para las promociones
promocionesRouter.get('/', Promocion.getPromociones); // Obtener todas las promociones
promocionesRouter.get('/:id', Promocion.getPromocionById); // Obtener una promoción por ID
promocionesRouter.post('/', Promocion.createPromocion); // Crear una nueva promoción
promocionesRouter.put('/:id', Promocion.updatePromocion); // Actualizar una promoción por ID
promocionesRouter.delete('/:id', Promocion.deletePromocion); // Eliminar una promoción por ID
// Exportar el router de promociones
export default promocionesRouter;