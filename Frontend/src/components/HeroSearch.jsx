// src/components/HeroSearch.jsx
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HeroSearch.css';

export default function HeroSearch() {
  return (
    <section >
      <div className="hero">
      
      <h1 className="hero__title">Hotel & Resort</h1>
      </div>
      
      <Container fluid className="hero__content px-0">
        
        <Row className="justify-content-center g-3 hero__form">
          <Col xs={12} md={3}>
            <Form.Control type="date" placeholder="Check-in" />
          </Col>
          <Col xs={12} md={3}>
            <Form.Control type="date" placeholder="Check-out" />
          </Col>
          <Col xs={12} md={2}>
            <Form.Select>
              <option>Tipo Habitación</option>
              <option>Single</option>
              <option>Double</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={2}>
            <Form.Select>
              <option>Personas</option>
              <option>1</option>
              <option>2</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button variant="primary" className="hero__btn">Reservar</Button>
          </Col>
        </Row>
      </Container>


    </section>

    
  );
}
