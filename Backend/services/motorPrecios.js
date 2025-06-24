import {pool} from '../db.js';
/**
 * Servicio para calcular el precio total de una reserva de hotel.
 * 
 * Tareas a realizar para implementar el cálculo de precio:
 * 
 * 1. Calcular el precio base: precio por noche * cantidad de noches.
 * 2. Ajustar el precio según la temporada (alta, media, baja).
 * 3. Calcular y aplicar ajuste por anticipación (días desde la fecha de reserva a la fecha actual).
 * 4. Calcular y aplicar ajuste por ocupación actual (porcentaje de habitaciones ocupadas).
 * 5. Aplicar promociones activas (porcentaje o monto fijo de descuento).
 * 6. Sumar el costo de servicios adicionales (desayuno, spa, late checkout, etc).
 * 7. Retornar el precio total final ajustado.
 * 
 * Parámetros:
 * @param {Object} habitacion - Objeto con propiedad 'precio' (número).
 * @param {number} diasEstadia - Número de noches que dura la reserva.
 * @param {string} temporada - 'alta', 'media' o 'baja' "ajuste de precio" propiedad precio (numero indice multiplicador).
 * @param {Array} promociones - Lista de objetos con propiedades: nombre, condicion (string), precio (factor tipo 0.90).
 * @param {Array} servicios - Lista de objetos con propiedad 'costo' (número).
 * @param {number|null} ocupacionActual - Porcentaje (0-1) de ocupación en la fecha de reserva, opcional.
 * @param {number|null} diasAnticipacion - Días entre hoy y fecha de reserva, opcional.
 * 
 * @returns {number} Precio total final de la reserva.
 */

async function calcularPrecioReserva(habitacion, diasEstadia, fecha_inicio, clienteId, servicios, canalReserva = 'otro', promociones ) {
    // Paso 0: Validar parámetros básicos
    if (typeof habitacion !== 'object' || typeof diasEstadia !== 'number' || !Array.isArray(promociones) || !Array.isArray(servicios)) {
        throw new Error("Parámetros inválidos");
    }

    // Paso 1: Calcular precio base (precio por noche * cantidad de noches)
    let precioBase = habitacion.precio * diasEstadia;

    // Paso 2: Ajustar precio por temporada
    const factorTemp = await getFactorTemporada(fecha_inicio);
    precioBase = precioBase * factorTemp;

    // Paso 3: Ajustar precio según anticipación (si disponible)
    const diasAnticipacionCalculado = calcularDiasAnticipacion(fecha_inicio);

    if (diasAnticipacionCalculado > 30) {
        precioBase *= 0.90; // 10% descuento
    } else if (diasAnticipacionCalculado < 7) {
        precioBase *= 1.10; // 10% recargo
    }

    // Paso 4: Ajustar precio según ocupación actual (si disponible)
  const ocupacion = await calcularOcupacionActual(fecha_inicio);

    if (ocupacion > 0.8) {
        precioBase *= 1.05; // +5%
    } else if (ocupacion < 0.4) {
        precioBase *= 0.95; // -5%
    }

    // Paso 5: Aplicar promociones activas
  const condiciones = await obtenerCondicionesAplicables(clienteId, fecha_inicio, diasEstadia, canalReserva);
    
    const promocionesAplicables = promociones.filter(promo =>
      condiciones.includes(promo.condicion)
    );
    //acumula los descuentos
    let factorDescuento = 1;
    promocionesAplicables.forEach(promo => {
      factorDescuento *= promo.precio;
    });
    //limite de descuento
    if (factorDescuento < 0.7) {
      factorDescuento = 0.7;
    }
    precioBase *= factorDescuento;

    // Paso 6: Sumar costos de servicios adicionales
    let costoServicios = servicios.reduce((total, servicio) => total + servicio.costo, 0);

    // Paso 7: Retornar precio total final
    const total = precioBase + costoServicios;

    // 🔧 Redondear a 2 decimales
    return Math.round(total * 100) / 100;
}

async function getFactorTemporada(fecha) {
  const [rows] = await pool.query(
    `SELECT precio
       FROM temporada
      WHERE fecha_inicio <= ? AND fecha_fin >= ?
      LIMIT 1`,
    [fecha, fecha]
  );
  // si no hay temporada, devolvés 1.0 por defecto
  return rows.length ? rows[0].precio : 1.0;
}

function calcularDiasAnticipacion(fechaInicio) {
    const hoy = new Date();
    const inicio = new Date(fechaInicio);

    const diffMs = inicio - hoy;
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return dias;
}

async function calcularOcupacionActual(fecha) {
  const [ocupadas] = await pool.query(`
    SELECT COUNT(DISTINCT hr.id_habitacion) AS ocupadas
    FROM habitacion_reserva hr
    INNER JOIN reserva r ON hr.id_reserva = r.id_reserva
    WHERE r.estado = 2
      AND r.fecha_inicio <= ?
      AND r.fecha_fin > ?
  `, [fecha, fecha]);

  const [totales] = await pool.query(
    `SELECT COUNT(*) AS total FROM habitacion`
  );

  if (!totales.length || totales[0].total === 0) return 0;

  return ocupadas[0].ocupadas / totales[0].total;
}

async function obtenerCondicionesAplicables(clienteId, fecha_inicio, diasEstadia, canalReserva= 'otro') {
  const condiciones = [];

  // 1. Cliente frecuente (más de 3 reservas pasadas confirmadas)
  const [resPasadas] = await pool.query(
    `SELECT COUNT(*) AS cantidad
     FROM reserva
     WHERE id_huesped = ? AND estado = 2 AND fecha_fin < CURDATE()`,
    [clienteId]
  );

  if (resPasadas[0].cantidad >= 3) {
    condiciones.push('cliente_frecuente');
  }

  // 2. Último minuto: 1 día o menos de anticipación
  const diasAnticipacion = calcularDiasAnticipacion(fecha_inicio);
  if (diasAnticipacion <= 1) {
    condiciones.push('ultimo_minuto');
  }

  // 3. Larga estadía
  if (diasEstadia >= 7) {
    condiciones.push('larga_estadia');
  }

  // 4. Reserva online
  if (canalReserva === 'online') {
    condiciones.push('reserva_online');
  }

  return condiciones;
}

 export  {calcularPrecioReserva};
