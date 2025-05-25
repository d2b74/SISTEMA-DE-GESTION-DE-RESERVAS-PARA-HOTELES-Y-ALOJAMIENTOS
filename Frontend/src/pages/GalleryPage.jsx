// src/pages/GalleryPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
//import roomImages from '../data/roomImages';
import './GalleryPage.css';
import { useLocation } from 'react-router-dom';
import { useRooms } from '../context/RoomsContext';


export default function GalleryPage() {

  const location = useLocation();
  const { rooms, loading, error } = useRooms();

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
  
  if (loading) return <Spinner animation="border" className="m-auto" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
 // Combinamos datos reales con imágenes locales
/*  //eliminar esto cuando el back-end esté listo
const galleryRooms = rooms.map((room, idx) => ({
  ...room,
  url: roomImages[idx % roomImages.length], // agregamos la imagen sin cambiar los atributos existentes
})); */

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
