import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ServicesIntro.css';

export default function ServicesIntro() {
  return (
    <section className="services-intro py-5">
      <Container fluid="xxl">
        <Row className="align-items-center">
          {/* Texto primero */}
          <Col xs={12} lg={6} className="services-intro__content">
            <h2 className="services-intro__title">Nuestros Servicios</h2>
            <p className="services-intro__text">
              Contamos con un amplio abanico de servicios para que tu estadía sea perfecta:
              servicio de habitaciones 24h, spa, gimnasio, transporte al aeropuerto, y un
              restaurante de primer nivel con menú internacional.
            </p>
            <Button variant="primary" className="services-intro__btn">
              Ver Servicios
            </Button>
          </Col>

          {/* Imagen a la derecha */}
          <Col xs={12} lg={6} className="services-intro__image-col">
            <div className="services-intro__image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
