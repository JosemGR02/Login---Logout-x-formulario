
import { DaoMensaje } from "../../Dao/index.js";
import { FECHA_UTILS, ERRORES_UTILS, LOGGER_UTILS } from "../../Utilidades/index.js";


const ObtenerMensajes = async (solicitud, respuesta) => {
    try {
        const mensajes = await DaoMensaje.obtenerTodos();

        if (!mensajes) {
            return respuesta.send({ error: ERRORES_UTILS.MESSAGES.ERROR_MENSAJES });
        }
        respuesta.send(mensajes);

        return { mensajes }
    } catch (error) {
        respuesta.send({ error, error: "Error al obtener los mensajes solicitados" })
    }
};


const CrearMensaje = async (solicitud, respuesta) => {
    try {
        const { autor, id, nombre, apellido, edad, alias, avatar, texto } = solicitud.body;

        const nuevoMensaje = await DaoMensaje.guardar({
            autor, id, nombre, apellido, edad, alias, avatar, texto,
            timestamp: FECHA_UTILS.getTimestamp(),
        });

        const mensajeCreado = await DaoMensaje.guardar(nuevoMensaje);

        respuesta.send({ success: true, mensaje: mensajeCreado });
        return mensajeCreado
    } catch (error) {
        await LOGGER_UTILS.addLog(error);
        respuesta.send({ error, error: "Error al crear el mensaje solicitado" })
    }
};


export const controladorMensajes = {
    ObtenerMensajes,
    CrearMensaje
};


