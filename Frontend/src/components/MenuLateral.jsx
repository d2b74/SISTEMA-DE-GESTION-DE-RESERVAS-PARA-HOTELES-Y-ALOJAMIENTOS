// src/components/MenuLateral.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MenuLateral.css';

export default function MenuLateral() {
  const navigate = useNavigate();
  const items = [
    { label: 'Gestión de Precios', icon: '💲', path: '/admin/precios' },
    { label: 'Reportes', icon: '📑', path: '/admin/reportes' },
    { label: 'Clientes', icon: '👥', path: '/admin/clientes' },
    { label: 'Usuarios', icon: '👤', path: '/admin/usuarios' },
    { label: 'Gestión', icon: '⚙️', path: '/admin/gestion' },
  ];

  return (
    <Nav className="flex-column menu-lateral p-3">
      {items.map(item => (
        <Nav.Link
          key={item.path}
          className="d-flex align-items-center mb-3 text-dark"
          onClick={() => navigate(item.path)}
        >
          <span className="me-2 fs-4">{item.icon}</span>
          <span>{item.label}</span>
        </Nav.Link>
      ))}
    </Nav>
  );
}