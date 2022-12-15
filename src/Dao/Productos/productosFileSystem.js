

import { ContenedorFileSystem } from "../../Contenedores/index.js";
import { config } from "../../Configuracion/config.js";


export class ProductosFileSystem extends ContenedorFileSystem {
    constructor() {
        super(config.DATABASES.filesystem.PRODUCTOS_ARCHIVONOMBRE);
    }
}