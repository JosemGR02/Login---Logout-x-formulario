
import { DaoProducto } from "../../Dao/index.js";
import { FECHA_UTILS, ERRORES_UTILS, JOI_VALIDADOR, LOGGER_UTILS } from "../../Utilidades/index.js";
import { crearProductosFake } from "../../Utilidades/mocks-utils/index.js";



const obtenerTodos = async (solicitud, respuesta) => {
    try {
        const producto = await DaoProducto.obtenerTodos();

        if (!producto) {
            return respuesta.send({ error: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO });
        }
        respuesta.send(producto);
    } catch (error) {
        respuesta.send({ error, error: "Error al obtener los productos solicitados" })
    }
};

const obtenerXid = async (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params;

        const producto = await DaoProducto.obtenerXid(id);

        respuesta.send(producto);
    } catch (error) {
        respuesta.send({ error, error: "Error al obtener el productos solicitado" })
    }
};

const crearProducto = async (solicitud, respuesta) => {
    try {
        const { titulo, descripcion, codigo, imagen, precio, stock } = solicitud.body;

        const nuevoProducto = await JOI_VALIDADOR.producto.validateAsync({
            titulo, descripcion, codigo, imagen, precio, stock,
            timestamp: FECHA_UTILS.getTimestamp(),
        });

        const productoCreado = await DaoProducto.guardar(nuevoProducto);

        respuesta.send(productoCreado);
    } catch (error) {
        await LOGGER_UTILS.addLog(error);
        respuesta.send({ error, error: "Error al crear el producto solicitado" })
    }
};

const eliminarXid = async (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params;

        await DaoProducto.eliminarXid(id);

        respuesta.send({ success: true });
    } catch (error) {
        respuesta.send({ error, error: "Error al eliminar el producto solicitado" })
    }
};

const obtenerProdsTest = async (solicitud, respuesta) => {
    try {
        const productosFake = crearProductosFake(5)

        respuesta.send({ success: true, data: productosFake })
    } catch (error) {
        respuesta.send({ error, error: "Error al obtener los productos Fake solicitados" })
    }
};

export const controladorProductos = {
    obtenerTodos,
    obtenerXid,
    crearProducto,
    eliminarXid,
    obtenerProdsTest,
};


