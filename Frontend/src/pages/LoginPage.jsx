// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert
} from 'react-bootstrap';
import { FaGoogle, FaUser, FaLock, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, loading, user } = useAuth();
  const [form, setForm] = useState({ mail: '', contrasena: '' });
  const [clientError, setClientError] = useState('');

  useEffect(() => {
    if (authError) setClientError(authError);
  }, [authError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setClientError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mail || !form.contrasena) {
      setClientError('Por favor completa todos los campos');
      return;
    }
    // Llamamos al login del contexto
    const userData = await login({ mail: form.mail, contrasena: form.contrasena });

    if (userData) {
      // Aquí ya tenemos el userData tal cual vino del backend
      console.log('userData.tipo:', userData.tipo);

      // Si es administrador (tinyint=1 o boolean=true), lo mandamos a /admin
      if (userData.tipo === 1 || userData.tipo === true) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className="login-page d-flex align-items-center justify-content-center"
      >
        <div className="login-card position-relative">
          <Button
            variant="link"
            className="close-btn p-0"
            onClick={() => navigate('/')}
          >
            <FaTimes size={24} />
          </Button>
          <h2 className="login-title">Login</h2>

          {(clientError || authError) && (
            <Alert variant="danger">{clientError || authError}</Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Form.Group className="mb-4 input-group-custom">
              <InputGroup>
                <InputGroup.Text className="input-icon">
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  name="mail"
                  type="email"
                  placeholder="Email"
                  value={form.mail}
                  onChange={handleChange}
                  disabled={loading}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2 input-group-custom">
              <InputGroup>
                <InputGroup.Text className="input-icon">
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  name="contrasena"
                  type="password"
                  placeholder="Contraseña"
                  value={form.contrasena}
                  onChange={handleChange}
                  disabled={loading}
                />
              </InputGroup>
            </Form.Group>

            <div className="text-end mb-4">
              <a href="#" className="forgot-link">
                Olvidé mi contraseña
              </a>
            </div>

            <Button
              type="submit"
              variant="light"
              className="btn-custom w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Login'}
            </Button>

            <Button
              variant="outline-light"
              className="btn-google w-100 mb-3"
              disabled={loading}
            >
              <FaGoogle className="me-2" /> Continuar con Google
            </Button>

            {/* ← Aquí volvemos a incluir “Crear cuenta” */}
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => navigate('/registro')}
              disabled={loading}
            >
              Crear cuenta
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}
