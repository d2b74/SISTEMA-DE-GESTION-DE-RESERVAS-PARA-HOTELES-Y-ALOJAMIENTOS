import axios from './axios'

// Obtener todos los check-ins
export const getCheckinsRequest = () => axios.get('/Check-in')

// Obtener un check-in por ID
export const getCheckinByIdRequest = (id) => axios.get(`/Check-in/${id}`)

// Crear un nuevo check-in
export const crearCheckinRequest = (checkin) => {
  console.log('checkin', checkin)
  axios.post('/Check-in', {checkin}, {
    headers: { 'Content-Type': 'application/json' }
  })
}
// Editar un check-in existente
export const editarCheckinRequest = (id, data) =>
  axios.put(`/Check-in/${id}`, { checkin: data }, {
    headers: { 'Content-Type': 'application/json' }
  })

// Eliminar un check-in
export const eliminarCheckinRequest = (id) => axios.delete(`/Check-in/${id}`)
