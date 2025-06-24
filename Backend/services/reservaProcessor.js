import { pool } from "../db.js";
import { calcularPrecioReserva } from "./motorPrecios.js";
import { reservaModel } from "../Models/reservaModel.js";

export class ReservaProcessor {
  // canal: "interno" 
  static async procesarReserva(data, canal = "interno") {
    const { fecha_inicio, fecha_fin, id_huesped, habitaciones, servicios = [] } = data;

    // 1. Validaciones básicas
    if (new Date(fecha_fin) <= new Date(fecha_inicio)) {
      throw new Error("La fecha de salida debe ser posterior a la de entrada");
    }

    // 2. Verificar que existan las habitaciones solicitadas
    const [habitacionesData] = await pool.query(
      `SELECT * FROM habitacion WHERE id_habitacion IN (?)`,
      [habitaciones]
    );
    if (!habitacionesData.length || habitacionesData.length !== habitaciones.length) {
      throw new Error("Una o más habitaciones no existen o no están disponibles");
    }

    // 3. Verificar si hay disponibilidad en las fechas
    const habitacionesOcupadas = await this.buscarHabitacionesOcupadas(fecha_inicio, fecha_fin);

    const habitacionesLibres = habitacionesData.filter(hab => 
      !habitacionesOcupadas.includes(hab.id_habitacion)
    );

    if (habitacionesLibres.length < habitaciones.length) {
      throw new Error("No hay disponibilidad para todas las habitaciones seleccionadas");
    }

    // 4. Calcular días de estadía
    const diasEstadia = Math.ceil(
      (new Date(fecha_fin) - new Date(fecha_inicio)) / (1000 * 60 * 60 * 24)
    );

    // 5. Obtener promociones si aplican
    const [rows] = await pool.query(`SELECT * FROM promocion`);
    const promociones = rows;

    // 6. Calcular precio total
    let precioTotal = 0;
    for (const habitacion of habitacionesLibres) {
      const precio = await calcularPrecioReserva(
        habitacion,
        diasEstadia,
        fecha_inicio,
        id_huesped,
        servicios,
        canal,         // 🔁 importante para decidir si es OTA o no
        promociones
      );
      precioTotal += precio;
    }

    // 7. Insertar la reserva
    const reserva = await reservaModel.createReserva(data);

    // Retornar datos importantes
    return {
      ...reserva,
      precio: precioTotal
    };
  }

  // Devuelve array con IDs de habitaciones ocupadas en ese rango
  static async buscarHabitacionesOcupadas(fecha_inicio, fecha_fin) {
    const [ocupadas] = await pool.query(`
      SELECT rh.id_habitacion
      FROM reserva r
      JOIN habitacion_reserva rh ON r.id_reserva = rh.id_reserva
      WHERE NOT (r.fecha_fin <= ? OR r.fecha_inicio >= ?)
    `, [fecha_inicio, fecha_fin]);

    return ocupadas.map(r => r.id_habitacion);
  }
}
