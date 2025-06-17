import { pool } from "../db.js";

export const preguntaModel = {
  getPreguntas: async () => {
    const [rows] = await pool.query(
      `SELECT id_pregunta, titulo, descripcion FROM pregunta`
    );
    return rows;
  },

  getPreguntaById: async (id) => {
    const [rows] = await pool.query(
      `SELECT id_pregunta, titulo, descripcion FROM pregunta WHERE id_pregunta = ?`,
      [id]
    );
    return rows[0];
  },

  createPregunta: async ({ titulo, descripcion }) => {
    const [result] = await pool.query(
      `INSERT INTO pregunta (titulo, descripcion) VALUES (?, ?)`,
      [titulo, descripcion]
    );
    return { id_pregunta: result.insertId, titulo, descripcion };
  },

  updatePregunta: async ({ titulo, descripcion }, id) => {
    const query = `
      UPDATE pregunta
      SET titulo = ?, descripcion = ?
      WHERE id_pregunta = ?
    `;
    const [result] = await pool.query(query, [titulo, descripcion, id]);
    return result.affectedRows;
  },

  deletePregunta: async (id) => {
    const [result] = await pool.query(
      `DELETE FROM pregunta WHERE id_pregunta = ?`,
      [id]
    );
    return result.affectedRows;
  }
};
