import { reservaModel } from "../Models/reservaModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {validateReserva, validatePartialReserva } from "../schemas/reserva.js"; 



export class reservaController {
    // Obtener todas las reservas
    static getReservas = async (req, res) => {
        const reservas = await reservaModel.getReservas();
        res.status(200).json(reservas);
    };

    // Obtener una reserva por ID
    static getReservaId = async (req, res) => {
        const reserva = await reservaModel.getReservaId(req.params.id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };

    // Crear una reserva
    static createReservaHandler = async (req, res) => {
        const reserva = req.body.reserva;
        const  reservaValid = validateReserva(reserva);
         if (!reservaValid.success) {
            return res.status(400).json({ message: reservaValid.error.errors });
        }     
        const result = await reservaModel.createReserva(reservaValid.data);
        res.status(201).json(result);
    };

    // Actualizar una reserva
    static updateReserva = async (req, res) => {
        const id = req.params.id;
        const reserva = req.body.reserva;
        const reservaValid = validatePartialReserva(reserva);
        if (!reservaValid.success) {
            return res.status(400).json({ message: reservaValid.error.errors });
        }
        const affectedRows = await reservaModel.updateReserva(reservaValid.data, id);
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Reserva actualizada' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };

    // Eliminar una reserva
    static deleteReserva = async (req, res) => {
        const id = req.params.id;
        const response = await reservaModel.deleteReserva(id);
        if (response > 0) {
            res.status(200).json({ message: 'Reserva eliminada' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    };
}

// Exportar con asyncHandler
export const Reserva = {
    getReservas: asyncHandler(reservaController.getReservas),
    getReservaId: asyncHandler(reservaController.getReservaId),
    createReservaHandler: asyncHandler(reservaController.createReservaHandler),
    updateReserva: asyncHandler(reservaController.updateReserva),
    deleteReserva: asyncHandler(reservaController.deleteReserva),
};
/* to-do list
1. Al insertar nueva reserva del usuario:
No se verifica si el huesped existe en la base de datos
ver si el id del huesped existe 
Tipo de habitación deseada 

Fechas de entrada y salida
que las fechas sean correctas , la salida posterior a la entrada

Cantidad de habitaciones cargar la tabla con los datos 

Otros datos (cliente, servicios, etc.) servicios extras si se eligieron hay que agregarlos

2. Validaciones iniciales:
Verificar que las fechas sean válidas (fecha_fin > fecha_inicio)

Verificar que las fechas no estén en el pasado

Verificar que el tipo de habitación exista

3. Buscar disponibilidad:
Obtener todas las habitaciones activas del tipo solicitado
(ej: todas las “dobles”)

Filtrar esas habitaciones para ver cuáles están ocupadas en el rango solicitado
(comparar contra reservas existentes en Reserva unidas con reserva_habitacion)

Identificar las habitaciones libres
(todas menos las ocupadas en ese rango)

Verificar si hay suficientes habitaciones libres para cubrir la solicitud
(si pidió 2 habitaciones, por ejemplo)

4. Si hay disponibilidad:
Crear la reserva en la tabla Reserva
(fecha_inicio, fecha_fin, cliente, etc.)

Enlazar las habitaciones elegidas con esa reserva en la tabla intermedia reserva_habitacion
(con los IDs de la reserva y las habitaciones)

5. Confirmar y responder al usuario:
Mostrar mensaje de éxito con el ID de la reserva y detalles

O bien error en caso de que no haya disponibilidad

 */