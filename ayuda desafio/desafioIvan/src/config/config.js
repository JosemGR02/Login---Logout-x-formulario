import dotenv from 'dotenv'
dotenv.config()

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
    }
}

export { config }