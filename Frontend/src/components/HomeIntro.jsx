import React from 'react';
import roomImages from '../data/roomImages';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import './HomeIntro.css';

export default function HomeIntro() {
  return (
    <section className="home-intro py-5">
      <Container fluid="xxl">
        <Row className="align-items-center">
          <Col xs={12} lg={6} className="home-intro__image-col mb-4 mb-lg-0">
            <Carousel className="home-intro__carousel" indicators={false}>
              {roomImages.map((url, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 home-intro__img"
                    src={url}
                    alt={`Habitación ${i + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} lg={6}>
            <div className="home-intro__content">
              <h2 className="home-intro__title">Tu hogar fuera de casa</h2>
              <p className="home-intro__text">
                Disfruta de la comodidad y el confort que te ofrecemos en nuestras habitaciones.
              </p>
              <HashLink to="/gallery#gallery" smooth>
                <Button variant="outline-primary" className="home-intro__btn">
                  Ver Habitaciones
                </Button>
              </HashLink>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
