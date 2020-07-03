import { Request, Response } from 'express'
import ItemService from '../services/ItemService'

class ItemController {
  public async index(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const itemList = await ItemService.index()

      return res.json(itemList)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
}

export default new ItemController()
