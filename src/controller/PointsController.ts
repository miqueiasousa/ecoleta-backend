import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query
    const parseItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parseItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    return res.json(points)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()

    if (!point) return res.status(400).json({ message: 'error' })

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)

    return res.json({ point, items })
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body

    const trx = await knex.transaction()

    const [point_id] = await trx('points').insert({
      image: 'fake-img',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    await trx('point_items').insert(
      items.map((item_id: number) => ({
        item_id,
        point_id
      }))
    )

    await trx.commit()

    return res.json({ status: 200 })
  }
}

export default new PointsController()