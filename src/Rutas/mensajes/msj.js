
import { Router } from "express"
import { controladorMensajes } from "../../Controladores/index.js";

const ruta = Router()


ruta.get("/", controladorMensajes.ObtenerMensajes);

ruta.post("/", controladorMensajes.CrearMensaje);


export { ruta as RutaMensajes };

