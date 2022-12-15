

import { faker } from '@faker-js/faker';
faker.locale = "es";


const crearProductosFake = (cant) => {
    const listaProductos = []

    for (let i = 0; i < cant; i++) {
        const producto = {
            id: faker.datatype.uuid(),
            titulo: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.business()
        }
        listaProductos.push(producto)
    }
    return listaProductos
};

export { crearProductosFake };


