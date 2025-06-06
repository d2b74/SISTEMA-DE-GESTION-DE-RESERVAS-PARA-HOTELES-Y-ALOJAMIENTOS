// Models/temporadaModel.js
import { pool } from '../db.js'; // Importar la conexión a la base de datos

export const temporadaModel = {
  // Obtener todas las temporadas
  getTemporadas: async () => {
    const [rows] = await pool.query(`
      SELECT id_temporada, nombre, descripcion, precio
      FROM temporada
    `);
    return rows;
  },

  // Obtener una temporada por ID
  getTemporadaById: async (id) => {
    const [rows] = await pool.query(`
      SELECT id_temporada, nombre, descripcion, precio
      FROM temporada
      WHERE id_temporada = ?
    `, [id]);
    return rows[0];
  },

  // Crear una nueva temporada
  createTemporada: async ({ nombre, descripcion, precio }) => {
    const [result] = await pool.query(`
      INSERT INTO temporada (nombre, descripcion, precio)
      VALUES (?, ?, ?)
    `, [nombre, descripcion, precio]);

    return {
      id_temporada: result.insertId,
      nombre,
      descripcion,
      precio
    };
  },

  // Actualizar una temporada (campos fijos)
  updateTemporada: async ({ nombre, descripcion, precio }, id) => {
    const query = `
      UPDATE temporada
      SET nombre = ?, descripcion = ?, precio = ?
      WHERE id_temporada = ?
    `;
    const [result] = await pool.query(query, [nombre, descripcion, precio, id]);
    return result.affectedRows;
  },

  // Eliminar una temporada
  deleteTemporada: async (id) => {
    const [result] = await pool.query(`
      DELETE FROM temporada
      WHERE id_temporada = ?
    `, [id]);
    return result.affectedRows;
  }
};
