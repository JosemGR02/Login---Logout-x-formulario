
import { HTTP_STATUS } from '../Constantes/api_contantes.js';
import { respuestaError } from '../Utilidades/mocks-utils/index.js';


const errorMiddleware = (error, solicitud, respuesta, next) => {
    const errorStatus = error.statusCode || HTTP_STATUS.INTERNAL_ERROR;
    const errorMessage = error.message || "Hubo un error inesperado";
    const errorDetails = error.message ? null : error;
    return respuesta
        .status(errorStatus)
        .json(respuestaError(errorMessage, errorDetails));
};

export { errorMiddleware };