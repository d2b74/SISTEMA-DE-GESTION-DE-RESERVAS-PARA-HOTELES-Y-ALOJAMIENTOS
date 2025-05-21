//import { pool } from '../config/db.js';
import { pool } from '../db.js'; // Importar la conexión a la base de datos
export const reservaModel = {
    
    // Obtener todas las reservas con datos de huésped y usuario
    getReservas: async () => {
        const [rows] = await pool.query(`
            SELECT r.*, h.id_usuario, u.nombre, u.apellido
            FROM reserva r
            JOIN huesped h ON r.id_huesped = h.id_huesped
            JOIN usuario u ON h.id_usuario = u.id_usuario
        `);
        return rows;
    },

    // Obtener una reserva por ID
    getReservaId: async (id) => {
        const [rows] = await pool.query(`
            SELECT r.*, h.id_usuario, u.nombre, u.apellido
            FROM reserva r
            JOIN huesped h ON r.id_huesped = h.id_huesped
            JOIN usuario u ON h.id_usuario = u.id_usuario
            WHERE r.id_reserva = ?
        `, [id]);
        return rows[0];
    },

    // Crear una nueva reserva
    createReserva: async ({ id_huesped, fecha_inicio, fecha_fin, estado }) => {
        const [result] = await pool.query(`
            INSERT INTO reserva (id_huesped, fecha_inicio, fecha_fin, estado)
            VALUES (?, ?, ?, ?)
        `, [id_huesped, fecha_inicio, fecha_fin, estado]);

        return {
            id_reserva: result.insertId,
            id_huesped,
            fecha_inicio,
            fecha_fin,
            estado
        };
    },

    // Actualizar una reserva (campos fijos)
    updateReserva: async ({ id_huesped, fecha_inicio, fecha_fin, estado }, id) => {
        const query = `
            UPDATE reserva
            SET id_huesped = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?
            WHERE id_reserva = ?
        `;
        const [result] = await pool.query(query, [id_huesped, fecha_inicio, fecha_fin, estado, id]);
        return result.affectedRows;
    },

    // Eliminar una reserva
    deleteReserva: async (id) => {
        const [result] = await pool.query(`
            DELETE FROM reserva WHERE id_reserva = ?
        `, [id]);
        return result.affectedRows;
    }
};
