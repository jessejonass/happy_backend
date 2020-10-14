import { Request, Response } from 'express'
import * as Yup from 'yup' // validador de dados

// repositório para inserir tabelas
import { getRepository } from 'typeorm'

// models
import Orphanage from '../models/Orphanage'

// views
import orphanageView from '../views/orphanages_view'

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return response.status(200).json(orphanageView.renderMany(orphanages))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return response.status(200).json(orphanageView.render(orphanage))
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body
  
    const orphanagesRepository = getRepository(Orphanage)

    // forçar ao campo ser um array de arquivos - multer
    const requestImages = request.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    // validação de campos
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      
      // imagem é um array -> tem objeto -> tem string como path
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    // se econtrar campo válido, já retorn o erro | todos os erros
    await schema.validate(data, {
      abortEarly: false // todos os erros
    })
  
    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage)
  
    return response.status(201).json(orphanage) // 201 - criado
  }
}