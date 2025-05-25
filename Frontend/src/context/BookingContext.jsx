// src/context/BookingContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // 1) Al arrancar, intenta leer booking previo de localStorage
  //aca deberia ir el booking del usuario logueado que es el que se guarda en la base de datos
  const saved = localStorage.getItem('booking');
  const initial = saved ? JSON.parse(saved) : {
    checkIn: null,
    checkOut: null,
    people: 1,
    room: null,
    isConfirmed: false,
  };

  const [booking, setBooking] = useState(initial);

  // 2) Cada vez que cambie booking, lo guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('booking', JSON.stringify(booking));
  }, [booking]);

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
