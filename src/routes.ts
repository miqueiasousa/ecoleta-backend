import { Router } from 'express'
import multer from './config/multer'
import { celebrate, Joi } from 'celebrate'

import PointsController from './controller/PointsController'
import ItemsController from './controller/ItemsController'

const router = Router()

router.get('/items', ItemsController.index)

router.get('/points', PointsController.index)
router.get('/points/:id', PointsController.show)
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
  PointsController.create
)

export default router
