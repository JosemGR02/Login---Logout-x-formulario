
import joi from "joi";

const productoJoi = joi.object({
    titulo: joi.string().min(4).max(45).required(),
    descripcion: joi.string().min(5).max(100).required(),
    codigo: joi.string().min(5).max(10).required(),
    imagen: joi.string().min(20).max(150).required(),
    precio: joi.number().required(),
    stock: joi.number().required(),
    timestamp: joi.string().required(),
});

export const JOI_VALIDADOR = { productoJoi };

