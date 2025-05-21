// src/pages/AlquilerYPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { useBooking } from '../context/BookingContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AlquilerYPage.css';

export default function AlquilerYPage() {
  const today = new Date().toISOString().split('T')[0];
  const { booking, setBooking } = useBooking();
  const { room, checkIn, checkOut, people, isConfirmed } = booking;

  // Estados locales para controlar los date inputs
  const [localCheckIn, setLocalCheckIn] = useState(checkIn || '');
  const [localCheckOut, setLocalCheckOut] = useState(checkOut || '');
  const [localPeople, setLocalPeople] = useState(people || 1);

  // Sincronizar context cuando cambien local states
  useEffect(() => {
    setBooking((b) => ({
      ...b,
      checkIn: localCheckIn,
      checkOut: localCheckOut,
      people: localPeople,
    }));
  }, [localCheckIn, localCheckOut, localPeople, setBooking]);

  const handleSubmit = () => {
    // Aquí llamas a tu API: si isConfirmed -> editar, si no -> crear

    if (!localCheckIn || !localCheckOut) {
      return alert('Por favor completa ambas fechas.');
    }
    if (localCheckOut <= localCheckIn) {
      return alert('La fecha de check-out debe ser posterior al check-in.');
    }
    if (isConfirmed) {
      // updateReservation(booking)
      alert('Editando reserva existente...');
    } else {
      // createReservation(booking)
      alert('Creando nueva reserva...');
    }


    // ... llamada a API ...
    setBooking(b => ({ ...b, isConfirmed: true }));
  };

  return (
    <>
      <Header />

      <section className="alquiler-page">
        <Container fluid className="px-0 alquiler-wrapper">
          <Row noGutters className="align-items-stretch">
            {/* Izquierda: imagen semicircular */}
            <Col xs={12} lg={6} className="alquiler-left p-0">
              {room && (
                <div className="img-mask">
                  <img src={room.url} alt={room.title} className="alquiler-img" />
                </div>
              )}
            </Col>

            {/* Derecha: descripción + form + servicios */}
            <Col xs={12} lg={6} className="alquiler-right">
              {/* Descripción */}
              <div className="panel desc-panel">
                <h3>{room?.title}</h3>
                <p>{room?.description}</p>
              </div>

              {/* Preferencias con DatePickers */}
              <div className="panel prefs-panel">
                <div className="prefs-header">
                  <span className="price">${room?.price}</span>
                  <small>por {localPeople} noche(s)</small>
                </div>

                <Form className="prefs-form">
                  <Form.Group className="mb-3" controlId="checkIn">
                    <Form.Label>Desde</Form.Label>
                    <Form.Control
                      type="date"
                      min={today}
                      value={localCheckIn}
                      onChange={e => setLocalCheckIn(e.target.value)}
                        required    
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="checkOut">
                    <Form.Label>Hasta</Form.Label>
                    <Form.Control
                      type="date"
                      min={localCheckIn || today }
                      value={localCheckOut}
                      onChange={e => setLocalCheckOut(e.target.value)}
                        required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="people">
                    <Form.Label>Personas</Form.Label>
                    <Form.Select
                      value={localPeople}
                      onChange={e => setLocalPeople(Number(e.target.value))}
                    >
                      {[1,2,3,4,5].map(n => (
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
                  {isConfirmed ? 'Confirmar cambios' : 'Reservar'}
                </Button>
              </div>

              {/* Servicios */}
              <div className="panel services-panel">
                <h4>Otros Servicios</h4>
                <div className="services-icons">
                  {[
                    { icon: '📶', label: 'WiFi' },
                    { icon: '🌳', label: 'Jardín Privado' },
                    { icon: '🏔️', label: 'Vista Montaña' },
                    { icon: '🚨', label: 'Detector Humo' },
                    { icon: '📲', label: 'Check-in Digital' },
                  ].map(svc => (
                    <div key={svc.label} className="svc-item">
                      <div className="svc-icon">{svc.icon}</div>
                      <div className="svc-label">{svc.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}
