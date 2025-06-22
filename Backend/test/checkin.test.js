import request from 'supertest';
import app from '../app.js'; // Asegúrate de exportar tu instancia de Express desde app.js
import { checkinModel } from '../Models/checkinModel.js';

jest.mock('../Models/checkinModel.js'); // Mock del modelo

describe('GET /Check-in/:id', () => {
  it('debería devolver un check-in existente', async () => {
    const mockCheckin = {
      id_checkin: 1,
      id_reserva: 1,
      descripcion: "Llegada de huéspedes",
      usuario: 7,
      fecha: "2025-06-10T03:00:00.000Z",
      hora: "14:00:00"
    };

    checkinModel.getCheckinById.mockResolvedValue(mockCheckin);

    // Llamamos al endpoint con mayúscula y guión tal como está en la app
    const response = await request(app).get('/Check-in/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockCheckin);
  });

  it('debería devolver 404 si el check-in no existe', async () => {
    checkinModel.getCheckinById.mockResolvedValue(undefined);

    const response = await request(app).get('/Check-in/999');

    expect(response.statusCode).toBe(404);
    // Ahora esperamos el mensaje que devuelve tu implementación
    expect(response.body).toEqual({ message: "Check-in no encontrado" });
  });
});
