

const irHome = (solicitud, respuesta, next) => {
    if (solicitud.isAuthenticated())
        return respuesta.render("home", { usuario: solicitud.session.usuario });
    next();
};

export { irHome };

// ruta.get("/", irHome, (solicitud, respuesta) => {
//     respuesta.render("login");
// });