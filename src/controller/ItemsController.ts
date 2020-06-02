import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*')

    const serializedItems = items.map((item) => ({
      id: item.id,
      image_url: `http://localhost:3030/uploads/${item.image}`,
      title: item.title
    }))

    return res.json(serializedItems)
  }
}

export default new ItemsController()
