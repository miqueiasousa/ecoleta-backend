import { Router } from 'express'
import ItemController from '../controllers/ItemController'

const router = Router()

const itemController = new ItemController()

router.get('/items', itemController.index.bind(itemController))

export default router
