
import { ContenedorFileSystem } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/config.js";


export class CarritosFilesystem extends ContenedorFileSystem {
    constructor() {
        super(config.DATABASES.filesystem.CARRITOS_ARCHIVONOMBRE);
    }
}

