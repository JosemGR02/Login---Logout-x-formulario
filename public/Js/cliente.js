
import { datosDesnormalizados, comprencionTotal } from "../Desnormalizacion/index.js"

const socket = io.connect();

// formularios
const productosForm = document.getElementById('formularioProds')
const mensajesForm = document.getElementById('formularioMjs')
const LoginForm = document.getElementById('formularioLogin')


// contenedores
const contenedorProds = document.getElementById('contenedorProductos')
const contenedorChat = document.getElementById('contenedorMensajes')
const contenedorXcentaje = document.getElementById('contenedorPorcentaje')


homeBoton - (redireccionHome)
LogoutBoton - (redireccionLogout)

// RENDERS

// render productos
const limpiarProds = () => {
    contenedorProds.innerHTML = ""
}
const ProductosRenderizados = async (productos) => {
    let respuesta = await fetch('/assets/templates/productoTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ productos })
    contenedorProds.innerHTML = html
}

// render mensajeria
const limpiarChat = () => {
    contenedorChat.innerHTML = ""
}

const mensajesRenderizados = async (mensajes) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ mensajes })
    contenedorChat.innerHTML = html
}

const renderMensajesDesnormalizados = async (datosDesnormalizados) => {
    let respuesta = await fetch('/public/Assets/Vistas/Templates/mensajeriaTemplate.hbs');
    const template = await respuesta.text()
    const templateCompilado = Handlebars.compile(template)
    const html = templateCompilado({ datosDesnormalizados })
    contenedorChat.innerHTML = html
}

// LISTENERS

// Listeners Productos
productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})


// Listeners Mensajeria
mensajesForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(mensajesForm)
    const valoresformulario = Object.fromEntries(datosFormulario)
    console.log(valoresformulario);
    mensajesForm.reset();
    socket.emit('nuevo mensaje', valoresformulario);
})

// Listener formulario LOGIN
LoginForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})


// EVENTOS

// Eventos Productos
socket.on('todos los productos', todosProds => {
    productos = todosProds
    limpiarProds()
    ProductosRenderizados(todosProds)
})


// Eventos mensajeria
socket.on('todos los mensajes', todosMsgs => {
    mensajes = todosMsgs
    limpiarChat()
    mensajesRenderizados(todosMsgs)
    // renderMensajesDesnormalizados(todosMsgs)
})


// Listeners Productos
productosForm.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const datosFormulario = new FormData(productosForm)
    const valoresFormulario = Object.fromEntries(datosFormulario)
    productosForm.reset();
    socket.emit('nuevo producto', valoresFormulario);
})

//logout
// const logout = async () => {
//   await fetch("/api/auth/logout", { method: "POST" });

//   window.location.replace("/login");
// };

// const logoutBtn = document.getElementById("logoutBtn");

// logoutBtn.onclick = logout;

// const formLogin = document.querySelector('#login') //id de el form

// const formData = new FormData(formLogin);

// const login = async (e) => {

// const ListenerLogin addEventListener('submit'), evento => {
//     evento.preventDefault();

//     fetch("/api/sesiones/login", {
//         body: JSON.stringify(formData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         // redirect: true,
//     });
//     // then
// }



// const formLogin = document.querySelector('#login') //id de el form

// const formData = new FormData(formLogin);


// const ListenerLogin = async (e) => {
//     evento.preventDefault();

//     fetch("/api/sesiones/login", {
//         body: JSON.stringify(formData),
//         headers: {
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         // redirect: true,
//     });

//     if (respuesta.status === 200) {
//         return window.location.replace("/home"); //home
//     }
//     ListenerLogin.addEventListener("submit", ListenerLogin);
// }







// https://www.youtube.com/watch?v=I03_z5DBgp4




// const logoutBtn = document.getElementById("logoutBtn");

// logoutBtn.onclick = logout;


//necesito contestarle al tutor



// nesesito terminar el tp login x datosFormulario

// vistas usuario listener-boton

// necesito obtener la data y pasarla a un json 
// luego hacer un fech a la ruta login, 


// guardar los datos (usuarios- session) en baseDatos cloud o compass de Mongo


// comenzar el tp iniciar sesion




/*------------------------------------------------------------------------------------------------------------------*/



// import { API_ROUTES } from "./routes.js";
// import { utils } from "./utils.js";

// // para usar import de modules acá en los static, tenemos que en el html, ponerle type="module" al script index.js

// const renderProducts = async () => {
//   const productsContainer = document.getElementById("productsContainer");

//   const products = await API_ROUTES.getProducts();

//   productsContainer.innerHTML = await utils.makeProductTable(products);
// };

// const getProductBtn = document.getElementById("getProductsBtn");

// getProductBtn.addEventListener("click", renderProducts);

// // por supuesto podriamos cargar los productos cuando entremos a la página, usando el objeto window y con un event listener de tipo "load"
// window.addEventListener("load", renderProducts);



/*------------------------------------------------------------------------------------------------------------------*/




// import { API_ROUTES } from "./routes.js";

// API_ROUTES.getProducts().then((data) => console.log(data));

// const logout = async () => {
//   await fetch("/api/auth/logout", { method: "POST" });

//   window.location.replace("/login");
// };

// const logoutBtn = document.getElementById("logoutBtn");

// logoutBtn.onclick = logout;



/*------------------------------------------------------------------------------------------------------------------*/

const login = async (e) => {
    e.preventDefault();

    const datos = new FormData(loginForm);

    const credenciales = {};

    for (const campo of datos) {
        credenciales[campo[0]] = campo[1];
    }

    const respuesta = await fetch("/api/auth", {
        body: JSON.stringify(credenciales),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        // redirect: true,
    });

    if (response.status === 200) {
        return window.location.replace("/home"); //home
    }

    loginForm.addEventListener("submit", login);
}



// const loginForm = document.getElementById("loginForm");

// const login = async (e) => {
//     e.preventDefault();

//     const data = new FormData(loginForm);

//     const credenciales = {};

//     for (const campo of datos) {
//         credenciales[campo[0]] = campo[1];
//     }

//     const response = await fetch("/api/auth", {
//         body: JSON.stringify(credentials),
//         headers: {
//             "Content-Type": "application/json",
//         },
//         method: "POST",
//         // redirect: true,
//     });

//     if (response.status === 200) {
//         return window.location.replace("/home"); //home
//     }

//     alert("Contraseña Incorrecta");
// };

// loginForm.addEventListener("submit", login);

// const githubBtn = document.getElementById("githubBtn");

// githubBtn.addEventListener("click", (e) => {
//     e.preventDefault();

//     window.open("http://localhost:8080/api/auth/github-login", "_self");
// });
