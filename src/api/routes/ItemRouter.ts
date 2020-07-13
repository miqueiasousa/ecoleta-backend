import { Router } from 'express'
import ItemController from '../controllers/ItemController'

const router = Router()

router.get('/items', ItemController.index)

export default router
