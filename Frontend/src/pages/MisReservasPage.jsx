// src/pages/MisReservasPage.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useReservations } from '../context/ReservationsContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './MisReservasPage.css';

export default function MisReservasPage() {
  const { reservations, deleteReservation, fetchReservations, doCheckout } = useReservations();

  const { user } = useAuth();
  const { booking, setBooking } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id_huesped) {
      fetchReservations();
    }
  }, [user]);



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
    navigate(`/alquiler/${res.id}`);
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

  const handleCheckout = async (res) => {
    if (window.confirm('¿Confirmas el checkout de esta reserva?')) {
      await doCheckout(res.id, user.id_usuario);
      alert('Checkout realizado con éxito');
      navigate(`/encuesta/${res.id}`);
    }
  };

  return (
    <>
      <Header />
      <Container className="mis-reservas py-5">
        <h2 className="mb-4 text-center">Mis Reservas</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {userReservations.map((res, index) => (
            <Col key={`${res.id}-${index}`}>
              <Card className="reserva-card h-100">
                <Card.Img
                  variant="top"
                  src={res.room?.url?.[0] || '/default-room.jpg'}
                  className="reserva-img"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="reserva-title">{res.room?.title || 'Habitación no disponible'}</Card.Title>
                  <div className="reserva-details flex-grow-1">
                    <div><strong>Fechas:</strong> {res.checkIn ? new Date(res.checkIn).toLocaleDateString('es-AR') : ''} → {res.checkOut ? new Date(res.checkOut).toLocaleDateString('es-AR') : ''}</div>
                    <div><strong>Personas:</strong> {res.people}</div>
                    <div><strong>Precio:</strong> ${res.price || 'N/A'}</div>
                  </div>
              
                  <div className="d-flex flex-wrap justify-content-between reserva-actions">
                    {res.checkoutDone && res.encuestaRespondida ? (
                      // Si hizo checkout y ya respondió la encuesta → NO mostrar ningún botón
                      null
                    ) : res.checkoutDone ? (
                      // Si hizo checkout pero NO respondió encuesta → mostrar botón para responder
                      <Button
                        variant="info"
                        className="w-100"
                        onClick={() => navigate(`/encuesta/${res.id}`)}
                      >
                        Responder Encuesta
                      </Button>
                    ) : !res.checkInConfirmed ? (
                      // Si NO hizo check-in aún → opciones de editar, check-in y cancelar
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
                      // Si hizo check-in pero NO hizo checkout aún → mostrar botón checkout
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleCheckout(res)}
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
