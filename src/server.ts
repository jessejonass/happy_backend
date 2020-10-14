import express from 'express'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'

// inicialização do database
import './database/connection'

// inicialização do express
const app = express()

// importação de rotas
import routes from './routes'

// gerenciador de erros
import errorHandler from './errors/handler'

// use
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)
app.use(cors())

// iniciando o servidor
app.listen(3333)