import axios from './axios'

// Obtener todas las reservas
export const getReservasRequest = () => axios.get('/Reserva')

// Obtener una reserva por ID
export const getReservaByIdRequest = async (id) => {
  return await axios.get(`/Reserva/${id}`);
};


// Obtener reservas por huesped
export const getReservasPorHuespedRequest = async (id_huesped) => {
  const res = await axios.get(`/Reserva/huesped/${id_huesped}`);
  return res;
};

// Crear una nueva reserva

export const crearReservaRequest = async (reserva) => {
  console.log('Reserva a crear:', reserva);
  const res = await axios.post('/Reserva', reserva, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
};


// Editar una reserva existente


export const actualizarReservaRequest = async (id, reserva) => {
    const res = await axios.put(`/Reserva/${id}`, reserva);
    return res.data;
};


// Eliminar una reserva
export const eliminarReservaRequest = (id) => axios.delete(`/Reserva/${id}`)
