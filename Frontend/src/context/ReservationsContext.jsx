// src/context/ReservationsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  // Al cargar, leemos lo que haya en localStorage
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('reservations');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistir en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Añadir nueva reserva
  const addReservation = (booking) => {
    const newRes = { ...booking, id: Date.now(), checkInConfirmed: false };
    setReservations(prev => [...prev, newRes]);
    return newRes;
  };

  // Actualizar reserva existente
  const updateReservation = (updated) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
    );
  };
  

  // Eliminar reserva
  const deleteReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // Comprueba si la habitación está disponible considerando un día de margen tras el checkout
  const isRoomAvailable = (roomId, newCheckIn, newCheckOut) => {
    const start = new Date(newCheckIn);
    const end   = new Date(newCheckOut);
    return !reservations.some(r => {
      if (r.room.id !== roomId) return false;
      const existingStart = new Date(r.checkIn);
      const existingEnd   = new Date(r.checkOut);
      // Añadimos un día de margen después del checkout
      const existingEndPlusOne = new Date(existingEnd.getTime() + 24 * 60 * 60 * 1000);
      // Si los periodos se solapan (con margen), no está disponible
      return (start < existingEndPlusOne) && (end > existingStart);
    });
  };


  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, updateReservation, deleteReservation ,isRoomAvailable}}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  return useContext(ReservationsContext);
}
