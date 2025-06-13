import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuarioModel } from '../Models/usuariosModel.js';
import { validateUsuario, validatePartialUsuario } from '../schemas/usuario.js';
import { asyncHandler } from '../utils/asyncHandler.js';
/**
 * Controlador para usuarios: se encarga de recibir req/res y
 * delegar la parte de DB al `usuarioModel`.
 */
export class usuariosController {
  // Obtener todos los usuarios
  static getUsuarios = async (req, res, next) => {
    try {
      const usuarios = await usuarioModel.getUsuarios();
      return res.status(200).json(usuarios);
    } catch (err) {
      return next(err);
    }
  };

  // Login de usuario
  static loginUsuario = async (req, res, next) => {
    try {
      const { mail, contrasena } = req.body;
      if (!mail || !contrasena) {
        return res.status(400).json({ message: 'Mail y contraseña son obligatorios' });
      }

      // `usuarioModel.loginUsuario` lanzará si el usuario no existe o la contraseña es incorrecta.
      const user = await usuarioModel.loginUsuario({ mail, contrasena });

      // Generar token JWT (opcional; elimina si no lo necesitas aún)
      const token = jwt.sign(
        { id_usuario: user.id_usuario, mail: user.mail, tipo: user.tipo },
        process.env.JWT_SECRET || 'unSecretito',
        { expiresIn: '2h' }
      );

      return res.status(200).json({ token, user });
    } catch (err) {
      // Si `usuarioModel.loginUsuario` arroja un error con código HTTP adjunto, demostrarlo:
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error('Error en loginUsuario:', err);
      return res.status(500).json({ message: 'Error interno al autenticar usuario' });
    }
  };

  // Crear un usuario
  static crearUsuarioHandler = async (req, res, next) => {
    try {
      // En el body enviamos directamente las propiedades de usuario
      const usuario = req.body; // ya no usamos `req.body.usuario`, sino toda la carga
      const usuarioValid = validateUsuario(usuario);
      if (!usuarioValid.success) {
        return res.status(400).json({ message: usuarioValid.error.errors });
      }

      // Llamar al modelo para crear; retornará el usuario creado
      const result = await usuarioModel.crearUsuario(usuarioValid.data);
      return res.status(201).json(result);
    } catch (err) {
      // Por ejemplo, si hay duplicado de mail, podrías detectar error y hacer 409
      console.error('Error en crearUsuarioHandler:', err);
      return res.status(500).json({ message: 'Error al crear usuario' });
    }
    
  };

  // Actualizar un usuario
  static updateUsuario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const usuario = req.body; // actualización parcial
      const usuarioValid = validatePartialUsuario(usuario);
      if (!usuarioValid.success) {
        return res.status(400).json({ message: usuarioValid.error.errors });
      }

      const affectedRows = await usuarioModel.updateUsuario(usuarioValid.data, id);
      if (affectedRows > 0) {
        return res.status(200).json({ message: 'Usuario actualizado' });
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.error('Error en updateUsuario:', err);
      return res.status(500).json({ message: 'Error interno al actualizar usuario' });
    }
  };

  // Eliminar un usuario
  static deleteUsuario = async (req, res, next) => {
    try {
      const id = req.params.id;
      const affectedRows = await usuarioModel.deleteUsuario(id);
      if (affectedRows > 0) {
        return res.status(200).json({ message: 'Usuario eliminado' });
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (err) {
      console.error('Error en deleteUsuario:', err);
      return res.status(500).json({ message: 'Error interno al eliminar usuario' });
    }
  };
}

// Exportamos envuelto en asyncHandler si lo necesitas, por ejemplo:
// import { asyncHandler } from '../utils/asyncHandler.js';
// export const Usuario = {
//   loginUsuario: asyncHandler(usuariosController.loginUsuario),
//   getUsuarios: asyncHandler(usuariosController.getUsuarios),
//   crearUsuarioHandler: asyncHandler(usuariosController.crearUsuarioHandler),
//   updateUsuario: asyncHandler(usuariosController.updateUsuario),
//   deleteUsuario: asyncHandler(usuariosController.deleteUsuario),
// };

// Para simplicidad en este ejemplo, lo exportamos directamente:
export const Usuario = {
  loginUsuario: asyncHandler(usuariosController.loginUsuario),
  getUsuarios: asyncHandler(usuariosController.getUsuarios),
  crearUsuarioHandler: asyncHandler(usuariosController.crearUsuarioHandler),
  updateUsuario: asyncHandler(usuariosController.updateUsuario),
  deleteUsuario: asyncHandler(usuariosController.deleteUsuario) 
};
