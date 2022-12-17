import express from "express";
import session from "express-session";
import handlebars from 'express-handlebars'
import { config } from "./src/config/index.js";
import MongoStore from "connect-mongo";
import { SessionRouter, ProductsRouter } from "./src/router/index.js";
import path from 'path'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static(path.join(process.cwd() + './public')))
app.set('view engine', 'hbs')
app.set('views', './public/views');
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    // layoutsDir: '/views/layouts',
    // partialsDir: '/views/partials',
}))



const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME,
        mongoOptions,
        ttl: 60,
        collectionName: 'sessions'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use('/', SessionRouter)
app.use('/products', ProductsRouter)


app.listen(config.SERVER.PORT, () => {
    console.log(`Server inicializado en el puerto ${config.SERVER.PORT} - Desafio 12 - Persistir datos de la session en Mongo Atlas`);
})