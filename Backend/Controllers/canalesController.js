// Este controlador maneja la comunicación entre el sistema y los canales externos como Booking,
//  Expedia, etc.).
// Recibe solicitudes desde esos canales, adapta los datos con su adaptador correspondiente y 
// delega el procesamiento en el ReservaProcessor, unificando el flujo de ingreso de reservas.

import { ReservaProcessor } from '../core/reservaProcessor.js';
import { bookingAdapter } from '../adapters/bookingAdapter.js';
// Luego se pueden importar otros adaptadores, por ejemplo:
// import { expediaAdapter } from '../adapters/expediaAdapter.js';

export class canalesController {
  
  // 🏨 Booking.com - Recibir nueva reserva
  static async reservaDesdeBooking(req, res) {
    try {
      const datosExternos = req.body;

      // Adaptar los datos del formato Booking al formato interno
      const datosAdaptados = bookingAdapter.adaptar(datosExternos);

      // Procesar la reserva como si fuera local, pero indicando que proviene de 'booking'
      const resultado = await ReservaProcessor.procesarReserva(datosAdaptados, 'booking');

      return res.status(201).json({
        message: 'Reserva recibida desde Booking y procesada correctamente',
        datos: resultado
      });

    } catch (error) {
      console.error('Error procesando reserva desde Booking:', error);
      return res.status(500).json({ message: 'Error procesando reserva desde Booking' });
    }
  }

  // Aquí podrías agregar otras funciones similares:
  // static async reservaDesdeExpedia(req, res) { ... }
  // static async cancelarReservaDesdeBooking(req, res) { ... }
  // static async obtenerReservasParaExpedia(req, res) { ... }

}
