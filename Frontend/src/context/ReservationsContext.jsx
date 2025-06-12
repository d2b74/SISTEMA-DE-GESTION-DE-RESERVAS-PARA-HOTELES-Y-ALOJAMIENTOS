
// src/context/ReservationsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { crearReservaRequest,getReservasPorHuespedRequest,actualizarReservaRequest,eliminarReservaRequest } from '../api/reserva'
import { crearCheckinRequest } from '../api/checkIn'

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  const { user } = useAuth();

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  // ✅ 1. Fetch reservas del usuario actual
  const fetchReservations = async () => {
    try {
      if (!user?.id_huesped) return;
      const res = await getReservasPorHuespedRequest(user.id_huesped);

      const transformed = res.data.map(r => ({
        id: r.id_reserva,
        checkIn: r.fecha_inicio,
        checkOut: r.fecha_fin,
        price: r.precio,
        people: r.personas,
        room: {
          id_habitacion: r.id_habitacion,
          numero: r.numero_habitacion,
          url: r.urls_habitacion,
          title: `Habitación ${r.numero_habitacion}`,
          precio: r.precio
        },
        userEmail: user.mail,
        checkInConfirmed: r.estado === 2
      }));


      setReservations(transformed);
    } catch (err) {
      console.error('Error al traer reservas:', err.response?.data || err.message);
    }
  };

  // 🔥 Llamamos fetchReservations cada vez que user cambia (login)
  useEffect(() => {
    if (user?.id_huesped) {
      fetchReservations();
    }
  }, [user]);
    const addReservation = async (payload) => {
      
    try {
      console.log('Reserva a crear:', payload);
      
      const res = await crearReservaRequest(payload);
      await fetchReservations();
       if (!user) return;
       
       const newRes = {
      ...payload,
      id: res.id_reserva,
      userEmail: user.mail,
      checkInConfirmed: false
      };
      // Opcional: actualizar el estado local con la nueva reserva
      setReservations(prev => [...prev, newRes]);

      return newRes;
    } catch (err) {
      console.error('Error al crear reserva:', err.response?.data || err.message);
      throw err;
    }
  };

  // Actualizar reserva existente
  const updateReservation = async (updated) => {
      try {
          await actualizarReservaRequest(updated.id, updated);
          await fetchReservations();  // Refrescamos las reservas
      } catch (err) {
          console.error('Error al actualizar reserva:', err.response?.data || err.message);
          throw err;
      }
  };
  // Eliminar reserva
  const deleteReservation = async (id) => {
    try {
      await eliminarReservaRequest(id);
      setReservations(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error al eliminar reserva:', err.response?.data || err.message);
      alert('No se pudo eliminar la reserva');
    }
  };

  // Comprueba disponibilidad con margen de un día
  const isRoomAvailable = (roomId, newCheckIn, newCheckOut, excludeReservationId = null) => {
    const start = new Date(newCheckIn);
    const end = new Date(newCheckOut);

    return !reservations.some(r => {
      // 1️⃣ Si la reserva es la misma que estamos editando, la ignoramos
      if (excludeReservationId && r.id === excludeReservationId) return false;

      // 2️⃣ Si no hay room (habitacion) asociada, la salteamos
      if (!r.room || !r.room.id_habitacion) return false;

      // 3️⃣ Comparamos solo si la habitación coincide
      if (r.room.id_habitacion !== roomId) return false;

      const existingStart = new Date(r.checkIn);
      const existingEnd = new Date(r.checkOut);
      const existingEndPlusOne = new Date(existingEnd.getTime() + 24 * 60 * 60 * 1000);

      // 4️⃣ Si hay solapamiento de fechas, está ocupada
      return (start < existingEndPlusOne) && (end > existingStart);
    });
  };


  const doCheckin = async (reserva, userId) => {
    try {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];             // "YYYY-MM-DD"
    const hora  = now.toTimeString().split(' ')[0];            // "HH:mm:ss"

      const checkinData = {
        id_reserva: reserva,
        usuario:    false,                                       // o userId === algo?
        descripcion:'Check-in normal',
      fecha,
        hora
      };

      await crearCheckinRequest(checkinData);
      alert('Check-in exitoso');
      await fetchReservations();
    } catch (err) {
      console.error('Error al hacer check-in:', err);
      alert('Error al hacer check-in');
    }
};


  return (
    <ReservationsContext.Provider
      value={{
        // Solo devolvemos las reservas del usuario autenticado
        reservations: user ? reservations.filter(r => r.userEmail === user.mail) : [],
        fetchReservations,
        addReservation,
        updateReservation,
        deleteReservation,
        isRoomAvailable,
        doCheckin
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};

export function useReservations() {
  return useContext(ReservationsContext);
}