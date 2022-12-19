
// const usuariosRenderizados = async (usuarios) => {
//     let respuesta = await fetch('/public/Assets/Vistas/Templates/usuarioTemplate.hbs');
//     const template = await respuesta.text()
//     const templateCompilado = Handlebars.compile(template)
//     const html = templateCompilado({ usuarios })
//     contenedorChat.innerHTML = html
// }

// socket.on('evento login'), login => {
//     usuarios = login
//     usuariosRenderizados(login)
// }

// // Lautallarico

// const oginUsuario = (solicitud, respuesta) => {
//     try {
//         respuesta.render('login.hbs')
//     } catch (error) {
//         console.log(error, "Error en el login de usuario");
//     }
// }

// const ogoutUsuario = (solicitud, respuesta) => {
//     try {
//         const userName = solicitud.session.user
//         solicitud.session.destroy()
//         respuesta.render('logout.hbs', { userName })
//     } catch (error) {
//         console.log(error, "Error en el logout de usuario");
//     }
// }

// const oginPost = (solicitud, respuesta) => {
//     try {
//         console.log('id de session: ', solicitud.session.id);
//         const { user } = solicitud.session.id
//         solicitud.session.user = user
//         respuesta.redirect('/products')
//         // respuesta.render('products.hbs')
//     } catch (error) {
//         console.log(error, "Error desde el post de login");
//     }
// }

// export const SessionController = { loginUsuario, logoutUsuario, loginPost }



/*------------------------------------------------------------------------------------------------------------------*/






// // ivan 

// //Array de nombre usuario
// // let usuario = [{ nombre: "sin nombre" }]

// // // inicio

// // Si no hay una session iniciada te envia a la plantilla login de handlebars //
// router.get('/', (solicitud, respuesta) => {
//     if (solicitud.session.contador) {
//         const user = solicitud.session.nombre
//         usuario[0].nombre = user[0].nombre
//         respuesta.render('view/index', { usuario, productos })
//     } else {
//         respuesta.render('view/login')
//     }
// })

// // Desde la plantilla login de handlebars, se envia un form con el nombre de usuario //
// router.post('/login', (respuesta, res) => {
//     const nombre = solicitud.body;
//     usuario[0].nombre = nombre.user
//     solicitud.session.contador = 1;
//     solicitud.session.nombre = usuario
//     respuesta.redirect('/')
// })

// // Desde logout se destruye la session //
// router.get('/logout', (solicitud, respuesta) => {
//     try {
//         solicitud.session.destroy();
//         respuesta.render('view/logout', { usuario });
//     } catch (error) {
//         respuesta.send(500, ' ' + error);
//     }
// })









/*------------------------------------------------------------------------------------------------------------------*/

// CODERHOUSE


const iniciar = (solicitud, respuesta) => {
    if (solicitud.session.contador) {
        solicitud.session.contador++;
        respuesta.status(200).send(`${solicitud.session.nombre} visitaste la página ${solicitud.session.contador} veces`);
    } else {
        const nombre = solicitud.query.nombre || 'sin identificacion';
        solicitud.session.contador = 1;
        solicitud.session.nombre = nombre
        respuesta.status(200).send(`${nombre} te damos la bienvenida`);
    };
}

const cerrar = (solicitud, respuesta) => {
    try {
        solicitud.session.destroy();
        respuesta.status(200).send('Hasta luego ');
    } catch (error) {
        respuesta.send(500, ' ' + error);
    }
}


// Login con session


app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' || password !== 'pepepass') {
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})


// Middleware de autenticación

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
        return next()
    }
    return res.status(401).send('error de autorización!')
}


// Aplicación del middleware

app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
})


// Logout con session

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.send('Logout ok!')
    })
})





// Definir un método POST que reciba un objeto con el nombre de la cookie,
// su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.

// Definir un método GET que devuelva todas las cookies presentes.

// Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.
