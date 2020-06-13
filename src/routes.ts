import { Router } from 'express'
import multer from './utils/multer'
import { celebrate, Joi } from 'celebrate'

import PointController from './controllers/PointController'
import ItemController from './controllers/ItemController'

const router = Router()

router.get('/items', ItemController.index)

router.get('/points', PointController.index)
router.get('/points/:id', PointController.show)
router.post(
  '/points',
  multer.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }),
  PointController.create
)

export default router
