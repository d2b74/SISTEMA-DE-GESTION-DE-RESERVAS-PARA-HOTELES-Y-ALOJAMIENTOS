import axios from './axios'

// Obtener todos los check-ins
export const getCheckinsRequest = () => axios.get('/Checkin')

// Obtener un check-in por ID
export const getCheckinByIdRequest = (id) => axios.get(`/Checkin/${id}`)

// Crear un nuevo check-in
export const crearCheckinRequest = (checkin) => 
  axios.post('/Checkin', {checkin}, {
    headers: { 'Content-Type': 'application/json' }
  })

// Editar un check-in existente
export const editarCheckinRequest = (id, data) =>
  axios.put(`/Checkin/${id}`, { checkin: data }, {
    headers: { 'Content-Type': 'application/json' }
  })

// Eliminar un check-in
export const eliminarCheckinRequest = (id) => axios.delete(`/Checkin/${id}`)
