// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import roomImages from '../data/roomImages';
import './GalleryPage.css';
import { useLocation } from 'react-router-dom';


export default function GalleryPage() {

  const location = useLocation();
  // Inicializamos el estado local del alert
  const [alertInfo, setAlertInfo] = useState(location.state?.alert || null);
  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => {
        setAlertInfo(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  // Construimos la lista de habitaciones a partir de tus imágenes locales
  const rooms = roomImages.map((url, idx) => ({
    id: idx,
    url,
    title: `Habitación ${idx + 1}`,
    description: 'Una habitación exquisita con todas las comodidades.', // ajustar luego desde BD
    price: 100 + idx * 20,                                        // ejemplo de precio
  }));

  return (
    <>
      <Header />
      <HeroSearch />

      <section
        id="gallery"
        className="py-5"
        style={{ backgroundColor: '#E5DFFF' }}
      >
        <Container fluid="xxl">
          
          {alertInfo && (
            <Alert variant={alertInfo.variant} className="mb-4 text-center">
              {alertInfo.text}
            </Alert>
          )}
          <Gallery images={rooms} />
        </Container>
      </section>

      <Footer />
    </>
  );
}
