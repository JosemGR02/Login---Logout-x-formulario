

import { DaoCarrito, DaoProducto } from "../../Dao/index.js";
import { FECHA_UTILS, ERRORES_UTILS } from "../../Utilidades/index.js";


const obtenerCarritoXid = async (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params;

        const carrito = await DaoCarrito.obtenerXid(id);

        respuesta.send({ success: true, carrito });
    } catch (error) {
        respuesta.send({ error: "Error al obtener el carrito solicitado" })
    }
};


const crearCarrito = async (solicitud, respuesta) => {
    try {
        const carritoBase = { timestamp: FECHA_UTILS.getTimestamp(), products: [] };

        const nuevoCarrito = await DaoCarrito.guardar(carritoBase);

        respuesta.send({ success: true, carritoId: nuevoCarrito.id });
    } catch (error) {
        respuesta.send({ error: "Error al crear el carrito" })
    }
};


const guardarProdsCarrito = async (solicitud, respuesta) => {
    try {
        const { productoId } = solicitud.body;
        const { carritoId } = solicitud.params;

        const carrito = await DaoCarrito.obtenerXid(carritoId);

        if (!carrito)
            return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

        const producto = await DaoProducto.obtenerXid(productoId);

        if (!producto)
            return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO });

        carrito.productos.push(producto);

        const carritoActualizado = await DaoCarrito.actualizar(carritoId, carrito);

        respuesta.send({ success: true, carrito: carritoActualizado });
    } catch (error) {
        respuesta.send({ error: "Error al guardar un producto al carrito" })
    }
};

const obtenerTodosProdsCarrito = async (solicitud, respuesta) => {
    try {
        const { carritoId } = solicitud.params;

        const carrito = await DaoCarrito.obtenerXid(carritoId);
        if (!carrito) { respuesta.send({ error: "Error, no se encontro el carrito" }) }

        else {
            const listadoProductos = await DaoProducto.obtenerTodos();

            if (!listadoProductos) return respuesta.send({ error: true, mensaje: "No se encontraron los productos solicitados" });

            respuesta.send({ success: true, productos: carrito.productos });
        }
    } catch (error) {
        respuesta.send({ error: "Error al obtener la lista los productos del carrito" })
    }
};

const eliminarProdCarrito = async (solicitud, respuesta) => {
    try {
        const { carritoId, productoId } = solicitud.params;

        const carrito = await DaoCarrito.obtenerXid(carritoId);
        if (!carrito) { respuesta.send({ error: "Error, no se encontro el carrito" }) }

        else {
            const producto = await DaoProducto.obtenerXid(productoId);
            if (!producto) return respuesta.send({ error: "Error, no se encontro el producto" })

            const elementoEncontradoIndex = carrito.productos.findIndex(elemento => elemento.id === Number(productoId))
            if (elementoEncontradoIndex === -1) return respuesta.send({ error: "Error, no se encontro el producto" })
            carrito.productos.splice(elementoEncontradoIndex, 1)
        }
        const carritoActualizado = await DaoCarrito.actualizar(Number(carritoId), carrito)
        respuesta.send({ success: true, mensaje: "Se elimino correctamente el producto del carrito", carrito: carritoActualizado })

    } catch (error) {
        respuesta.send({ error: "Error al eliminar un producto del carrito" })
    }
};


const eliminarCarritoXid = async (solicitud, respuesta) => {
    try {
        const { carritoId } = solicitud.params;

        const carrito = await DaoCarrito.eliminarXid(carritoId);
        if (!carrito) return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

        respuesta.send({ success: true, mensaje: `Se elimino correctamente el carrito ${carritoId}` })
    } catch (error) {
        respuesta.send({ error: "Error al eliminar el carrito seleccionado" })
    }
};


export const controladorCarritos = {
    obtenerCarritoXid,
    crearCarrito,
    obtenerTodosProdsCarrito,
    guardarProdsCarrito,
    eliminarProdCarrito,
    eliminarCarritoXid,
};










