
import { Schema } from "mongoose";

const ColeccionCarrito = "carritos";

const CarritoEsquema = new Schema(
    {
        timestamp: { type: String, required: true, max: 100 },
        productos: [{ type: Schema.Types.ObjectId, ref: "productos" }],
    },
    {
        virtuals: true,
    }
);

CarritoEsquema.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta._id;
        return respuesta;
    },
});

export const modeloCarrito = { ColeccionCarrito, CarritoEsquema };
