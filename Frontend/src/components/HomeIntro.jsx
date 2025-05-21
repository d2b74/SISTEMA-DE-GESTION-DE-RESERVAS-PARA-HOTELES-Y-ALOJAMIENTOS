// src/components/HomeIntro.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HomeIntro.css';

export default function HomeIntro() {
  return (
    <section className="home-intro py-5">
      <Container fluid="xxl">
        <Row className="align-items-center">
          {/* Imagen */}
          <Col xs={12} lg={6} className="home-intro__image-col mb-4 mb-lg-0">
            <div className="home-intro__image" />
          </Col>

          {/* Texto */}
          <Col xs={12} lg={6}>
            <div className="home-intro__content">
              <h2 className="home-intro__title">Tu hogar fuera de casa</h2>
              <p className="home-intro__text">
                Disfruta de la comodidad y el confort que te ofrecemos en nuestras habitaciones,
                diseñadas para que te sientas como en tu propio hogar. Contamos con servicios
                exclusivos y atención personalizada para hacer de tu estancia una experiencia inolvidable.
              </p>
              <Button variant="outline-primary" className="home-intro__btn">
                Ver Habitaciones
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
