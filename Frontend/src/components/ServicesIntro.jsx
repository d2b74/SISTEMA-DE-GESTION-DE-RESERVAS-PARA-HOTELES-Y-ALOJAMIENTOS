import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import servicesImages from '../data/servicesImages';
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

            <Carousel className="services-intro__carousel" indicators={false}>
              {servicesImages.map((url, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 services-intro__img"
                    src={url}
                    alt={`servicios ${i + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

          </Col>
        </Row>
      </Container>
    </section>
  );
}
