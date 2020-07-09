import PointRepo from '../database/repositories/PointRepo'
import ItemRepo from '../database/repositories/ItemRepo'
import PointItemsRepo from '../database/repositories/PointItemsRepo'
import { IPointServiceStoreDTO, IPointServiceIndexDTO } from '../types/index'

class PointService {
  public async index({ uf, city }: IPointServiceIndexDTO) {
    try {
      const pointList = await PointRepo.findByUfAndCity(uf, city)
      const serializedPointList = await Promise.all(
        pointList.map(async (point) => {
          const itemList = await ItemRepo.findByPointId(point.id)

          return { ...point, items: itemList }
        })
      )

      return serializedPointList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async show(id: number) {
    try {
      const point = await PointRepo.findById(id)

      if (!point) {
        throw new Error('Point not found')
      }

      const itemList = await ItemRepo.findByPointId(id)

      return { ...point, items: itemList }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async store(data: IPointServiceStoreDTO) {
    try {
      const pointId = await PointRepo.create({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        street: data.street,
        number: data.number,
        city: data.city,
        uf: data.uf,
        image_url: `http://localhost:3030/uploads/${data.image}`
      })

      if (!pointId) {
        throw new Error('Internal Server Error')
      }

      const itemList = data.items.split(',').map((item) => Number(item.trim()))

      await Promise.all(
        itemList.map(async (itemId) => {
          await PointItemsRepo.create(pointId, itemId)
        })
      )

      return pointId
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointService()
