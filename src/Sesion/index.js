
import session from 'express-session';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);
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







