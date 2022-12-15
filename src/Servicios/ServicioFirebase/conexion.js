
import admin from "firebase-admin";
import serviceAccount from "../../Configuracion/configFirebase.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const conectar = async () => {
    try {
        const baseDatos = admin.firestore();
        console.log('FIREBASE CONECTADO CORRECTAMENTE')
        return baseDatos
    }
    catch (error) {
        console.log('ERROR AL CONECTARSE A FIREBASE ', error)
    }

}
export { conectar };