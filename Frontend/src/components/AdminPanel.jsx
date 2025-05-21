// src/components/AdminPanel.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export function AdminPanel() {
  return (
    <Container className="py-5 bg-light">
      <h2 className="text-center mb-4">Panel Administrativo</h2>
      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Reservas</Card.Title>
              {/* Lista de reservas */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Habitaciones</Card.Title>
              {/* CRUD de habitaciones */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}