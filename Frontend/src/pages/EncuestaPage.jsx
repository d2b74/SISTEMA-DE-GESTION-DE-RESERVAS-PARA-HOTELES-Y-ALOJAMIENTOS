// src/pages/EncuestaPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useReservations } from '../context/ReservationsContext';
import './EncuestaPage.css';
import { getPreguntasRequest, getOpcionesPorPreguntaRequest,crearEncuestaRequest  } from '../api/encuesta';
export default function EncuestaPage() {
  const { idReserva } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [preguntas, setPreguntas] = useState([]);
  
  const [seleccionadas, setSeleccionadas] = useState({});
  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const fetchPreguntasYRespuestas = async () => {
    try {
        const preguntasRes = await getPreguntasRequest();
        const opcionesRes = await getOpcionesPorPreguntaRequest();

        const preguntasData = preguntasRes.data.data || preguntasRes.data;
        const opcionesData = opcionesRes.data;

        // 🔒 Validación de tipo
        if (!Array.isArray(preguntasData)) throw new Error('preguntas no es un array');
        if (!Array.isArray(opcionesData)) throw new Error('opcionesData no es un array');

        // Agrupar opciones por pregunta
        const opcionesPorPregunta = {};
        opcionesData.forEach(op => {
        if (!opcionesPorPregunta[op.id_pregunta]) {
            opcionesPorPregunta[op.id_pregunta] = [];
        }
        opcionesPorPregunta[op.id_pregunta].push(op.respuesta);
        });

        // Asignar opciones a cada pregunta
        const preguntasConOpciones = preguntasData.map(p => ({
        ...p,
        opciones: opcionesPorPregunta[p.id_pregunta] || []
        }));

        setPreguntas(preguntasConOpciones);
    } catch (err) {
        console.error('Error al cargar preguntas:', err);
    }
    };


    fetchPreguntasYRespuestas();
  }, []);

  const handleChange = (id_pregunta, valor) => {
    setSeleccionadas(prev => ({
      ...prev,
      [id_pregunta]: valor
    }));
  };
  const { fetchReservations } = useReservations();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const respuestas = preguntas.map(p => ({
      id_pregunta: p.id_pregunta,
      respuesta: seleccionadas[p.id_pregunta] || ''
    }));

    // Validar que todas estén respondidas
    if (respuestas.some(r => !r.respuesta)) {
      setError('Por favor responde todas las preguntas');
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];

      await crearEncuestaRequest({
        encuesta: {
          id_reserva: parseInt(idReserva),
          id_huesped: user.id_huesped,
          fecha: today,
          respuestas
        }
      });
      await fetchReservations(); // <-- recarga reservas del backend
      setEnviado(true);
      setError(null);
      setTimeout(() => navigate('/reservas'), 1500);
    } catch (err) {
      console.error('Error al enviar encuesta:', err);
      setError('No se pudo enviar la encuesta');
    }


  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <Card className="p-4">
          <h2 className="mb-4 text-center">Encuesta de satisfacción</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {enviado && <Alert variant="success">¡Gracias por tu respuesta!</Alert>}

          <Form onSubmit={handleSubmit}>
            {Array.isArray(preguntas) && preguntas.map((p) => (
            <Form.Group className="mb-4" key={p.id_pregunta}>
                <Form.Label>
                <strong>{p.titulo}</strong><br />
                <small>{p.descripcion}</small>
                </Form.Label>
                <Form.Select
                value={seleccionadas[p.id_pregunta] || ''}
                onChange={e => handleChange(p.id_pregunta, e.target.value)}
                >
                <option value="">-- Seleccionar --</option>
                {Array.isArray(p.opciones) && p.opciones.map((resp, i) => (
                    <option key={i} value={resp}>{resp}</option>
                ))}
                </Form.Select>
            </Form.Group>
            ))}

            <Button type="submit" variant="primary" className="w-100">Enviar Encuesta</Button>
          </Form>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
