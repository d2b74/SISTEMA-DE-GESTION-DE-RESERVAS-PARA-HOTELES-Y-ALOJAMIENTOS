import axios from 'axios';
//esto es un ejemplo de llamada a la API de Booking.com
//ya que no se tiene las credenciales reales
const BASE_URL = process.env.BOOKING_API_URL || 'https://api.booking.com/v1';
const API_KEY = process.env.BOOKING_API_KEY || 'FAKE_KEY';

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
};

// Enviar disponibilidad
export async function enviarDisponibilidad(habitacionesDisponibles) {
    try {
        const response = await axios.post(`${BASE_URL}/availability`, {
            rooms: habitacionesDisponibles
        }, { headers });

        return response.data;
    } catch (error) {
        console.error('Error al enviar disponibilidad a Booking:', error.message);
        return { success: false, error: error.message };
    }
}

// Cancelar una reserva
export async function cancelarReservaEnBooking(bookingId) {
    try {
        const response = await axios.post(`${BASE_URL}/reservations/${bookingId}/cancel`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al cancelar reserva en Booking:', error.message);
        return { success: false, error: error.message };
    }
}

// Confirmar una reserva
export async function confirmarReservaEnBooking(bookingId) {
    try {
        const response = await axios.post(`${BASE_URL}/reservations/${bookingId}/confirm`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error al confirmar reserva en Booking:', error.message);
        return { success: false, error: error.message };
    }
}
