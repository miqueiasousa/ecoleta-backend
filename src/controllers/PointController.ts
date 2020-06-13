import { Request, Response } from 'express'
import knex from '../database/connection'

class PointController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query
    const parseItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()))

    const pointList = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parseItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')

    const serializedPointList = pointList.map((point) => ({
      id: point.id,
      image_url: `http://localhost:3030/uploads/${point.image}`,
      email: point.email,
      whatsapp: point.whatsapp,
      latitude: point.latitude,
      longitude: point.longitude,
      city: point.city,
      uf: point.uf
    }))

    return res.json(serializedPointList)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()

    if (!point) return res.status(400).json({ message: 'Point not found!' })

    const serializedPoint = {
      id: point.id,
      image_url: `http://localhost:3030/uploads/${point.image}`,
      email: point.email,
      whatsapp: point.whatsapp,
      latitude: point.latitude,
      longitude: point.longitude,
      city: point.city,
      uf: point.uf
    }

    const itemList = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)

    return res.json({ point: serializedPoint, items: itemList })
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

    const [pointId] = await trx('points').insert({
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    })

    await trx('point_items').insert(
      items
        .split(',')
        .map((item: string) => parseInt(item.trim()))
        .map((itemId: number) => ({
          item_id: itemId,
          point_id: pointId
        }))
    )

    await trx.commit()

    return res.json({ status: 200 })
  }
}

export default new PointController()
