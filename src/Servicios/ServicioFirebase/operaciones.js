
import { conectar } from "./conexion.js";
import { contenedorFirebase } from "../../Contenedores/index.js";


conectar().then(baseDatos => {
    const collections = baseDatos.collection('productos')

    // contenedorFirebase.create(collections,{ nombre: 'Fulanito', apellido: 'de tal', dni: '673782674' })
    // .then( ()=> contenedorFirebase.create(collections,{ nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }) )
    // .then( ()=> contenedorFirebase.create(collections,{ nombre: 'Pepe', apellido: 'flind', dni: '523635265' }) )
    // .then( ()=> contenedorFirebase.create(collections,{ nombre: 'Roman', apellido: 'perez', dni: '325425454' }) )
    // .then( ()=> contenedorFirebase.findAll(collections) )
    // .then( datos =>{
    //     console.log(datos)
    //     // return contenedorFirebase.update(collections,)
    // })

    contenedorFirebase.findAll(collections).then(datos => {
        console.log(datos)

        return contenedorFirebase.update(collections, 'tdgsf2dhsjuq1j2rx', { nombre: "pepito" })
    }).then(() =>
        contenedorFirebase.findAll(collections)
    )
        .then(datos => console.log(datos))
})
