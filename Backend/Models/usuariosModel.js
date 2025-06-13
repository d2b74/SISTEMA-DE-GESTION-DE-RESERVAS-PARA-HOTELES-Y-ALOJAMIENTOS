import { pool } from '../db.js';
import bcrypt from 'bcryptjs';

export const usuarioModel = {
  // Obtener todos los usuarios
  getUsuarios: async () => {
    const [rows] = await pool.query('SELECT * FROM usuario');
    return rows;
  },

  // Crear usuario (registro)

  crearUsuario: async (data) => {
    const { nombre, apellido, dni, mail, telefono, contrasena, tipo } = data;

    // 1) Verificar que no exista otro usuario con el mismo mail
    const [existing] = await pool.query('SELECT id_usuario FROM usuario WHERE mail = ?', [mail]);
    if (existing.length > 0) {
      const error = new Error('Ya existe un usuario con ese correo');
      error.statusCode = 409;
      throw error;
    }

    // 2) Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // 3) Insertar en tabla usuario
    const [result] = await pool.query(
      `INSERT INTO usuario 
        (nombre, apellido, dni, mail, telefono, contrasena, tipo) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, dni, mail, telefono, hashedPassword, tipo]
    );

    const id_usuario = result.insertId;

    // 4) Insertar en tabla correspondiente
    let id_huesped = null;
    let id_administrativo = null;

    if (tipo === false || tipo === 0) {
      // Insertar como huésped
      const [huespedResult] = await pool.query(
        `INSERT INTO huesped (id_usuario) VALUES (?)`,
        [id_usuario]
      );
      id_huesped = huespedResult.insertId;
    } else if (tipo === true || tipo === 1) {
      // Insertar como administrativo
      const [adminResult] = await pool.query(
        `INSERT INTO administrativo (id_usuario) VALUES (?)`,
        [id_usuario]
      );
      id_administrativo = adminResult.insertId;
    }

    return {
      id_usuario,
      id_huesped,
      id_administrativo,
      nombre,
      apellido,
      dni,
      mail,
      telefono,
      tipo
    };
  },


  // Login de usuario: devuelve el objeto usuario sin contrasena (o lanza error)
  loginUsuario: async (data) => {
    const { mail, contrasena } = data;

    // 1) Buscar al usuario por mail
    const [rows] = await pool.query('SELECT * FROM usuario WHERE mail = ?', [mail]);
    if (rows.length === 0) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 401;
      throw error;
    }

    const user = rows[0];

    // 2) Comparar contraseña (hash bcrypt)
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!passwordMatch) {
      const error = new Error('Contraseña incorrecta');
      error.statusCode = 401;
      throw error;
    }
    let id_huesped = null;
    if (user.tipo === 0) {
      const [huespedRows] = await pool.query(
        'SELECT id_huesped FROM huesped WHERE id_usuario = ?',
        [user.id_usuario]
      );
      if (huespedRows.length > 0) {
        id_huesped = huespedRows[0].id_huesped;
      }
    }

    // 3) Si todo OK, devolvemos solamente los campos no sensibles:
    return {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      dni: user.dni,
      mail: user.mail,
      telefono: user.telefono,
      tipo: user.tipo,
      id_huesped
      // (nunca devolvemos la contraseña ni otros campos sensibles)
    };
  },

  // Actualizar usuario: retorna número de filas afectadas
  updateUsuario: async (data, id) => {
    const fields = [];
    const values = [];

    // Solo incluir en SET los campos que vienen en `data`
    if (data.nombre) {
      fields.push('nombre = ?');
      values.push(data.nombre);
    }
    if (data.apellido) {
      fields.push('apellido = ?');
      values.push(data.apellido);
    }
    if (data.dni) {
      fields.push('dni = ?');
      values.push(data.dni);
    }
    if (data.mail) {
      fields.push('mail = ?');
      values.push(data.mail);
    }
    if (data.telefono) {
      fields.push('telefono = ?');
      values.push(data.telefono);
    }
    if (data.tipo !== undefined) {
      fields.push('tipo = ?');
      values.push(data.tipo);
    }
    // Si viene `contrasena` para actualizar, la hasheamos:
    if (data.contrasena) {
      const hashed = await bcrypt.hash(data.contrasena, 10);
      fields.push('contrasena = ?');
      values.push(hashed);
    }

    if (fields.length === 0) {
      // Nada que actualizar
      return 0;
    }

    // Finalmente, agregar el id al array de valores
    values.push(id);

    const sql = `UPDATE usuario SET ${fields.join(', ')} WHERE id_usuario = ?`;
    const [result] = await pool.query(sql, values);

    // `result.affectedRows` indica cuántas filas se modificaron
    return result.affectedRows;
  },

  // Eliminar usuario: retorna filas afectadas
  deleteUsuario: async (id) => {
    const [result] = await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    return result.affectedRows;
  }
};
