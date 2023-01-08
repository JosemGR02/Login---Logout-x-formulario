
const irHome = (solicitud, respuesta) => {
    try {
        if (solicitud.session.usuario) {
            respuesta.render('view/home', { usuario: solicitud.session.usuario })
        } else {
            respuesta.render('view/login');
        }
    } catch (error) {
        respuesta.send(`${error}, Error en el get de login`);
    }
}

const inicioSesion = (solicitud, respuesta) => {
    try {
        console.log(solicitud.body.usuarioNombre)
        if (!solicitud.body.usuarioNombre) {
            throw new Error('Sin nombre de usuario, por favor envie su usuario por el formulario');
        }
        solicitud.session.usuario = solicitud.body.usuarioNombre;

        solicitud.session.guardar(error => {
            if (error) {
                respuesta.send(`${error}, Error al guardar la sesion`);
            } else {
                respuesta.render('view/home', { usuario: solicitud.session.usuario });
            }
        })
    } catch (error) {
        respuesta.send(`${error}, Error en el post de login`);
    }
}

const cerrarSesion = (solicitud, respuesta) => {
    try {
        if (solicitud.session.usuario) {
            const sesionUsuario = solicitud.session.usuario;

            solicitud.session.destroy(error => {
                if (error) {
                    respuesta.send(`${error}, Error al borrar la sesion`);
                } else {
                    respuesta.render('view/logout', { usuario: sesionUsuario });
                }
            });
        }
    } catch (error) {
        respuesta.send(`${error}, Error en el logout`);
    }
}


export const controladorSesion = {
    irHome,
    inicioSesion,
    cerrarSesion
};





