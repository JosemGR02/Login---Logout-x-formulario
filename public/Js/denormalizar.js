
import { denormalizar } from './Utilidades/mocks-utils/normalizar.js.js';
import { MensajesNormalizados } from './Utilidades/mocks-utils/normalizar.js.js';


const MensajesDenormalizados = denormalizar(MensajesNormalizados);

mostrar(MensajesDenormalizados)


const elementoNormal = parseInt(JSON.stringify(MensajesNormalizados).length)
const elementOriginal = parseInt(JSON.stringify(MensajesDenormalizados).length)


console.log(JSON.stringify(mensajes).length);
console.log(JSON.stringify(MensajesNormalizados).length);
console.log(JSON.stringify(MensajesDenormalizados).length);


function obtenerPorcentaje(primerElemento, segundoElemento) {
    const porcentaje = ((primerElemento / segundoElemento * 100) - 100).toFixed(2)
    console.log(`El porcentaje de compresion fue del ${porcentaje}%`);
}


const comprensionTotal = obtenerPorcentaje(elementoNormal, elementOriginal);


export { MensajesDenormalizados, comprensionTotal };
