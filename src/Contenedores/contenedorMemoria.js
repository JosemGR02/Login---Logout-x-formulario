
class ContenedorMemoria {
    constructor() {
        this.elementos = [];
    }

    obtenerTodos() {
        return this.elementos;
    }

    guardar(elemento) {
        elemento.id = this.elementos.length === 0 ? 1 : this.elementos[this.elementos.length - 1].id + 1;

        this.elementos.push(elemento);

        return elemento;
    }

    obtenerXid(id) {
        return this.elementos.find((elemento) => elemento.id === id);
    }

    actualizar(id, nuevosdatos) {
        const elementoIndex = this.elementos.findIndex((elemento) => elemento.id == id);

        if (elementoIndex === -1) return null;

        const elementoEncontrado = this.elementos[elementoIndex];

        this.elementos[elementoIndex] = {
            ...this.elementos[elementoIndex],
            ...nuevosdatos,
        };

        return this.elementos[elementoIndex];
    }

    eliminarXid(id) {
        this.elementos.filter((elemento) => elemento.id != id);
        return { success: true };
    }
}

export { ContenedorMemoria };