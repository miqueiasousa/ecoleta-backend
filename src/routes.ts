import { Router } from 'express'

import PointsController from './controller/PointsController'
import ItemsController from './controller/ItemsController'

const router = Router()

router.get('/items', ItemsController.index)

router.get('/points', PointsController.index)
router.get('/points/:id', PointsController.show)
router.post('/points', PointsController.create)

export default router
