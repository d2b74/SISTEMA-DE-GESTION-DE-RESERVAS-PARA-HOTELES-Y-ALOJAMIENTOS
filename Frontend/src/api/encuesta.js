import axios from './axios';


export const crearEncuestaRequest = (data) => axios.post('/encuestas', data);
export const getEncuestaByIdRequest = (id) => axios.get(`/encuesta/${id}`);
export const updateEncuestaRequest = (id, data) => axios.put(`/encuesta/${id}`, { encuesta: data });
export const getOpcionesPorPreguntaRequest = () => axios.get('/encuestas/opciones-pregunta');
export const getPreguntasRequest = () => axios.get('/encuestas/preguntas');