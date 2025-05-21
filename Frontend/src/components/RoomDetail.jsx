// src/components/RoomDetail.jsx
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export function RoomDetail({ room }) {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6} className="mb-4">
          <Image src={room.image} alt={room.name} fluid rounded />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2 className="mb-3">{room.name}</h2>
          <p className="text-muted mb-3">{room.fullDescription}</p>
          <h4 className="mb-4">Precio: ${room.price}/noche</h4>
          <Button variant="success">Reservar ahora</Button>
        </Col>
      </Row>
    </Container>
  );
}