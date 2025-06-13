// src/pages/RegistrationPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Alert
} from 'react-bootstrap';
import {
  FaTimes,
  FaUser,
  FaLock,
  FaIdCard,
  FaAt,
  FaPhone
} from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RegistrationPage.css';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    telefono: '',
    contrasena: '',
    confirmar: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  // Si el servidor devolvió un error (objeto), lo convertimos a string legible
  useEffect(() => {
    if (authError) {
      // Si authError es un array de Zod, extraer primera cadena:
      if (Array.isArray(authError)) {
        setServerError(authError[0]?.message || 'Error genérico');
      } else if (typeof authError === 'object') {
        // podría venir como { code, errors: [...] }
        // tomamos firstError.message si existe
        const first = Array.isArray(authError.errors)
          ? authError.errors[0]?.message
          : null;
        setServerError(first || JSON.stringify(authError));
      } else {
        setServerError(authError);
      }
    }
  }, [authError]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
    setServerError('');
  };

  const validate = () => {
    const err = {};
    if (!form.nombre) err.nombre = 'El nombre es obligatorio';
    if (!form.apellido) err.apellido = 'El apellido es obligatorio';
    if (!form.dni || form.dni.length < 5) err.dni = 'DNI inválido';
    if (!form.mail || !/\S+@\S+\.\S+/.test(form.mail))
      err.mail = 'Email inválido';
    if (!form.telefono || form.telefono.length < 5)
      err.telefono = 'Teléfono inválido';
    if (!form.contrasena || form.contrasena.length < 6)
      err.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    if (form.confirmar !== form.contrasena)
      err.confirmar = 'Las contraseñas no coinciden';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      dni: form.dni,
      mail: form.mail,
      telefono: form.telefono,
      contrasena: form.contrasena,
      tipo: false
    };

    const created = await register(payload);
    if (created) {
      setSuccess('Cuenta creada con éxito ✔️');
      setForm({
        nombre: '',
        apellido: '',
        dni: '',
        mail: '',
        telefono: '',
        contrasena: '',
        confirmar: ''
      });
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  // Si hay errores de validación de campos o de servidor, mostrar el primero
  const displayMessage = () => {
    if (success) return success;
    if (serverError) return serverError;
    if (Object.keys(errors).length > 0) {
      return Object.values(errors)[0];
    }
    return null;
  };

  return (
    <>
      <Header />
      <Container
        className="registration-page d-flex align-items-center justify-content-center"
      >
        <div className="registration-card position-relative">
          <Button
            variant="link"
            className="close-btn p-0"
            onClick={() => navigate('/')}
          >
            <FaTimes size={24} />
          </Button>
          <h2 className="registration-title">Registro</h2>

          {displayMessage() && (
            <Alert variant={success ? 'success' : 'danger'}>
              {displayMessage()}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      isInvalid={!!errors.nombre}
                      placeholder="Nombre"
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      name="apellido"
                      value={form.apellido}
                      onChange={handleChange}
                      isInvalid={!!errors.apellido}
                      placeholder="Apellido"
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.apellido}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaIdCard /></InputGroup.Text>
                <Form.Control
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                  isInvalid={!!errors.dni}
                  placeholder="DNI"
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dni}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaAt /></InputGroup.Text>
                <Form.Control
                  name="mail"
                  type="email"
                  value={form.mail}
                  onChange={handleChange}
                  isInvalid={!!errors.mail}
                  placeholder="correo@ejemplo.com"
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mail}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaPhone /></InputGroup.Text>
                <Form.Control
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  isInvalid={!!errors.telefono}
                  placeholder="Teléfono"
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control
                  name="contrasena"
                  type="password"
                  value={form.contrasena}
                  onChange={handleChange}
                  isInvalid={!!errors.contrasena}
                  placeholder="Contraseña"
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contrasena}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <InputGroup>
                <InputGroup.Text><FaLock /></InputGroup.Text>
                <Form.Control
                  name="confirmar"
                  type="password"
                  value={form.confirmar}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmar}
                  placeholder="Repite la contraseña"
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmar}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              variant="light"
              className="btn-custom w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear cuenta'}
            </Button>

            <Button
              variant="outline-light"
              className="btn-google w-100 mb-3"
              disabled={loading}
            >
              <FaAt className="me-2" /> Continuar con Google
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}
