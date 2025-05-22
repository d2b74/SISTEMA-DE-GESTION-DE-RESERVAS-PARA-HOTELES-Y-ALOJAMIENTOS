// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaGoogle, FaUser, FaLock, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'El email es obligatorio.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Email inválido.';

    if (!password) errs.password = 'La contraseña es obligatoria.';
    else if (password.length < 4) errs.password = 'La contraseña debe tener al menos 4 caracteres.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Lógica de login...
    alert('Login exitoso');
    login(email); 
    navigate('/');
    
  };

  return (
    <Container fluid className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card position-relative">
        <Button variant="link" className="close-btn p-0">
          <FaTimes size={24} />
        </Button>

        <h2 className="login-title">Login</h2>

        {errors.general && <Alert variant="danger">{errors.general}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4 input-group-custom" controlId="formEmail">
            <InputGroup>
              <InputGroup.Text className="input-icon"><FaUser /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Usuario (email)"
                value={email}
                onChange={e => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2 input-group-custom" controlId="formPassword">
            <InputGroup>
              <InputGroup.Text className="input-icon"><FaLock /></InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <div className="text-end mb-4">
            <a href="#!" className="forgot-link">Olvidé mi contraseña</a>
          </div>

          <Button type="submit" variant="light" className="btn-custom w-100 mb-3">
            Login
          </Button>
        </Form>

        <Button variant="outline-light" className="btn-google w-100 mb-3">
          <FaGoogle className="me-2" /> Continuar con Google
        </Button>

        <Button variant="light" className="btn-custom w-100">
          Crear cuenta
        </Button>
      </div>
    </Container>
  );
}
