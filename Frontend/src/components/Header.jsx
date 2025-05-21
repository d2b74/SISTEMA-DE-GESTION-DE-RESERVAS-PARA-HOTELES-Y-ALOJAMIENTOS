// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {  Link, useNavigate  } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <Navbar expand="lg" className="header">
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/" className="header__brand">
          <span role="img" aria-label="hotel">🏨</span>
          <span className="header__brand-text">Hotel &amp; Resort</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto header__nav">
            {[
              { label: 'Home', to: '/' },

              { label: 'Gallery', to: "/gallery#gallery" },
              { label: 'Contact', to: '/contact' },
              { label: 'Login', to: '/login' },
            ].map(({ label, to }) => (
              <Nav.Link
                as={Link}
                key={label}
                to={to}
                className="header__link"
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
