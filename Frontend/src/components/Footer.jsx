// src/components/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Izquierda */}
        <div className="footer__left">
          <div className="footer__logo">🏨</div>
          <div className="footer__info">
            Ruta 18 km 16 | Lorem ipsum | 1234 | CP (0000)<br/>
            reservas@hotelresort.com.ar
          </div>
        </div>

        {/* Centro */}
        <div className="footer__center">
          <div className="footer__icon">✕</div>
          <div className="footer__icon"><FaInstagram /></div>
          <div className="footer__icon"><FaTiktok /></div>
        </div>

        {/* Derecha */}
        <div className="footer__right">
          DYNACORD © {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS
        </div>
      </div>

      {/* Banda inferior semitransparente */}
      <div className="footer__band" />
    </footer>
  );
}
