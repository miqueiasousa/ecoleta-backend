import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import multer from '../utils/multer'
import PointController from '../controllers/PointController'

const router = Router()

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
      street: Joi.string().required(),
      number: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }),
  PointController.create
)

export default router
