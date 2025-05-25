//paso 7 crear el modelo de habitaciones
import { pool } from "../db.js"; // 1 Importar la conexión a la base de datos y despues las consultas

export const habitacionModel = {
  // Obtener todas las habitaciones



  // Obtener una habitación por ID
 getHabitaciones: async () => {
  const [rows] = await pool.query(`
    SELECT 
      h.id_habitacion,
      h.numero,
      eh.nombre AS estado,
      th.nombre AS tipo,
      h.precio,
      h.descripcion,
      (
        SELECT JSON_ARRAYAGG(ordenadas.url)
        FROM (
          SELECT i.url
          FROM imagen_habitacion i
          WHERE i.id_habitacion = h.id_habitacion
          ORDER BY i.orden
        ) AS ordenadas
      ) AS url
    FROM habitacion h
    LEFT JOIN estado_habitacion eh ON h.estado = eh.id_estado
    LEFT JOIN tipo_habitacion th ON h.tipo = th.id_tipo_habitacion;
  `);
  return rows;
},



  // Crear una nueva habitación
  createHabitacion: async (data) => {
    const { numero, estado, tipo, precio, descripcion } = data;
    const [result] = await pool.query(
      `INSERT INTO habitacion (numero, estado, tipo, precio, descripcion) VALUES (?, ?, ?, ?, ?)`,
      [numero, estado, tipo, precio, descripcion]
    );
    return { id: result.insertId, ...data };
  },

  // Actualizar una habitación
  updateHabitacion: async (id, data) => {
    const { numero, estado, tipo, precio, descripcion } = data;
    const [result] = await pool.query(
      `UPDATE habitacion SET numero = ?, estado = ?, tipo = ?, precio = ?, descripcion = ? WHERE id_habitacion = ?`,
      [numero, estado, tipo, precio, descripcion, id]
    );
    return result;
  },

  // Eliminar una habitación
  deleteHabitacion: async (id) => {
    const [result] = await pool.query("DELETE FROM habitacion WHERE id_habitacion = ?", [id]);
    return result;
  },
};
