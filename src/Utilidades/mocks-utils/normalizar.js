
// NORMALIZAR

import { normalize, schema, denormalize } from 'normalizr';
import { DaoMensaje } from '../../Dao/index.js';
// import { mensajes } from '../../Controladores/ControladorMensajes/index.js';
import util from 'util';

// const mensajes = await DaoMensaje.ObtenerMensajes();

// const messages = await chat.getMessages();
// de aca entiendo que estaria hablando de un DaoMensaje y/o contenedor de mensajes y utilizando un ruta para obtener todos (mensajes) utilizando postman, tendria que hacer algo asi?

const mostrar = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
};

const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('mensajes', {
    autor: autorSchema,
})

function normalizar(mensajes) {
    const modeloNormalizar = mensajes.map((msj) => ({
        autor: msj.autor,
        fecha: msj.fecha,
        texto: msj.texto,
        id: msj.id,
    }));

    const normalizados = normalize(
        { id: 'mensajes', mensajes: modeloNormalizar },
        texto
    );

    return normalizados
}

const denormalizar = (objeto) => {
    return denormalize(objeto.result, texto, objeto.entities)
}


// const MensajesNormalizados = normalizar(msj);

// mostrar(MensajesNormalizados);


// export { MensajesNormalizados, denormalizar };

