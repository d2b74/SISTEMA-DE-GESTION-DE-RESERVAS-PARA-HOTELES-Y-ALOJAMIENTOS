// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // redirige al home
  };

  // Define tus links dinámicamente:
  const commonLinks = [
    { label: 'Home', to: '/' },
    { label: 'Gallery', to: '/gallery#gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  const authLinks = user
    ? [
        { label: 'Mis Reservas', to: '/reservas' },
        { label: 'Logout', action: handleLogout },
      ]
    : [
        { label: 'Login', to: '/login' },
      ];

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
            {commonLinks.concat(authLinks).map(({ label, to, action }) => (
              action ? (
                <Nav.Link
                  key={label}
                  onClick={action}
                  className="header__link"
                >
                  {label}
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  key={label}
                  to={to}
                  className="header__link"
                >
                  {label}
                </Nav.Link>
              )
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
