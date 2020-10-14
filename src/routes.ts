import { Router } from 'express'
const routes = Router()

// multer
import multer from 'multer'

// arquivo de config do multer
import uploadConfig from './config/upload'

// middleware
const upload = multer(uploadConfig)

// controllers
import OrphanagesController from './controllers/OrphanagesController'

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)

export default routes