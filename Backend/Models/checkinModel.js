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
    const { id_reserva, descripcion, usuario, fecha, hora } = data;

    // 1. Insertar el check-in
    const [result] = await pool.query(
      `INSERT INTO checkin
      (id_reserva, descripcion, usuario, fecha, hora)
      VALUES (?, ?, ?, ?, ?)`,
      [id_reserva, descripcion || null, usuario, fecha, hora]
    );

    // 2. Cambiar el estado de la habitación a OCUPADA (estado = 3)
    await pool.query(`
      UPDATE habitacion
      SET estado = 3
      WHERE id_habitacion IN (
        SELECT id_habitacion
        FROM habitacion_reserva
        WHERE id_reserva = ?
      )
    `, [id_reserva]);

    // Retornar info del nuevo check-in
    return {
      id: result.insertId,
      id_reserva,
      descripcion,
      usuario,
      fecha,
      hora
    };
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
