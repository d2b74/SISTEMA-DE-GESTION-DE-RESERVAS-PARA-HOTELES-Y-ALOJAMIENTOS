// src/context/RoomsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import{getHabitacionesRequest} from '../api/habitacion';

const RoomsContext = createContext();

export function RoomsProvider({ children }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar habitaciones desde el back-end
  const fetchRooms = async () => {
    try {
      const response = await getHabitacionesRequest();
      setRooms(response.data);
    } catch (err) {
      console.error('Error al cargar habitaciones:', err);
      setError('Error al cargar habitaciones');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Reemplazar '/api/rooms' por la URL de tu back-end cuando esté listo
   fetchRooms();
    // const fetchRooms = async () => {
    //   try {
    //     const response = await axios.get('/api/rooms');
    //     setRooms(response.data);
    //   } catch (err) {
    //     setError('Error al cargar habitaciones');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
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