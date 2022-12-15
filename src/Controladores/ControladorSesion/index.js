

const loginUsuario = (solicitud, respuesta) => {
    if (solicitud.session.contador) {
        solicitud.session.contador++;
        console.log(`Hola ${solicitud.session.usuario} visitaste nuestra página ${solicitud.session.contador} veces!!`);

        respuesta.render('Vistas/view/index.hbs', { respuesta: solicitud.session.usuario })
    } else {
        respuesta.send(500, ' ' + error, "Error al intentar loguearse");
        respuesta.render('Vistas/view/login.hbs');
    }
}

const loginPost = (solicitud, respuesta) => {
    try {
        const usuarioNombre = solicitud.body || 'sin identificacion';

        solicitud.session.usuario = usuarioNombre
        solicitud.session.contador = 1;

        respuesta.render('Vistas/view/index.hbs');
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error en el post de login");
        respuesta.render('Vistas/view/login.hbs');
    }
}

const logoutUsuario = (solicitud, respuesta) => {
    try {
        const sesionUsuario = solicitud.session.usuario
        solicitud.session.destroy();

        respuesta.render('Vistas/logout.hbs', { sesionUsuario });
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error al intentar desloguearse");
        respuesta.render('Vistas/view/index.hbs');
    }
}


export const controladorSesion = {
    loginUsuario,
    logoutUsuario,
    loginPost
}

