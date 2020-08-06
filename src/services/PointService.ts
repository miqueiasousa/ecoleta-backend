import PointRepo from '../database/repositories/PointRepo'
import ItemRepo from '../database/repositories/ItemRepo'
import PointItemsRepo from '../database/repositories/PointItemsRepo'

class PointService {
  public async index(data: { uf: string; city: string }) {
    try {
      const pointList = await PointRepo.findByUfAndCity({ ...data })
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

  public async store({
    name,
    street,
    number,
    uf,
    city,
    image,
    items
  }: {
    name: string
    street: string
    number: number
    uf: string
    city: string
    image: string
    items: string
  }) {
    try {
      const pointId = await PointRepo.create({
        name,
        street,
        number,
        uf,
        city,
        image_url: `${process.env.BASE_URL}/uploads/${image}`
      })

      if (!pointId) {
        throw new Error('Internal Server Error')
      }

      const itemList = items.split(',').map((item) => Number(item.trim()))

      await Promise.all(
        itemList.map(async (itemId) => {
          await PointItemsRepo.create({ pointId, itemId })
        })
      )

      return pointId
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointService()
