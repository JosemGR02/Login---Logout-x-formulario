
import { Router } from 'express';
import { controladorSesion } from "../../Controladores/index.js";
import { verificarAdmin } from "../../Middlewares/index.js";

const ruta = Router();

ruta.get('/login', controladorSesion.loginUsuario)

ruta.post('/login', verificarAdmin, controladorSesion.loginPost)

ruta.get('/logout', controladorSesion.logoutUsuario)


export { ruta as RutaSesiones };






