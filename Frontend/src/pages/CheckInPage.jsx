// src/pages/CheckInPage.jsx
import React from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationsContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './CheckInPage.css';

export default function CheckInPage() {
  const { booking } = useBooking();
  const { user } = useAuth();
  const { updateReservation , doCheckin} = useReservations();
  const navigate = useNavigate();

  // Calcular noches y total
  const nights = booking.checkIn && booking.checkOut
    ? (new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000*60*60*24)
    : 0;
  const totalCost = nights * booking.room.price;

  const handleConfirm = async () => {
    const payload = {
      id: booking.id,
      habitaciones: [booking.room.id_habitacion],
      id_huesped: user.id_huesped,
      fecha_inicio: booking.checkIn,
      fecha_fin: booking.checkOut,
      personas: booking.people,
      
      estado: 2  // o el estado que corresponda si ya hizo check-in
    };

    try {
      
      await doCheckin(booking.id, user.dni);
      alert('Check-in confirmado con éxito');
      navigate('/reservas');
    } catch (err) {
      alert('Error durante el check-in');
      console.error(err);
    }
  };


  return (
    <>
      <Header />
      <Container className="checkin-page py-5">
        <Card className="mx-auto checkin-card">
          <Card.Header as="h3">Confirmación de Check-in</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Nombre:</strong> {user.nombre} {user.apellido}</ListGroup.Item>
              <ListGroup.Item><strong>DNI:</strong> {user.dni}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {user.mail}</ListGroup.Item>
              <ListGroup.Item><strong>Habitación:</strong> {booking.room.nombre}</ListGroup.Item>
              <ListGroup.Item><strong>Precio/noche:</strong> ${booking.room.numero}</ListGroup.Item>
              <ListGroup.Item><strong>Fechas:</strong> {booking.checkIn} → {booking.checkOut}</ListGroup.Item>
              <ListGroup.Item><strong>Noches:</strong> {nights || '--'}</ListGroup.Item>
              <ListGroup.Item><strong>Personas:</strong> {booking.people}</ListGroup.Item>
              <ListGroup.Item><strong>Total a pagar:</strong> ${totalCost || '--'}</ListGroup.Item>
            </ListGroup>
            <div className="mt-4 text-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate('/reservas')}>
                Volver
              </Button>
              <Button variant="success" onClick={handleConfirm}>
                Confirmar Check-in
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
