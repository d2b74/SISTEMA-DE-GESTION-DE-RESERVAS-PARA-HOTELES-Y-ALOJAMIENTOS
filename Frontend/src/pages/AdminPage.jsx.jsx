// src/pages/AdminPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import Main from '../components/AdminMain';           // tu panel central
import Footer from '../components/Footer';
import './AdminPage.css';

export default function AdminPage() {
  return (
    <div className="admin-page d-flex flex-column vh-100">
      {/* Navbar superior */}
      <Header />

      {/* Contenedor central: sidebar + contenido */}
      <Container fluid className="flex-grow-1 p-0">
        <Row  className="h-100">
          {/* Sidebar */}
          <Col xs={2} className="sidebar p-3">
            <MenuLateral />
          </Col>
            
          {/* Área de trabajo */}
          <Col xs={10} className="workspace p-4 overflow-auto">
            <Main />
          </Col>
        </Row>
      </Container>

      {/* Footer al fondo */}
      <Footer />
    </div>
  );
}
