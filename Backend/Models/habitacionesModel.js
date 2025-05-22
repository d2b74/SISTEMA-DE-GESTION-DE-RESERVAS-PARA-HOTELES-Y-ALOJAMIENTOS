//paso 7 crear el modelo de habitaciones
import { pool } from "../db.js"; // 1 Importar la conexión a la base de datos y despues las consultas

export const habitacionModel = {
  // Obtener todas las habitaciones
  getHabitaciones: async () => {
    const [rows] = await pool.query("SELECT * FROM habitacion");
    return rows;
  },

  // Obtener una habitación por ID
  getHabitacionById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM habitacion WHERE id_habitacion = ?", [id]);
    return rows[0];
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
