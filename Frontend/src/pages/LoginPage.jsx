// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaGoogle, FaUser, FaLock, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ mail: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mail, contrasena } = form;
    if (!mail || !contrasena) {
      setError('Por favor completa todos los campos');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const found = users.find(u => u.mail === mail && u.contrasena === contrasena);
    if (!found) {
      setError('Usuario o contraseña incorrectos');
      return;
    }

    login(found); //  usar contexto
    if (found.tipo) {
      navigate('/admin');    // dashboard de administradores
    } else {
      navigate('/');         // home de usuario normal
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="login-page d-flex align-items-center justify-content-center">
        <div className="login-card position-relative">
          <Button variant="link" className="close-btn p-0" onClick={() => navigate('/') }>
            <FaTimes size={24} />
          </Button>
          <h2 className="login-title">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Form.Group className="mb-4 input-group-custom">
              <InputGroup>
                <InputGroup.Text className="input-icon"><FaUser /></InputGroup.Text>
                <Form.Control
                  name="mail"
                  type="email"
                  placeholder="Email"
                  value={form.mail}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2 input-group-custom">
              <InputGroup>
                <InputGroup.Text className="input-icon"><FaLock /></InputGroup.Text>
                <Form.Control
                  name="contrasena"
                  type="password"
                  placeholder="Contraseña"
                  value={form.contrasena}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>

            <div className="text-end mb-4">
              <a href="#" className="forgot-link">Olvidé mi contraseña</a>
            </div>

            <Button type="submit" variant="light" className="btn-custom w-100 mb-3">
              Login
            </Button>

            <Button variant="outline-light" className="btn-google w-100 mb-3">
              <FaGoogle className="me-2" /> Continuar con Google
            </Button>

            <Button variant="secondary" className="w-100" onClick={() => navigate('/registro')}>
              Crear cuenta
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}
