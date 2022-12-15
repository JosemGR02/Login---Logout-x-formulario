
const ES_ADMIN = true;

const verificarAdmin = (solicitud, respuesta, next) => {
    if (!ES_ADMIN) return respuesta.send({ error: "¡Su usuario no esta autorizado!" });

    next();
};

export { verificarAdmin };



