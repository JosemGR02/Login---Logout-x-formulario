
import mongoose from "mongoose";

class ContenedorMongoBD {
    constructor({ nombre, schema }) {
        this.model = mongoose.model(nombre, schema);
    }

    async obtenerTodos() {
        const respuesta = await this.model.find();
        return respuesta;
    }

    async guardar(elemento) {
        const respuesta = await this.model.create(elemento);
        return respuesta;
    }

    async obtenerXid(id) {
        const respuesta = await this.model.findById(id);

        return respuesta;
    }

    async actualizar(id, nuevosDatos) {
        const respuesta = await this.model.findByIdAndUpdate(id, nuevosDatos, {
            new: true,
        });
        return respuesta;
    }

    async eliminarXid(id) {
        const respuesta = await this.collection.findByIdAndDelete(id);
        return respuesta;
    }
}

export { ContenedorMongoBD };

