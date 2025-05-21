// src/pages/GalleryPage.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import roomImages from '../data/roomImages';
import './GalleryPage.css';

export default function GalleryPage() {
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
          <Gallery images={rooms} />
        </Container>
      </section>

      <Footer />
    </>
  );
}
