// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import {Container,Row,Col,Form,Button,InputGroup,Alert} from 'react-bootstrap';
import { FaTimes, FaUser, FaLock, FaIdCard, FaAt, FaPhone } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './RegistrationPage.css';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const navigate = useNavigate();
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
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.nombre) err.nombre = 'El nombre es obligatorio';
    if (!form.apellido) err.apellido = 'El apellido es obligatorio';
    if (!form.dni || form.dni.length < 5) err.dni = 'DNI inválido';
    if (!form.mail || !/\S+@\S+\.\S+/.test(form.mail)) err.mail = 'Email inválido';
    if (!form.telefono || form.telefono.length < 5) err.telefono = 'Teléfono inválido';
    if (!form.contrasena || form.contrasena.length < 6)
      err.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    if (form.confirmar !== form.contrasena)
      err.confirmar = 'Las contraseñas no coinciden';
    return err;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      // Leer usuarios actuales del localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Verificar que el mail no esté registrado ya
      const userExists = users.some(u => u.mail === form.mail);
      if (userExists) {
        setErrors({ mail: 'Este correo ya está registrado' });
        return;
      }

      // Agregar nuevo usuario
      const newUser = {
        nombre: form.nombre,
        apellido: form.apellido,
        dni: form.dni,
        mail: form.mail,
        telefono: form.telefono,
        contrasena: form.contrasena,
        tipo: true // puedes ajustar si es admin o no
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setSuccess('Cuenta creada con éxito ✔️');

      // Reset formulario
      setForm({
        nombre: '',
        apellido: '',
        dni: '',
        mail: '',
        telefono: '',
        contrasena: '',
        confirmar: ''
      });

      // Redirige a Home luego de 2s
      setTimeout(() => navigate('/login'), 2000);
    }
  };


  return (
    <>
      <Header />
      <Container className="registration-page d-flex align-items-center justify-content-center">
        <div className="registration-card position-relative">
          <Button variant="link" className="close-btn p-0">
            <FaTimes size={24} />
          </Button>
          <h2 className="registration-title">Registro</h2>

          {success && <Alert variant="success">{success}</Alert>}

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
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmar}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button type="submit" variant="light" className="btn-custom w-100 mb-3">
              Crear cuenta
            </Button>

            <Button variant="outline-light" className="btn-google w-100 mb-3">
              <FaAt className="me-2" /> Continuar con Google
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
}
