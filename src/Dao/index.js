
import { config } from "../Configuracion/config.js";
import { servicioMongoDB, conectar } from "../Servicios/index.js";
import { MensajesMongoBD, MensajesFilesystem, MensajesFirebase, MensajesMemoria, MensajesChat } from "./Mensajes/index.js";
import { CarritosMongoBD, CarritosFilesystem, CarritosFirebase, CarritosMemoria } from "./Carritos/index.js";
import { ProductosMongoBD, ProductosFileSystem, ProductosFirebase, ProductosMemoria } from "./Productos/index.js";


const obtenerDaoSeleccionados = () => {
  switch (config.SERVER.SELECCION_BASEdDATOS) {
    case "mongo": {
      servicioMongoDB.init();
      return {
        DaoProducto: new ProductosMongoBD(),
        DaoCarrito: new CarritosMongoBD(),
        DaoMensaje: new MensajesMongoBD(),
        DaoChat: new MensajesChat()
      };
    }
    case "filesystem": {
      return {
        DaoProducto: new ProductosFileSystem(),
        DaoCarrito: new CarritosFilesystem(),
        DaoMensaje: new MensajesFilesystem()
      };
    }
    case "memory": {
      return {
        DaoProducto: new ProductosMemoria(),
        DaoCarrito: new CarritosMemoria(),
        DaoMensaje: new MensajesMemoria()
      };
    }
    case "firebase": {
      conectar()
      return {
        DaoProducto: new ProductosFirebase(),
        DaoCarrito: new CarritosFirebase(),
        DaoMensaje: new MensajesFirebase()
      };
    }
  }
};

const { DaoProducto, DaoCarrito, DaoMensaje, DaoChat } = obtenerDaoSeleccionados();

export { DaoProducto, DaoCarrito, DaoMensaje, DaoChat };



