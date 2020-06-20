import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

// Área de configuração com servidor.
class App {

    public express: express.Application

    public constructor () {
        this.express = express()
        this.database()
        this.middlewares()
        this.routes()
    }

    private middlewares (): void {
        this.express.use(express.json())
        this.express.use(cors())
    }

    private database (): void {
        mongoose.connect('mongodb://localhost:27017/tsnode', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() =>{
            console.log('Banco de Dados: conectado com sucesso...')
        }).catch((error) =>{
            console.log(`Falha na conexão com base de dados. Erro: ${error}`)
        })

    }
     private routes (): void {
        this.express.use(routes)
     }
}

export default new App().express