// Controlador para manejar integración con Booking.com 

import { procesarReservaExterna } from '../../services/reservaProcessor.js';
import { adaptarReservaBooking } from '../../chanells/adapters/bookingAdapter.js';
import { enviarDisponibilidad, cancelarReservaEnBooking, confirmarReservaEnBooking } from '../../chanells/apis/bookingAPI.js';

export class BookingController {
    // Recibir una reserva desde Booking (Webhook entrante)
    static async recibirReservaDesdeBooking(req, res) {
        try {
            const datosExternos = req.body;

            const reservaAdaptada = adaptarReservaBooking(datosExternos);
            const resultado = await procesarReservaExterna(reservaAdaptada, 'booking');

            return res.status(200).json({ message: 'Reserva procesada correctamente', data: resultado });
        } catch (error) {
            console.error('Error al recibir reserva desde Booking:', error);
            return res.status(500).json({ message: 'Error al procesar la reserva externa' });
        }
    }

    // Enviar disponibilidad a Booking
    static async enviarDisponibilidadHandler(req, res) {
        try {
            const { habitacionesDisponibles } = req.body; // array de { id, fecha, disponibilidad }
            const resultado = await enviarDisponibilidad(habitacionesDisponibles);
            return res.status(200).json({ message: 'Disponibilidad enviada correctamente', data: resultado });
        } catch (error) {
            console.error('Error al enviar disponibilidad:', error);
            return res.status(500).json({ message: 'Error al comunicar la disponibilidad' });
        }
    }

    // Cancelar una reserva en Booking desde tu sistema
    static async cancelarReservaHandler(req, res) {
        try {
            const { bookingId } = req.params;
            const resultado = await cancelarReservaEnBooking(bookingId);
            return res.status(200).json({ message: 'Reserva cancelada en Booking', data: resultado });
        } catch (error) {
            console.error('Error al cancelar reserva:', error);
            return res.status(500).json({ message: 'Error al cancelar la reserva en Booking' });
        }
    }

    // Confirmar una reserva (por ejemplo, después de un procesamiento interno)
    static async confirmarReservaHandler(req, res) {
        try {
            const { bookingId } = req.params;
            const resultado = await confirmarReservaEnBooking(bookingId);
            return res.status(200).json({ message: 'Reserva confirmada en Booking', data: resultado });
        } catch (error) {
            console.error('Error al confirmar reserva:', error);
            return res.status(500).json({ message: 'Error al confirmar reserva en Booking' });
        }
    }
}
