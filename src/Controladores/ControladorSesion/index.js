

const loginUsuario = (solicitud, respuesta) => {
    try {
        if (solicitud.session.contador) {
            solicitud.session.contador++;
            alert(`Hola ${solicitud.session.usuario.nombre}, visitaste nuestra página ${solicitud.session.contador} veces!!`);

            // falta la fijar tiempo de expiracion de 10m (sesion),
            //recargable con cada visita del cliente a la pag -> deslogueo (ttl: 600) 

            respuesta.render('view/home', { respuesta: solicitud.session.usuario.nombre })
        } else {
            respuesta.render('view/login');
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

        respuesta.render('view/home');
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error en el post de login");
        respuesta.render('view/login');
    }
}

const logoutUsuario = (solicitud, respuesta) => {
    try {
        const sesionUsuario = solicitud.session.usuario.nombre
        solicitud.session.destroy();

        respuesta.render('view/logout', { usuario: sesionUsuario });
    } catch (error) {
        respuesta.send(500, ' ' + error, "Error al intentar desloguearse");
        respuesta.render('view/home');
    }
}



export const controladorSesion = {
    loginUsuario,
    logoutUsuario,
    loginPost
}



