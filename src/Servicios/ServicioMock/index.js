
import { crearProductosFake } from '../../Utilidades/mocks-utils/faker_utils.js';

class mockServicio {
    constructor() {
        this.items = []
    }
    obtenerTodos() {
        return this.items
    }
    obtenerUno(id) {
        return this.items.find(item => item.id == id)
    }
    insertar(obj) {
        this.items.push(obj)
    }
    populate(limite = 5) {
        for (let index = 1; index < limite; index++) {
            this.insert(crearProductosFake())
        }
    }
    eliminar() {
        this.items.filter((item) => item.id != id);
        return { success: true };
    }

}
export { mockServicio }





