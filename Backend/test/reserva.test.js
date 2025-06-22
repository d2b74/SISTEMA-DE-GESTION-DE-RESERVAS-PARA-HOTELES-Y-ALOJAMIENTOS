// test/reserva.test.js

import request from 'supertest';
import express from 'express';
import { Reserva } from '../Controllers/reservaController.js';
import { reservaModel } from '../Models/reservaModel.js';
import { validateReserva } from '../schemas/reserva.js';

jest.mock('../Models/reservaModel.js');
jest.mock('../schemas/reserva.js');

describe('POST /reserva', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    // Montamos solo la ruta de creación de reserva
    app.post('/reserva', Reserva.createReservaHandler);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('debería crear una reserva y devolverla con 201', async () => {
    // Payload de entrada
    const payload = {
      usuario: 7,
      fecha_ingreso: '2025-07-01',
      fecha_salida: '2025-07-05',
      habitaciones: [101, 102]
    };

    // Simulamos validación exitosa
    validateReserva.mockReturnValue({
      success: true,
      data: payload
    });

    // Simulamos creación en el modelo
    const created = { id_reserva: 42, ...payload };
    reservaModel.createReserva.mockResolvedValue(created);

    const res = await request(app)
      .post('/reserva')
      .send(payload);

    // Verifica que se haya validado y llamado al modelo
    expect(validateReserva).toHaveBeenCalledWith(payload);
    expect(reservaModel.createReserva).toHaveBeenCalledWith(payload);

    // Verifica la respuesta HTTP
    expect(res.status).toBe(201);
    expect(res.body).toEqual(created);
  });

  it('debería devolver 400 si la validación falla', async () => {
    const payload = { usuario: 7 }; // datos incompletos

    // Simulamos validación fallida
    validateReserva.mockReturnValue({
      success: false,
      error: { errors: ['Fecha de ingreso requerida'] }
    });

    const res = await request(app)
      .post('/reserva')
      .send(payload);

    expect(validateReserva).toHaveBeenCalledWith(payload);
    // No debe llamar al modelo si la validación falla
    expect(reservaModel.createReserva).not.toHaveBeenCalled();

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: ['Fecha de ingreso requerida'] });
  });

  it('debería propagar el error si el modelo falla', async () => {
    const payload = {
      usuario: 7,
      fecha_ingreso: '2025-07-01',
      fecha_salida: '2025-07-05',
      habitaciones: [101]
    };

    validateReserva.mockReturnValue({ success: true, data: payload });
    reservaModel.createReserva.mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/reserva')
      .send(payload);

    // Como usamos asyncHandler, un error en el modelo debería terminar en 500
    expect(res.status).toBe(500);
    // Por defecto asyncHandler podría enviar texto genérico
    expect(res.body).toEqual({});
  });
});
