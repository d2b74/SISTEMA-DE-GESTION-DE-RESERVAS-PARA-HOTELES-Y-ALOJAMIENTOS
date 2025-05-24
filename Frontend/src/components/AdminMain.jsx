// src/components/AdminMain.jsx
import React from 'react';
import { Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaBed, FaConciergeBell } from 'react-icons/fa';
import { useRooms } from '../context/RoomsContext';
import './AdminMain.css';

const statusVariant = {
  Disponible: 'success',
  Ocupado: 'danger',
  Limpieza: 'info',
};
//sacar esto cuando el back-end esté listo
const tipoTexto = {
  1: 'Single',
  2: 'Doble',
  3: 'Twin',
  4: 'Suite',
  5: 'Familiar',
};

const estadoTexto = {
  1: 'Disponible',
  2: 'Ocupado',
  3: 'Limpieza',
};

export default function AdminMain() {
  const { rooms, loading, error } = useRooms();

  if (loading) return <Spinner animation="border" className="m-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  
    // Transformamos las habitaciones para usar en la UI
  //sacar esto cuando el back-end esté listo
  const mappedRooms = rooms.map(room => ({
    id: room.id_habitacion,
    number: room.numero,
    type: tipoTexto[room.tipo] || `Tipo ${room.tipo}`,
    price: parseFloat(room.precio),
    status: estadoTexto[room.estado] || 'Desconocido',
  }));

  return (
    <div className="admin-main">
      <Row xs={1} sm={2} md={3} className="g-4">
        {mappedRooms.map(room => (
          <Col key={room.id}>
            <Card className="room-card">
              <Card.Body>
                <Card.Title>Habitación Nº {room.number}</Card.Title>
                <div className="d-flex align-items-center mb-2">
                  <FaBed className="me-2" /> Tipo: {room.type}
                </div>
                <div className="d-flex align-items-center mb-2">
                  <FaConciergeBell className="me-2" /> Precio: ${room.price}
                </div>
                <Badge bg={statusVariant[room.status]} className="status-badge">
                  {room.status}
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
