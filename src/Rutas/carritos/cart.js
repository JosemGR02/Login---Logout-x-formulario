
import { Router } from "express";
import { controladorCarritos } from "../../Controladores/index.js";


const ruta = Router();


ruta.get("/:id", controladorCarritos.obtenerCarritoXid);

ruta.post("/", controladorCarritos.crearCarrito);

ruta.post("/:id/productos", controladorCarritos.guardarProdsCarrito);

ruta.get("/:id/productos", controladorCarritos.obtenerTodosProdsCarrito);

ruta.delete("/:id/productos/:id", controladorCarritos.eliminarProdCarrito);

ruta.delete("/:id", controladorCarritos.eliminarCarritoXid);


export { ruta as RutaCarrito };