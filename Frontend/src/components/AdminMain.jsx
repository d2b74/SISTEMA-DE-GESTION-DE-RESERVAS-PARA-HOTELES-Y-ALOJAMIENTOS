// src/components/AdminMain.jsx
import React from 'react';
import { Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaBed, FaConciergeBell } from 'react-icons/fa';
import { useRooms } from '../context/RoomsContext';
import './AdminMain.css';

const statusVariant = {
  Limpia: 'success',             // Lista para ocupar
  Ocupada: 'info',            // Con huésped
  Mantenimiento: 'orange',     // Tareas de mantenimiento
  Reservada: 'warning',            // Asignada a reserva futura
  'Fuera de servicio': 'secondary' // No disponible
};

export default function AdminMain() {
  const { rooms, loading, error } = useRooms();

  if (loading) return <Spinner animation="border" className="m-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="admin-main">
      <Row xs={1} sm={2} md={3} className="g-4">
        {rooms.map(room => (
          <Col key={room.id_habitacion}>
            <Card className="room-card">
              <Card.Body>
                <Card.Title>Habitación Nº {room.numero}</Card.Title>

                <div className="d-flex align-items-center mb-2">
                  <FaBed className="me-2" /> Tipo: {room.tipo}
                </div>

                <div className="d-flex align-items-center mb-2">
                  <FaConciergeBell className="me-2" /> Precio: ${parseFloat(room.precio)}
                </div>

                <Badge bg={statusVariant[room.estado] || 'secondary'} className="status-badge">
                  {room.estado}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="admin-actions mt-4 text-center">
        <Button variant="outline-primary" className="me-3">Crear</Button>
        <Button variant="outline-secondary" className="me-3">Modificar</Button>
        <Button variant="outline-danger">Cancelar</Button>
      </div>
    </div>
  );
}
