
// imports
import express from 'express';
import handlebars from 'express-handlebars';
import { Server as ServidorHttp } from "http";
import { Server as ServidorIO } from "socket.io";
import { RutaCarrito, RutaProductosTest, RutaProducto, RutaSesiones, RutaMensajes } from "./Rutas/index.js";
import { sesiones } from './Sesion/index.js';
import { DaoMensaje, DaoProducto } from "./Dao/index.js";
import { errorMiddleware } from './Middlewares/index.js';


// dayjs
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat)


const app = express();
const PORT = process.env.PORT || 8080;

app.use(sesiones.mongo);


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))


// Middleware del error
app.use(errorMiddleware);

// IO
const servidorHttp = new ServidorHttp(app);
const io = new ServidorIO(servidorHttp);


//Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set('view engine', 'hbs')
app.set('views', './public/Vistas');


//Rutas
// app.use('/', RutaHome);RutaHome
app.use('/api/sesiones', RutaSesiones);
app.use('/api/productos', RutaProducto);
app.use('/api/carrito', RutaCarrito);
app.use('/api/productos-test', RutaProductosTest);
app.use('/api/mensajes', RutaMensajes);

//Servidor
servidorHttp.listen(PORT, () => { console.log(`Servidor escuchando en puerto: ${PORT}`) })



// EVENTOS

// conexion socket usuarios

io.on('connection', socket => {
    console.log(`usuario conectado ${socket.id}`);
    enviarTodosProds()
    enviarPorcentajeCompresion()
    enviarTodosMsjs()

    socket.on('nuevo producto', nuevoProd => {
        nuevoProducto(socket, io, nuevoProd)
    })

    socket.on('nuevo mensaje', nuevoMsg => {
        nuevoMensaje(socket, io, nuevoMsg)
    })

})


// enviar todos (msj y prods)

const enviarTodosProds = async (socket) => {
    const todosProds = await DaoProducto.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}

const enviarTodosMsjs = async (socket) => {
    const todosMsjs = await DaoMensaje.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}



// nuevo mensaje

const nuevoMensaje = async (socket, io, nuevoMsj) => {
    const fecha = new Date()
    const fechaFormateada = dayjs(fecha).format('DD/MM/YYYY hh:mm:ss')
    console.log("fecha formateada", fechaFormateada)
    await DaoMensaje.guardar({ msj: nuevoMsj, createDate: `${fechaFormateada} hs` })

    const todosMsjs = await DaoMensaje.obtenerTodos()
    io.sockets.emit('todos los mensajes', todosMsjs)
}

// nuevo producto

const nuevoProducto = async (socket, io, nuevoProd) => {
    await DaoProducto.guardar(nuevoProd)
    const todosProds = await DaoProducto.obtenerTodos()
    io.sockets.emit('todos los productos', todosProds)
}




// Jose:

// Te recomiendo que revises los últimos afters, especialmente la parte de backend, la parte de React no importa tanto, pero te recomiendo que los veas, más que nada para familiarizarte con el uso de passport.



// No sé si estás realizando el desafío login por formulario, de la clase Cookies, Sesiones, Storages - Parte 2, o el desafío Inicio de sesión, de la clase Estrategias de autenticación con redes sociales.

// El primero no utiliza pasport, el segundo sí, pero te recomiendo que te familiarices con el uso de passport ya que es lo que se pide para el proyecto final.

// En cuanto a los errores que tenés, me parece que hay muchos errores que son sencillos de solucionar, pero tenés un proyecto tan grande para lo que pide realmente el desafío y tantas cosas mezcladas que terminás con un bloqueo, sin saber por qué o de donde viene cada cosa.

// Por ejemplo, la ruta http://localhost:8080/api/sesiones/home te muestra un 'cannot get' porque esa ruta no existe, no la definis en el router que se encarga de esa ruta base, que es '/api/sesiones'

// Si te fijás en app.js:

// import { RutaCarrito, RutaProductosTest, RutaProducto, RutaSesiones, RutaMensajes, RutaVistas } from "./Rutas/index.js";

// Luego, más abajo:

// app.use('/api/sesiones', RutaSesiones);

// Y si te vas al archivo donde se exporta el router llamado RutaSesiones, que es Rutas/sesiones/index.js, podes ver que no hay ninguna ruta que sea '/home'

// Es un error que a estas alturas del curso no debería suponerte una dificultad muy grande para solucionar.

// Lo mismo con el tema de las vistas, se trata simplemente de planificar bien y comprender la estructura, saber a qué archivo hacemos referencia y en donde, respetar los nombres, mayúsculas y minúsculas, etc. Para eso tenemos disponibles varios repositorios de ejemplo, sobre todo los de los after.

// En cuanto al error 500 que te figura en la ruta 'http://localhost:8080/api/sesiones/logout', hay varias cuestiones a destacar:

// En primer lugar, ese '500' lo pusiste vos, hardcodeado en el controlador. No es un código de status, de hecho si haces la petición con postman o miras la solicitud de red en el navegador vas a ver que no tiene status 500. Con lo cual, deberías saber de donde viene ese '500'. Pasa que no te muestra el mensaje completo en el navegador porque está mal concatenado, debería ser algo así:

// respuesta.send(500 + ' ' + error + " Error al intentar desloguearse");

// O bien usar template strings, como vimos al principio del curso:

// respuesta.send(`500 ${error} Error al intentar desloguearse`);

// En cuanto a por qué ocurre ese error, bueno... Primero, porque falla el try, entonces salta al catch. Y luego falla el catch también. Me explico:

// El primer error que tenes es:

// TypeError: Cannot read properties of undefined (reading 'nombre')

//   at logoutUsuario (file:///home/marcos/tutorias-ch/Login---Logout-x-formulario/src/Controladores/ControladorSesion/index.js:37:57)

// Eso es que estás guardando o leyendo mal los datos de la sesión:

// const sesionUsuario = solicitud.session.usuario.nombre // tendrías que asegurarte de que usuario.nombre sea lo que le llega realmente a solicitud.session

// Esa es la falla del try. El catch falla con el siguiente error:

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

// Y eso significa que no podes hacer un res.send y luego un res.render, basicamente, porque ya enviaste una respuesta al cliente que hizo la petición.

// Te recomiendo, como ya te comenté anteriormente, que uses el console.log para debuguear los errores (más adelante en el curso veremos formas mejores para guardar logs), pero usar console.log te sirve un montón, tanto como para mostrar errores por consola como para saber qué falla y dónde una vez que tenes el error


// Dale Marcos gracias x la devolucion, tenes razon, si, estoy avanzando con ese desafio paralamente, y con lo de la ruta vistas / js estube viendo el 2do after para ver si podia guiarme


// "tendrías que asegurarte de que usuario.nombre sea lo que le llega realmente a solicitud.session" okey

// claro, tendria que tener esa ruta en RutaSesiones (/home) y redirigirlo a esa vista(home)



// asi estaria bien?
// redirigindolo en el try

// if (sesionUsuario) {
//     respuesta.render('view/logout', { usuario: sesionUsuario });
// } else {
//     respuesta.render('view/home');
// }



