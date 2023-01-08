
import { Router } from 'express';
import { controladorSesion } from "../../Controladores/index.js";


const ruta = Router();


ruta.get('/', controladorSesion.irHome)

ruta.post('/login', controladorSesion.inicioSesion)

ruta.get('/logout', controladorSesion.cerrarSesion)


export { ruta as RutaSesiones };

