import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemController {
  async index(req: Request, res: Response) {
    const itemList = await knex('items').select('*')

    const serializedItemList = itemList.map((item) => ({
      id: item.id,
      image_url: `http://localhost:3030/uploads/${item.image}`,
      title: item.title
    }))

    return res.json(serializedItemList)
  }
}

export default new ItemController()
