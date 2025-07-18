// src/pages/AlquilerYPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams} from 'react-router-dom';
import { getReservaByIdRequest } from '../api/reserva';
import './AlquilerYPage.css';

export default function AlquilerYPage() {
  const { idReserva } = useParams();
  const today = new Date().toISOString().split('T')[0];
  const { booking, setBooking } = useBooking();
  const { room, isConfirmed } = booking;
  const [localCheckIn, setLocalCheckIn] = useState(booking.checkIn || '');
  const [localCheckOut, setLocalCheckOut] = useState(booking.checkOut || '');
  const [localPeople, setLocalPeople] = useState(booking.people || 1);
  const { addReservation, updateReservation, isRoomAvailable } = useReservations();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setBooking(b => ({ ...b, checkIn: localCheckIn, checkOut: localCheckOut, people: localPeople }));
  }, [localCheckIn, localCheckOut, localPeople, setBooking]);
  

  useEffect(() => {
    if (booking.isConfirmed && booking.checkIn && booking.checkOut) {
      setLocalCheckIn(booking.checkIn);
      setLocalCheckOut(booking.checkOut);
      setLocalPeople(booking.people);
    }
  }, [booking]);

  useEffect(() => {
    const fetchReserva = async () => {
      if (!idReserva) return;
      setIsLoading(true);
      try {
        const { data } = await getReservaByIdRequest(idReserva);
        console.log('Reserva cargada:', data);

        setBooking({
          id: data.id_reserva,
          checkIn: data.fecha_inicio.split('T')[0],
          checkOut: data.fecha_fin.split('T')[0],
          people: data.personas,
          estado: data.estado,
          room: {
            id_habitacion: data.id_habitacion,
            numero: data.numero_habitacion,
            url: data.urls_habitacion,
            title: `Habitación ${data.numero_habitacion}`,
            precio: data.precio
          },
          isConfirmed: true
        });

      } catch (err) {
        console.error('Error al cargar reserva:', err.response?.data || err.message);
        alert('No se pudo cargar la reserva');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReserva();
  }, [idReserva, setBooking]);




  const validateBooking = () => {
    if (!user) {
      alert('Debes iniciar sesión para hacer una reserva.');
      navigate('/login');
      return false;
    }
    if (!localCheckIn || !localCheckOut) {
      alert('Por favor completa ambas fechas.');
      return false;
    }
    if (localCheckOut <= localCheckIn) {
      alert('La fecha de check-out debe ser posterior al check-in.');
      return false;
    }
    if (!isRoomAvailable(
          room.id_habitacion,
          localCheckIn,
          localCheckOut,
          isConfirmed ? booking.id : undefined
        )) {
      alert('La habitación ya está reservada en esas fechas. Elige otras.');
      return false;
    }




    return true;
  };

  const handleSubmit = async () => {
    if (!validateBooking()) return;

    const payload = {
      id: booking.id,
      habitaciones: [room.id_habitacion],
      id_huesped: user.id_huesped,
      fecha_inicio: localCheckIn,
      fecha_fin: localCheckOut,
      personas: localPeople,
      precio: room.precio || 0,
      estado: isConfirmed ? booking.estado : 2 
    };

    console.log('Payload que se envía a updateReservation:', payload);
    let message;
    if (isConfirmed) {
      await updateReservation(payload);
      message = 'Reserva actualizada con éxito';
    } else {
      await addReservation(payload);
      message = 'Reserva creada con éxito';
    }

    setLocalCheckIn('');
    setLocalCheckOut('');
    setLocalPeople(1);
    setBooking({ checkIn: '', checkOut: '', people: 1, room: null, isConfirmed: false });

    navigate("/gallery#gallery", {
      state: { alert: { variant: 'success', text: message } }
    });
  };

  if (!room) {
    return (
      <Container className="py-5 text-center">
        <h3>Selecciona primero una habitación en la galería.</h3>
      </Container>
    );
  }
  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <h3>Cargando datos de la reserva...</h3>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <section className="alquiler-page">
        <Container fluid className="px-0 alquiler-wrapper">
          <Row className="align-items-stretch">
            <Col xs={12} lg={6} className="alquiler-left p-0">
              {room && (
                <div className="img-mask">
                  <img src={room.url[0]} alt={room.title} className="alquiler-img" />
                </div>
              )}
            </Col>
            <Col xs={12} lg={6} className="alquiler-right">
              <div className="panel desc-panel">
                <h3>{'Habitacion ' + room?.numero || 'Selecciona una habitación'}</h3>
                <p>{room?.descripcion || 'Elige una habitación desde la galería.'}</p>
              </div>
              <div className="panel prefs-panel">
                <div className="prefs-header">
                  <span className="price">${room?.precio || '--'}</span>
                  <small>por {localPeople} noche(s)</small>
                </div>
                <Form>
                  <Form.Group className="mb-3" controlId="checkIn">
                    <Form.Label>Desde</Form.Label>
                    <Form.Control
                      type="date"
                      min={today}
                      value={localCheckIn}
                      onChange={e => setLocalCheckIn(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="checkOut">
                    <Form.Label>Hasta</Form.Label>
                    <Form.Control
                      type="date"
                      min={localCheckIn || today}
                      value={localCheckOut}
                      onChange={e => setLocalCheckOut(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="people">
                    <Form.Label>Personas</Form.Label>
                    <Form.Select
                      value={localPeople}
                      onChange={e => setLocalPeople(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSubmit}
                >
                    {isConfirmed ? 'Modificar' : 'Reservar'}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
