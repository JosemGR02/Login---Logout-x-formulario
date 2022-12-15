
import { Schema } from "mongoose";

const ColeccionChat = "chats";

const EsquemaChat = new Schema(
    {
        author: {
            id: { type: String, required: true, max: 10 },
            nombre: { type: String, required: true, max: 40 },
            apellido: { type: String, required: true, max: 40 },
            edad: { type: Number, required: true, max: 3 },
            alias: { type: String, required: true, max: 30 },
            avatar: { type: String, required: true, max: 150 },
            texto: [{ type: Schema.Types.ObjectId, ref: 'mensajes' }]
        },
    }
);

EsquemaChat.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});

export const modeloChat = { EsquemaChat, ColeccionChat }
