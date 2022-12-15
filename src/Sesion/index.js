
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis'; (session)
import FileStore from 'session-file-store'; (session)
import MongoStore from 'connect-mongo';


// Redis
const redisClient = createClient({
    legacyMode: true,
    url: 'redis://localhost:6379'
})

redisClient.connect().catch(error => console.log(error, "Error en Redis"))


// Mongo
const MongoURI = process.env.MONGO_URI || 'mongodb://localhost:8080'
const mongOptiones = { useNewUrlParser: true, useUnifiedTopology: true }


const sesiones = {
    fileStore: session({
        store: new FileStore({ path: './sesiones', ttl: 60, retries: 0 }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000
        }
    }),
    redis: session({
        store: new RedisStore({ client: redisClient, ttl: 60 }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }),
    mongo: session({
        store: MongoStore.create({
            mongoUrl: `${MongoURI}?dbName=sesionMongo`,
            mongOptiones,
            ttl: 60,
            collectionName: 'sessions'
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })


}
export { sesiones };







