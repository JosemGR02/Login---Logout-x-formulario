
import { Schema } from "mongoose";

const ColeccionMensajes = "mensajes";

const EsquemaMensajes = new Schema(
    {
        id: { type: String, required: true, max: 10 },
        texto: { type: String, required: true, max: 200 },
    }
);

EsquemaMensajes.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});


export const modeloMensajes = { EsquemaMensajes, ColeccionMensajes }

// {id: 'mensajes', mensajes: []}