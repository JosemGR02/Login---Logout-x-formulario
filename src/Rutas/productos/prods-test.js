
import { Router } from 'express';
import { controladorProductos } from '../../Controladores/index.js';


const ruta = Router()

ruta.get('/', controladorProductos.obtenerProdsTest)


export { ruta as RutaProductosTest }



