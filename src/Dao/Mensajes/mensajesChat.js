
import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloChat } from "../../Modelos/index.js";


export class MensajesChat extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloChat.ColeccionChat,
            schema: modeloChat.EsquemaChat,
        });
    }
}
