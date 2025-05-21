// src/components/Gallery.jsx
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export function Gallery({ images }) {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Galería</h2>
      <Row xs={1} sm={2} lg={4} className="g-3">
        {images.map((src, idx) => (
          <Col key={idx}>
            <Image src={src} alt={`Galería ${idx + 1}`} fluid rounded />
          </Col>
        ))}
      </Row>
    </Container>
  );
}