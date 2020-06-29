import { Request, Response } from 'express'
import ItemService from '../services/ItemService'

export default class ItemController {
  public static async index(req: Request, res: Response) {
    try {
      const itemList = await ItemService.index()

      return res.json(itemList)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
}
