
import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloMensajes } from "../../Modelos/index.js";


export class MensajesMongoBD extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloMensajes.ColeccionMensajes,
            schema: modeloMensajes.EsquemaMensajes,
        });
    }
}
