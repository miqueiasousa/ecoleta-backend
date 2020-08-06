import { Request, Response } from 'express'
import PointService from '../../services/PointService'

class PointController {
  public async index(req: Request, res: Response) {
    try {
      const pointList = await PointService.index({
        uf: String(req.query.uf),
        city: String(req.query.city)
      })

      return res.json(pointList)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const point = await PointService.show(Number(req.params.id))

      return res.json(point)
    } catch (error) {
      return res.json({ message: error.message })
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const pointId = await PointService.store({
        ...req.body,
        image: req.file.filename
      })

      return res.location(`/points/${pointId}`).end()
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
}

export default new PointController()
