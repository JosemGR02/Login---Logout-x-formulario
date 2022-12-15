
class HttpError {
    constructor(status, message, details) {
        this.statusCode = status;
        this.message = message;
        this.details = details;
    }
}


const respuestaExito = (data) => {
    return {
        success: true,
        data,
    };
};

const respuestaError = (message, details = null) => {
    return {
        success: false,
        message,
        details,
    };
};


export { respuestaExito, respuestaError, HttpError };