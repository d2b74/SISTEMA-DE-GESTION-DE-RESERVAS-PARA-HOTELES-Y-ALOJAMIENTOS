// checkinModel.js
import { pool } from "../db.js"; // Importar la conexión a la base de datos

export const checkinModel = {
  getCheckins: async () => {
    const [rows] = await pool.query("SELECT * FROM checkin");
    return rows;
  },
  getCheckinById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM checkin WHERE id_checkin = ?", [id]);
    return rows[0];
  },
  createCheckin: async (data) => {
    const { id_reserva, descripcion, usuario, hora } = data;
    const [result] = await pool.query(
      "INSERT INTO checkin (id_reserva, descripcion, usuario, hora) VALUES (?, ?, ?, ?)",
      [id_reserva, descripcion, usuario, hora]
    );
    return { id: result.insertId, ...data };
  },
  updateCheckin: async (id, data) => {
    const [result] = await pool.query("UPDATE checkin SET ? WHERE id_checkin = ?", [data, id]);
    return result;
  },
  deleteCheckin: async (id) => {
    const [result] = await pool.query("DELETE FROM checkin WHERE id_checkin = ?", [id]);
    return result;
  }
};
