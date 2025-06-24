/**
 * TODO - Pasos para calcular el precio de una reserva:
 * 
 * 1. Calcular el precio base
 *    - Parámetros:
 *      - precioBase (float): precio base por noche de la habitación
 *      - diasEstadia (int): cantidad de noches
 *    - Retorna:
 *      - precioBaseTotal (float): precioBase * diasEstadia
 * 
 * 2. Ajustar precio según temporada
 *    - Parámetros:
 *      - precioBaseTotal (float)
 *      - temporada (string): 'alta', 'media', 'baja'
 *      - multiplicadores (objeto): { alta: 1.3, media: 1.1, baja: 0.9 } (ejemplo)
 *    - Retorna:
 *      - precioTemporada (float): precioBaseTotal * multiplicadorSegunTemporada
 * 
 * 3. Aplicar promociones
 *    - Parámetros:
 *      - precioTemporada (float)
 *      - promociones (array): lista de objetos con tipo y valor de promoción
 *        - Ejemplo: [{ tipo: 'porcentaje', valor: 15 }, { tipo: 'fijo', valor: 500 }]
 *    - Retorna:
 *      - precioFinal (float): precioTemporada con descuentos aplicados
 * 
 * 4. Validar y retornar precio final (controlar que no sea negativo)
 * 
 * EJEMPLO DE USO:
 * calcularPrecioReserva(precioBase, diasEstadia, temporada, promociones)
 * 
 * Donde:
 * - precioBase: 1000
 * - diasEstadia: 3
 * - temporada: 'alta'
 * - promociones: [{ tipo: 'porcentaje', valor: 10 }, { tipo: 'fijo', valor: 200 }]
 */
