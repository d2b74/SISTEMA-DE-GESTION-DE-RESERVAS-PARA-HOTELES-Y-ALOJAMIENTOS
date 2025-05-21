//para crear la conexion multiple a la base de datos
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Ejecutamos dotenv para habilitar el acceso a process.env

// Creamos un pool de conexiones a MySQL usando la URL completa de la base de datos
export const pool = createPool({
  uri: process.env.DATABASE_URL, 

  //para controlar el pool de conexiones:
  waitForConnections: true, // Espera si todas las conexiones están en uso en vez de lanzar error
  connectionLimit: 10,       // Máximo número de conexiones simultáneas en el pool
  queueLimit: 0              // Número máximo de solicitudes en espera (0 = sin límite)
});
