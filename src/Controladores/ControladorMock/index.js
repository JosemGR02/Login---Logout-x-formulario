
import { Ruta } from "express";
import { HTTP_STATUS } from '../../Constantes/api_contantes.js';
import { servicioMock } from '../../Servicios/ServicioMock/index.js';

const servicio = new servicioMock()

const rutas = Ruta();


rutas.get("/test/", (solicitud, respuesta) => {
    try {
        const productos = servicio.obtenerTodos()

        const respuestaProds = respuestaExito(productos);

        respuesta.status(HTTP_STATUS.OK).json(respuestaProds)
    } catch (error) {
        respuesta.send({ error, error: errorMiddleware }) //sin miedo al exito
    }
});

rutas.get("/test/:id", (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params

        const producto = servicio.obtenerUno(id)

        const respuestaProd = respuestaExito(producto);

        respuesta.status(HTTP_STATUS.OK).json(respuestaProd)
    } catch (error) {
        respuesta.send({ error, error: errorMiddleware })
    }
});

rutas.post("/test/popular", (solicitud, respuesta) => {
    try {
        servicio.populate(solicitud.query.limite)

        respuesta.status(HTTP_STATUS.CREATED).json({ create: true })
    } catch (error) {
        respuesta.send({ error, error: errorMiddleware })
    }
});

rutas.delete("/test/:id", (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params;

        const producto = servicio.eliminar(id)

        respuesta.send({ success: true, data: producto });
    } catch (error) {
        respuesta.send({ error, error: errorMiddleware })
    }
});

export { rutas as RutaMock };




//-------------------------------------------------------------------------------------------------------------//


// http://localhost:8080/api/productos/test?cant=5



// POST /api/usuarios/popular?cant=n : si no específico cant me genera 50 objetos mock
// GET /api/usuarios/:id? : con id me trae un mock; sin id devuelve todos los mocks
// POST /api/usuarios : incorpora un nuevo mock
// PUT /api/usuarios/:id : actualiza un mock total o parcialmente por campo
// DELETE /api/usuarios/:id : borra un mock específico



//-------------------------------------------------------------------------------------------------------------//




