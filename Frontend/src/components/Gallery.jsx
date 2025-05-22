// src/components/Gallery.jsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./Gallery.css";

export default function Gallery({ images }) {
  const navigate = useNavigate();
  const { setBooking } = useBooking();

  const handleSelect = (room) => {
    setBooking({
      room,
      checkIn: '',
      checkOut: '',
      people: 1,
      isConfirmed: false,
    });
    navigate("/alquiler");
  };

  return (
    <div id="gallery" className="gallery-container">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {images.map((room, idx) => (
          <Col key={idx}>
            <Card className="gallery-card" onClick={() => handleSelect(room)}>
              <div className="gallery-card__img-wrapper">
                <Card.Img
                  variant="top"
                  src={room.url}
                  alt={room.title}
                  className="gallery-card__img"
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="gallery-card__title">
                  {room.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
