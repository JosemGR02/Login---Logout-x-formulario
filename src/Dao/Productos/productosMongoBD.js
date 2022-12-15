

import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloProducto } from "../../Modelos/index.js";


export class ProductosMongoBD extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloProducto.ColeccionProductos,
            schema: modeloProducto.ProductoEsquema,
        });
    }
}

