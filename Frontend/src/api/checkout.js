import axios from './axios';

export const crearCheckoutRequest = (data) =>
  axios.post('/Check-out', data);