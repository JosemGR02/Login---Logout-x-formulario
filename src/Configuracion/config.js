
import dotenv from "dotenv";
dotenv.config();


const PRODUCTOS_ARCHIVONOMBRE = "productos";
const CARRITOS_ARCHIVONOMBRE = "carritos";
const MENSAJES_ARCHIVONOMBRE = "mensajes";

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
        SELECCION_BASEdDATOS: process.env.BASEDATOS_SELECCIONADA ?? "memory",
    },
    DATABASES: {
        filesystem: {
            PRODUCTOS_ARCHIVONOMBRE,
            CARRITOS_ARCHIVONOMBRE,
            MENSAJES_ARCHIVONOMBRE,
        },
        mongo: {
            url: process.env.BASEDATOS_MONGO_URL,
            dbName: process.env.BASEDATOS_MONGO_NOMBRE,
            user: process.env.BASEDATOS_MONGO_USUARIO,
            pass: process.env.BASEDATOS_MONGO_PASS,
        }
    }
};

export { config };



