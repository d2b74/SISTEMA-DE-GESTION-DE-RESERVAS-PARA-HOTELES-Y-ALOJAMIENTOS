// src/context/RoomsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reemplazar '/api/rooms' por la URL de tu back-end cuando esté listo
    fetch('/api/rooms')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar habitaciones');
        return res.json();
      })
      .then(data => setRooms(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, loading, error }}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomsContext);
}