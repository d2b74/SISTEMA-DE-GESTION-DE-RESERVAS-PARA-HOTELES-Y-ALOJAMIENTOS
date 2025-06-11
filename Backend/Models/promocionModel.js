import { pool } from '../db.js'; // Importar la conexión a la base de datos

export const promocionModel = {
  // Obtener todas las promociones
  getPromociones: async () => {
    const [rows] = await pool.query(`
      SELECT id_promocion, nombre, descripcion, precio
      FROM promocion
    `);
    return rows;
  },

  // Obtener una promoción por ID
  getPromocionById: async (id) => {
    const [rows] = await pool.query(`
      SELECT id_promocion, nombre, descripcion, precio
      FROM promocion
      WHERE id_promocion = ?
    `, [id]);
    return rows[0];
  },

  // Crear una nueva promoción
  createPromocion: async ({ nombre, descripcion, precio }) => {
    const [result] = await pool.query(`
      INSERT INTO promocion (nombre, descripcion, precio)
      VALUES (?, ?, ?)
    `, [nombre, descripcion, precio]);

    return {
      id_promocion: result.insertId,
      nombre,
      descripcion,
      precio
    };
  },

  // Actualizar una promoción (campos fijos)
  updatePromocion: async ({ nombre, descripcion, precio }, id) => {
    const query = `
      UPDATE promocion
      SET nombre = ?, descripcion = ?, precio = ?
      WHERE id_promocion = ?
    `;
    const [result] = await pool.query(query, [nombre, descripcion, precio, id]);
    return result.affectedRows;
  },

  // Eliminar una promoción
  deletePromocion: async (id) => {
    const [result] = await pool.query(`
      DELETE FROM promocion
      WHERE id_promocion = ?
    `, [id]);
    return result.affectedRows;
  }
};
