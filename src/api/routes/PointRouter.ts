import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import multer from 'multer'
import multerConfig from '../../configs/multer'
import PointController from '../controllers/PointController'

const router = Router()
const upload = multer(multerConfig)

router.get('/points', PointController.index)
router.get('/points/:id', PointController.show)
router.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    })
  }),
  PointController.store
)

export default router
