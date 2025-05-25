// src/context/ReservationsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { crearReservaRequest } from '../api/reserva'

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

  // Añadir nueva reserva, asociada al usuario actual
/*   const addReservation = (booking) => {
    if (!user) return;
    const newRes = {
      ...booking,
      id: Date.now(),
      userEmail: user.mail,
      checkInConfirmed: false
    };
    setReservations(prev => [...prev, newRes]);
    return newRes;
  }; */
    const addReservation = async (payload) => {
      
    try {
      
      const { reserva } = payload; // destructuramos solo lo necesario
      const res = await crearReservaRequest(reserva);
       if (!user) return;
    const newRes = {
      ...payload,
      id: Date.now(),
      userEmail: user.mail,
      checkInConfirmed: false
    };
      // Opcional: actualizar el estado local con la nueva reserva
      setReservations(prev => [...prev, newRes]);

      return newRes;
    } catch (err) {
      console.error('Error al crear reserva:', err);
      throw err;
    }
  };

  // Actualizar reserva existente
  const updateReservation = (updated) => {
    setReservations(prev =>
      prev.map(r => r.id === updated.id ? { ...r, ...updated } : r)
    );
  };

  // Eliminar reserva
  const deleteReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  // Comprueba disponibilidad con margen de un día
  const isRoomAvailable = (roomId, newCheckIn, newCheckOut) => {
    const start = new Date(newCheckIn);
    const end = new Date(newCheckOut);
    return !reservations.some(r => {
      if (r.room.id !== roomId) return false;
      const existingStart = new Date(r.checkIn);
      const existingEnd = new Date(r.checkOut);
      const existingEndPlusOne = new Date(existingEnd.getTime() + 24 * 60 * 60 * 1000);
      return (start < existingEndPlusOne) && (end > existingStart);
    });
  };

  return (
    <ReservationsContext.Provider
      value={{
        // Solo devolvemos las reservas del usuario autenticado
        reservations: user ? reservations.filter(r => r.userEmail === user.mail) : [],
        addReservation,
        updateReservation,
        deleteReservation,
        isRoomAvailable
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  return useContext(ReservationsContext);
}
