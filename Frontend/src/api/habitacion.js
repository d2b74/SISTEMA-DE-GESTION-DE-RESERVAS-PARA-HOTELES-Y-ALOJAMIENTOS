import axios from './axios'

// Traer todas las habitaciones
export const getHabitacionesRequest = () => axios.get('/Habitaciones')

// Traer una habitación por ID
export const getHabitacionByIdRequest = (id) => axios.get(`/Habitaciones/${id}`)

// Crear una habitación
export const crearHabitacionRequest = (habitacion) => 
  axios.post('/Habitaciones', habitacion, {
    headers: { 'Content-Type': 'application/json' }
  })

// Editar una habitación
export const editarHabitacionRequest = (id, data) =>
  axios.put(`/Habitaciones/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  })

// Eliminar una habitación
export const eliminarHabitacionRequest = (id) => axios.delete(`/Habitaciones/${id}`)