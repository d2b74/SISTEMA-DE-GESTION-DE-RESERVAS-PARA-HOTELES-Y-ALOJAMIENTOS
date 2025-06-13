
import { Router } from "express";
import {Usuario} from '../Controllers/usuariosController.js';


const usuariosRouter =Router();

// Rutas CRUD
usuariosRouter.get('/', Usuario.getUsuarios);
usuariosRouter.post('/', Usuario.crearUsuarioHandler);
usuariosRouter.put('/:id', Usuario.updateUsuario);
usuariosRouter.delete('/:id', Usuario.deleteUsuario);

// Login y registro
usuariosRouter.post('/login', Usuario.loginUsuario);

export default usuariosRouter;
