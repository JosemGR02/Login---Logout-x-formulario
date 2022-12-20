
import { Router } from 'express';

const ruta = Router();


ruta.get('/', (solicitud, respuesta) => {
    respuesta.render("home")
});

ruta.get('/login', (solicitud, respuesta) => {
    respuesta.render("login")
});


export { ruta as RutaVistas };





