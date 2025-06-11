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
    const [result] = await pool.query(
      `INSERT INTO checkout
       (id_reserva, descripcion, usuario, fecha, hora)
       VALUES (?, ?, ?, ?, ?)`,
      [id_reserva, descripcion || null, usuario, fecha, hora]
    );
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
