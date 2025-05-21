// src/components/RoomCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

export function RoomCard({ room, onSelect }) {
  return (
    <Card onClick={() => onSelect(room.id)} className="h-100 cursor-pointer">
      <Card.Img variant="top" src={room.image} />
      <Card.Body>
        <Card.Title>{room.name}</Card.Title>
        <Card.Text className="text-muted">{room.description}</Card.Text>
        <Card.Text className="fw-bold">${room.price}/noche</Card.Text>
      </Card.Body>
    </Card>
  );
}