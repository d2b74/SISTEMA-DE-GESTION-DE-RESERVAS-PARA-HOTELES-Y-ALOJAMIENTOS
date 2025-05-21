// src/components/HeroSearch.jsx
import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './HeroSearch.css';


export default function HeroSearch() {
  const { booking, setBooking } = useBooking();
  const navigate = useNavigate();

  const [local, setLocal] = useState(booking);

  const handleSearch = () => {
    setBooking(local);
    navigate('/alquiler');
  };  
  return (
    <section >
      <div className="hero">
      
      <h1 className="hero__title">Hotel & Resort</h1>
      </div>
      
      <Container fluid className="hero__content px-0">
        <p className="hero__tagline">
          Vive la experiencia de lujo y confort en cada estancia
        </p>

      </Container>


    </section>

    
  );
}
