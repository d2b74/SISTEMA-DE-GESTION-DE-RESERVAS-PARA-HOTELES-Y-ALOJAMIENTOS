import { pool } from "../db.js";

export const checkoutModel = {
  // Obtener todos los check-outs
  getCheckouts: async () => {
    const [rows] = await pool.query("SELECT * FROM checkout");
    return rows;
  },

  // Obtener un check-out por ID
  getCheckoutById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM checkout WHERE id_checkout = ?",
      [id]
    );
    return rows[0];
  },

  // Crear un check-out
  createCheckout: async (data) => {
    const { id_reserva, descripcion, usuario, fecha, hora } = data;

    // 1. Insertar el checkout
    const [result] = await pool.query(
      `INSERT INTO checkout (id_reserva, descripcion, usuario, fecha, hora)
      VALUES (?, ?, ?, ?, ?)`,
      [id_reserva, descripcion || null, usuario, fecha, hora]
    );

    // 2. Cambiar estado de la habitación a mantenimiento (4)
    await pool.query(`
      UPDATE habitacion
      SET estado = 4
      WHERE id_habitacion IN (
        SELECT id_habitacion FROM habitacion_reserva WHERE id_reserva = ?
      )
    `, [id_reserva]);

    // 3. Cambiar estado de la reserva a libre (1)
    await pool.query(`
      UPDATE reserva
      SET estado = 1
      WHERE id_reserva = ?
    `, [id_reserva]);

    return {
      id: result.insertId,
      id_reserva,
      descripcion,
      usuario,
      fecha,
      hora,
    };
  },


  // Actualizar un check-out
  updateCheckout: async (id, data) => {
    const query = `
      UPDATE checkout
      SET ? 
      WHERE id_checkout = ?
    `;
    const [result] = await pool.query(query, [data, id]);
    return result;
  },

  // Eliminar un check-out
  deleteCheckout: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM checkout WHERE id_checkout = ?",
      [id]
    );
    return result;
  },
};
