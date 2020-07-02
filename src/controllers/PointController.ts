import { Request, Response } from 'express'
import PointService from '../services/PointService'

export default class PointController {
  public static async index(req: Request, res: Response) {
    try {
      const { uf, city } = req.query
      const pointList = await PointService.index(uf, city)

      return res.json(pointList)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  public static async show(req: Request, res: Response) {
    try {
      const { point, itemList } = await PointService.show(Number(req.params.id))

      return res.json({ ...point, items: itemList })
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        street,
        number,
        city,
        uf,
        items
      } = req.body
      const pointId = await PointService.store({
        name,
        email,
        whatsapp,
        street,
        number,
        city,
        uf,
        image: req.file.filename,
        items
      })

      return res.location(`/points/${pointId}`).end()
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
}
