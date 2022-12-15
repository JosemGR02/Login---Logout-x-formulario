
import { ContenedorFirebase } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/config.js";


export class MensajesFirebase extends ContenedorFirebase {
    constructor() {
        super(config.DATABASES.firebase);
    }
}

