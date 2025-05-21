import React from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import roomImg from '../assets/home.jpeg'; // tu imagen local
import './RoomPage.css';

export default function RoomPage() {
  return (
    <>
      <Header />

      <section className="room-page">
        <div className="room-page__split">
          {/* Columna izquierda: imagen */}
          <div className="room-page__left">
            <img
              src={roomImg}
              alt="Habitación Matrimonial"
              className="room-page__img"
            />
          </div>

          {/* Columna derecha: contenido */}
          <div className="room-page__right">
            <div className="room-page__panel">
              <h3 className="room-page__heading">Habitación Matrimonial</h3>
              <p className="room-page__text">
                Elegante habitación de 40m² con vista panorámica a las montañas,
                cama king-size, caja de seguridad y minibar.
              </p>
            </div>

            <div className="room-page__panel room-page__prefs">
              <h4 className="room-page__prefs-title">Tus Preferencias</h4>
              <ul className="room-page__prefs-list">
                <li><strong>Check-in:</strong> 10/05/25</li>
                <li><strong>Check-out:</strong> 12/05/25</li>
                <li><strong>Personas:</strong> 02</li>
              </ul>
              <Button variant="primary" className="room-page__prefs-btn">
                Reservar
              </Button>
            </div>

            <div className="room-page__services">
              {[
                { icon: '📶', label: 'WiFi' },
                { icon: '🌳', label: 'Jardín' },
                { icon: '🏔️', label: 'Vista' },
                { icon: '🚨', label: 'Detector' },
                { icon: '📲', label: 'Digital' },
              ].map(svc => (
                <div key={svc.label} className="room-page__svc-item">
                  <span className="room-page__svc-icon">{svc.icon}</span>
                  <span className="room-page__svc-label">{svc.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
