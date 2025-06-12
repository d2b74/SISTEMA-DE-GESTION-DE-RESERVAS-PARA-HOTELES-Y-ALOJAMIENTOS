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
    
    getReservasPorHuesped: async (id_huesped) => {
    const [rows] = await pool.query(`
        SELECT
        r.id_reserva,
        r.fecha_inicio,
        r.fecha_fin,
        r.estado,
        r.personas,
        hr.id_habitacion,
        h.numero AS numero_habitacion,
        h.precio,
        GROUP_CONCAT(i.url) AS urls_habitacion
        FROM reserva r
        JOIN habitacion_reserva hr ON r.id_reserva = hr.id_reserva
        JOIN habitacion h ON hr.id_habitacion = h.id_habitacion
        LEFT JOIN imagen_habitacion i ON i.id_habitacion = h.id_habitacion
        WHERE r.id_huesped = ?
        GROUP BY r.id_reserva, hr.id_habitacion
        ORDER BY r.id_reserva DESC


    `, [id_huesped]);

    // Transformamos cada fila:
    const transformedRows = rows.map(row => ({
        ...row,
        urls_habitacion: row.urls_habitacion ? row.urls_habitacion.split(',') : []
    }));

    return transformedRows;
    },


    // Obtener una reserva por ID
    getReservaId: async (id) => {
    const [rows] = await pool.query(`
        SELECT r.*, hr.id_habitacion, h.numero AS numero_habitacion, h.precio, 
            GROUP_CONCAT(i.url) AS urls_habitacion
        FROM reserva r
        JOIN habitacion_reserva hr ON r.id_reserva = hr.id_reserva
        JOIN habitacion h ON hr.id_habitacion = h.id_habitacion
        LEFT JOIN imagen_habitacion i ON i.id_habitacion = h.id_habitacion
        WHERE r.id_reserva = ?
        GROUP BY r.id_reserva, hr.id_habitacion
    `, [id]);

    if (!rows.length) return null;

    const reserva = rows[0];
    reserva.urls_habitacion = reserva.urls_habitacion ? reserva.urls_habitacion.split(',') : [];

    return reserva;
    },

    // Crear una nueva reserva
    createReserva: async ({ id_huesped, fecha_inicio, fecha_fin, estado, habitaciones, personas, precio }) => {
    // Inserta en reserva
    
    const [result] = await pool.query(`
        INSERT INTO reserva (id_huesped, fecha_inicio, fecha_fin, estado, personas)
        VALUES (?, ?, ?, ?, ?)
    `, [id_huesped, fecha_inicio, fecha_fin, 2, personas]);

    const id_reserva = result.insertId;

    // Inserta cada habitación asociada
    for (const id_habitacion of habitaciones) {
        await pool.query(`
            INSERT INTO habitacion_reserva (id_reserva, id_habitacion)
            VALUES (?, ?)
        `, [id_reserva, id_habitacion]);
        // Cambiar estado de la habitación a "reservada"
        await pool.query(`
            UPDATE habitacion
            SET estado = 2
            WHERE id_habitacion = ?
        `, [id_habitacion]);
    }

    // Devolvemos un objeto base (vos elegís si querés devolver más)
    return {
        id_reserva,
        id_huesped,
        fecha_inicio,
        fecha_fin,
        estado: 2,
        personas,
        precio
    };
    },





    // Actualizar una reserva 
    updateReserva: async ({ id_huesped, fecha_inicio, fecha_fin, estado, habitaciones, personas }, id_reserva) => {
        // 1. Actualizar reserva
        await pool.query(`
            UPDATE reserva
            SET id_huesped = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?, personas = ?
            WHERE id_reserva = ?
        `, [id_huesped, fecha_inicio, fecha_fin, estado, personas, id_reserva]);

        // 2. Borrar habitaciones anteriores y volver a insertar
        await pool.query(`DELETE FROM habitacion_reserva WHERE id_reserva = ?`, [id_reserva]);
        for (const id_habitacion of habitaciones) {
            await pool.query(`
                INSERT INTO habitacion_reserva (id_reserva, id_habitacion)
                VALUES (?, ?)
            `, [id_reserva, id_habitacion]);
        }

        return true;
    },

    // Eliminar una reserva
    deleteReserva: async (id) => {
        const [result] = await pool.query(`
            DELETE FROM reserva WHERE id_reserva = ?
        `, [id]);
        return result.affectedRows;
    },

    cancelReserva: async (id_reserva) => {
    // Cambiar estado de la reserva a cancelada (3)
    await pool.query(`UPDATE reserva SET estado = 3 WHERE id_reserva = ?`, [id_reserva]);

    // Liberar la habitación (estado = 1)
    await pool.query(`
        UPDATE habitacion
        SET estado = 1
        WHERE id_habitacion IN (
        SELECT id_habitacion FROM habitacion_reserva WHERE id_reserva = ?
        )
    `, [id_reserva]);

    return true;
    }



    
};
