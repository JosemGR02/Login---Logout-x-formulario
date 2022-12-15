
import { Router } from "express";
import { verificarAdmin } from "../../Middlewares/index.js";
import { controladorProductos } from "../../Controladores/index.js";


const ruta = Router();


ruta.get("/", controladorProductos.obtenerTodos);

ruta.get("/:id", controladorProductos.obtenerXid);

ruta.post("/", verificarAdmin, controladorProductos.crearProducto);

ruta.delete("/:id", controladorProductos.eliminarXid);

export { ruta as RutaProducto };


