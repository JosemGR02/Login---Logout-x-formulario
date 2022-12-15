
const getTimestamp = () => {
    const fecha = new Date();
    return `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
};


export const FECHA_UTILS = { getTimestamp };