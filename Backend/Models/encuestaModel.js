import { pool } from "../db.js";

export const encuestaModel = {
  // Listar todas las encuestas (sin detalle de respuestas)
  getEncuestas: async () => {
    const [rows] = await pool.query(`
      SELECT id_encuesta, id_reserva, id_huesped, fecha
      FROM encuesta
    `);
    return rows;
  },

  // Obtener una encuesta por ID (incluyendo respuestas)
  getEncuestaById: async (id) => {
    const [[encuesta]] = await pool.query(
      `SELECT id_encuesta, id_reserva, id_huesped, fecha
         FROM encuesta
        WHERE id_encuesta = ?`,
      [id]
    );
    if (!encuesta) return null;

    const [respuestas] = await pool.query(
      `SELECT ep.id_pregunta, p.titulo, ep.respuesta
         FROM encuesta_pregunta ep
         JOIN pregunta p ON ep.id_pregunta = p.id_pregunta
        WHERE ep.id_encuesta = ?`,
      [id]
    );
    encuesta.respuestas = respuestas;
    return encuesta;
  },
  // Devuelve todas las preguntas con su título y descripción
  getPreguntas: async () => {
    const [rows] = await pool.query(`SELECT * FROM pregunta`);
    return rows;
  },

  // Obtener todas las respuestas posibles agrupadas por pregunta
  getOpcionesPorPregunta: async () => {
    const [rows] = await pool.query(`
      SELECT DISTINCT id_pregunta, respuesta
      FROM encuesta_pregunta
    `);
    return rows;
  },

  getEncuestaByReservaId: async (id_reserva) => {
    const [rows] = await pool.query(
      'SELECT id_encuesta FROM encuesta WHERE id_reserva = ? LIMIT 1',
      [id_reserva]
    );
    return rows[0];
  },
  // Crear encuesta + respuestas en una transacción
  createEncuesta: async ({ id_reserva, id_huesped, fecha, respuestas }) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [res] = await conn.query(
        `INSERT INTO encuesta (id_reserva, id_huesped, fecha)
         VALUES (?, ?, ?)`,
        [id_reserva, id_huesped, fecha]
      );
      const id_encuesta = res.insertId;

      for (const { id_pregunta, respuesta } of respuestas) {
        await conn.query(
          `INSERT INTO encuesta_pregunta (id_encuesta, id_pregunta, respuesta)
           VALUES (?, ?, ?)`,
          [id_encuesta, id_pregunta, respuesta]
        );
      }

      await conn.commit();
      return { id_encuesta, id_reserva, id_huesped, fecha, respuestas };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  // Actualizar solo la fecha o respuestas (re-crea respuestas)
  updateEncuesta: async ({ fecha, respuestas }, id) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      if (fecha) {
        await conn.query(
          `UPDATE encuesta SET fecha = ? WHERE id_encuesta = ?`,
          [fecha, id]
        );
      }

      if (respuestas) {
        // Borrar viejas
        await conn.query(
          `DELETE FROM encuesta_pregunta WHERE id_encuesta = ?`,
          [id]
        );
        // Insertar nuevas
        for (const { id_pregunta, respuesta } of respuestas) {
          await conn.query(
            `INSERT INTO encuesta_pregunta (id_encuesta, id_pregunta, respuesta)
             VALUES (?, ?, ?)`,
            [id, id_pregunta, respuesta]
          );
        }
      }

      await conn.commit();
      return true;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  },

  // Eliminar encuesta y sus respuestas
  deleteEncuesta: async (id) => {
    // gracias a ON DELETE CASCADE en la FK de encuesta_pregunta no hace falta borrar manual
    const [result] = await pool.query(
      `DELETE FROM encuesta WHERE id_encuesta = ?`,
      [id]
    );
    return result.affectedRows;
  },
};
