// test/checkin.test.js
const request = require('supertest');
const app = require('../app.js');
const checkinModel = require('../Models/checkinModel.js');

jest.mock('../Models/checkinModel.js');

describe('GET /checkin/:id', () => {
  it('debe devolver un check-in existente', async () => {
    const mockCheckin = {
      id_checkin: 1,
      id_reserva: 1,
      descripcion: "Llegada de huéspedes",
      usuario: 7,
      fecha: "2025-06-10T03:00:00.000Z",
      hora: "14:00:00"
    };

    checkinModel.getCheckinById.mockResolvedValue(mockCheckin);

    const res = await request(app).get('/checkin/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockCheckin);
  });

  it('debe devolver 404 si no existe el check-in', async () => {
    checkinModel.getCheckinById.mockResolvedValue(undefined);

    const res = await request(app).get('/checkin/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Check-in no encontrado" });
  });
});
