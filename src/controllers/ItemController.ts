import { Request, Response } from 'express'
import ItemService from '../services/ItemService'

export default class ItemController {
  private itemService: ItemService

  constructor() {
    this.itemService = new ItemService()
  }

  public async index(req: Request, res: Response) {
    try {
      const itemList = await this.itemService.index()

      return res.json(itemList)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
}
