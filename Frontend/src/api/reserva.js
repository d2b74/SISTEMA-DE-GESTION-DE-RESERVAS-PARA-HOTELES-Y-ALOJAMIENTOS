import axios from './axios'

// Obtener todas las reservas
export const getReservasRequest = () => axios.get('/Reserva')

// Obtener una reserva por ID
export const getReservaByIdRequest = (id) => axios.get(`/Reserva/${id}`)

// Crear una nueva reserva
export const crearReservaRequest = async (reserva) => {
  console.log('Reserva a crear:', { reserva });
  const res = await axios.post('/Reserva', { reserva }, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data; 
};


// Editar una reserva existente
export const editarReservaRequest = (id, data) =>
  axios.put(`/Reserva/${id}`, { reserva: data }, {
    headers: { 'Content-Type': 'application/json' }
  })

// Eliminar una reserva
export const eliminarReservaRequest = (id) => axios.delete(`/Reserva/${id}`)
