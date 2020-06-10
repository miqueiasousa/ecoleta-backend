import { Router } from 'express'
import multer from './config/multer'

import PointsController from './controller/PointsController'
import ItemsController from './controller/ItemsController'

const router = Router()

router.get('/items', ItemsController.index)

router.get('/points', PointsController.index)
router.get('/points/:id', PointsController.show)
router.post('/points', multer.single('image'), PointsController.create)

export default router
