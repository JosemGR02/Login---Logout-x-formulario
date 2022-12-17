const router = require('express').Router();

//Array de productos
let productos = [];

//Array de nombre usuario
let usuario = [{ nombre: "sin nombre" }]


// Si no hay una session iniciada te envia a la plantilla login de handlebars //
router.get('/', (req, res) => {
    if (req.session.contador) {
        const user = req.session.nombre
        usuario[0].nombre = user[0].nombre
        res.render('view/index', { usuario, productos })
    } else {
        res.render('view/login')
    }
})

// Desde la plantilla login de handlebars, se envia un form con el nombre de usuario //
router.post('/login', (req, res) => {
    const nombre = req.body;
    usuario[0].nombre = nombre.user
    req.session.contador = 1;
    req.session.nombre = usuario
    res.redirect('/')
})

// Desde logout se destruye la session //
router.get('/logout', (req, res) => {
    try {
        req.session.destroy();
        res.render('view/logout', { usuario });
    } catch (error) {
        res.send(500, ' ' + error);
    }
})


//Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario). //
router.post('/productos', (req, res) => {
    const { producto, precio, urlImagen } = req.body;
    productos.push({ producto, precio, urlImagen });
    res.redirect('/')
});





module.exports = router;