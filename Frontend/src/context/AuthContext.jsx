// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getUsuariosRequest,
  crearUsuarioRequest,
  editarUsuarioRequest,
  eliminarUsuarioRequest,
  loginUsuarioRequest
} from '../api/usuarios';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
  const [usuarios, setUsuarios] = useState([]);      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
  }, [user, token]);

  // 3) Obtener todos los usuarios
  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUsuariosRequest();
      setUsuarios(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error al cargar usuarios';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // 4) Registro   // await crearUsuarioRequest(payload);
  const register = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await crearUsuarioRequest(payload);
      setUser(res);  // ⚠️ Guarda id_huesped si lo tiene
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error en registro';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };


  // 5) Editar usuario
  const updateUsuario = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      await editarUsuarioRequest(id, data);
      setUsuarios(prev => prev.map(u => (u.id_usuario === id ? { ...u, ...data } : u)));
      if (user?.id_usuario === id) {
        setUser(prev => ({ ...prev, ...data }));
      }
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al editar usuario';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 6) Eliminar usuario
  const deleteUsuario = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await eliminarUsuarioRequest(id);
      setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
      if (user?.id_usuario === id) {
        logout();
      }
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al eliminar usuario';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 7) Login
  const login = async ({ mail, contrasena }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginUsuarioRequest({ mail, contrasena });
      const { token: jwtToken, user: userData } = res.data;
      setUser(userData);
      setToken(jwtToken);
      return userData;
    } catch (err) {
      const msg = err.response?.data?.message || 'Error en login';
      setError(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 8) Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        usuarios,
        loading,
        error,
        fetchUsuarios,
        register,
        login,
        updateUsuario,
        deleteUsuario,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
