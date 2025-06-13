// src/api/usuarios.js
import axios from './axios';

// Obtener todos los usuarios
export const getUsuariosRequest = () => axios.get('/Usuarios');

// Crear un nuevo Usuario
export const crearUsuarioRequest = (usuarioData) =>
  axios.post('/Usuarios', usuarioData, {
    headers: { 'Content-Type': 'application/json' }
  });

// Editar un Usuario existente
export const editarUsuarioRequest = (id, data) =>
  axios.put(`/Usuarios/${id}`, data, {
    headers: { 'Content-Type': 'application/json' }
  });

// Eliminar un Usuario
export const eliminarUsuarioRequest = (id) =>
  axios.delete(`/Usuarios/${id}`);

// Login de usuario
export const loginUsuarioRequest = ({ mail, contrasena }) =>
  axios.post('/Usuarios/login', { mail, contrasena }, {
    headers: { 'Content-Type': 'application/json' }
  });
