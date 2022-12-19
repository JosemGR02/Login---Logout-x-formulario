
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
app.use('/api/productos', RutaProducto)
app.use('/api/carrito', RutaCarrito)
app.use('/api/productos-test', RutaProductosTest)
app.use('/api/sesion', RutaSesiones);
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


