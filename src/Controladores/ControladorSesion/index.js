

const loginUsuario = (solicitud, respuesta) => {
    try {
        if (solicitud.session.contador) {
            solicitud.session.contador++;
            alert(`Hola ${solicitud.session.usuario}, visitaste nuestra página ${solicitud.session.contador} veces!!`);

            respuesta.render('Vistas/view/inicio', { respuesta: solicitud.session.usuario.nombre })
        } else {
            respuesta.render('Vistas/view/login');
        }
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error al intentar loguearse");
    }
}

const loginPost = (solicitud, respuesta) => {
    try {
        const usuarioNombre = solicitud.body || 'sin identificacion';

        solicitud.session.usuario.nombre = usuarioNombre
        solicitud.session.contador = 1;

        respuesta.render('Vistas/view/inicio');
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error en el post de login");
        respuesta.render('Vistas/view/login');
    }
}

const logoutUsuario = (solicitud, respuesta) => {
    try {
        const sesionUsuario = solicitud.session.usuario.nombre
        solicitud.session.destroy();

        respuesta.render('Vistas/logout', { usuario: sesionUsuario });
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error al intentar desloguearse");
        respuesta.render('Vistas/view/inicio');
    }
}


export const controladorSesion = {
    loginUsuario,
    logoutUsuario,
    loginPost
}
