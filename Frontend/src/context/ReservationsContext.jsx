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

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, updateReservation, deleteReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  return useContext(ReservationsContext);
}
