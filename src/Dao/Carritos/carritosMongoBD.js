
import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloCarrito } from "../../Modelos/index.js";


export class CarritosMongoBD extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloCarrito.ColeccionCarrito,
            schema: modeloCarrito.CarritoEsquema,
        });
    }

    async obtenerXid(id) {
        const respuesta = await this.model.findById(id).populate("productos");

        return respuesta;
    }
}
