// src/pages/GalleryPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import Footer from '../components/Footer';
import { Gallery } from '../components/Gallery';
import './GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=12')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar imágenes');
        return res.json();
      })
      .then(data => setImages(data.map(item => item.download_url)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <HeroSearch  />  


      <section className="py-5" style={{ backgroundColor: '#E5DFFF' }}>
        <Container fluid="xxl">
          {loading && (
            <div className="text-center my-5"><Spinner animation="border" /></div>
          )}
          {error && (
            <Alert variant="danger" className="text-center">{error}</Alert>
          )}
          {!loading && !error && <Gallery images={images} />}
        </Container>
      </section>
      <Footer />
    </>
  );
}
