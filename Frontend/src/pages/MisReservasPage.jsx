// src/pages/MisReservasPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useReservations } from '../context/ReservationsContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MisReservasPage.css';

export default function MisReservasPage() {
  const { reservations, deleteReservation } = useReservations();
  const { user } = useAuth();
  const { setBooking } = useBooking();
  const navigate = useNavigate();

  // Filtrar reservas del usuario actual
  const userReservations = reservations.filter(r => r.userEmail === user?.mail);

  if (userReservations.length === 0) {
    return (
      <Container className="reservas-empty py-5 text-center">
        <h3>No tienes reservas aún.</h3>
      </Container>
    );
  }

  const handleEdit = (res) => {
    setBooking({
      room: res.room,
      checkIn: res.checkIn,
      checkOut: res.checkOut,
      people: res.people,
      isConfirmed: true,
      id: res.id,
    });
    navigate('/alquiler');
  };

  const handleCheckIn = (res) => {
    setBooking({
      room: res.room,
      checkIn: res.checkIn,
      checkOut: res.checkOut,
      people: res.people,
      isConfirmed: true,
      id: res.id,
    });
    navigate('/checkin');
  };

  const handleCancel = (id) => {
    if (window.confirm('¿Estás seguro que quieres cancelar esta reserva?')) {
      deleteReservation(id);
    }
  };

  const handleCheckout = (id) => {
    if (window.confirm('¿Confirmas el checkout de esta reserva?')) {
      deleteReservation(id);
      alert('Checkout realizado con éxito');
      navigate('/');
    }
  };

  return (
    <>
      <Header />
      <Container className="mis-reservas py-5">
        <h2 className="mb-4 text-center">Mis Reservas</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {userReservations.map((res) => (
            <Col key={res.id}>
              <Card className="reserva-card h-100">
                <Card.Img
                  variant="top"
                  src={res.room.url[0]}
                  className="reserva-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="reserva-title">{res.room.title}</Card.Title>
                  <div className="reserva-details flex-grow-1">
                    <div><strong>Fechas:</strong> {res.checkIn} → {res.checkOut}</div>
                    <div><strong>Personas:</strong> {res.people}</div>
                    <div><strong>Precio:</strong> ${res.price}</div>
                  </div>
                  <div className="d-flex flex-wrap justify-content-between reserva-actions">
                    {!res.checkInConfirmed ? (
                      <>
                        <Button variant="outline-primary" onClick={() => handleEdit(res)}>
                          Editar
                        </Button>
                        <Button variant="outline-success" onClick={() => handleCheckIn(res)}>
                          Check-in
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleCancel(res.id)}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleCheckout(res.id)}
                      >
                        Checkout
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}
