import PointRepo from '../database/repositories/PointRepo'
import ItemRepo from '../database/repositories/ItemRepo'
import PointItemsRepo from '../database/repositories/PointItemsRepo'

interface IData {
  name: string
  email: string
  whatsapp: string
  street: string
  number: number
  city: string
  uf: string
  image: string
  items: string
}

export default class ItemService {
  public static async index(uf, city) {
    try {
      const pointList = await PointRepo.findByUfAndCity(uf, city)
      const pointListWithItemList = await Promise.all(
        pointList.map(async (point) => {
          const itemList = await ItemRepo.findByPoint(point.id)

          return { ...point, items: itemList }
        })
      )

      return pointListWithItemList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public static async show(id: number) {
    try {
      const point = await PointRepo.findOne(id)

      if (!point) {
        throw new Error('Point not found')
      }

      const itemList = await ItemRepo.findByPoint(id)

      return { point, itemList }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public static async store({
    name,
    email,
    whatsapp,
    street,
    number,
    city,
    uf,
    image,
    items
  }: IData) {
    try {
      const image_url = `http://localhost:3030/uploads/${image}`
      const itemList = items.split(',').map((item) => Number(item.trim()))
      const pointId = await PointRepo.create({
        name,
        email,
        whatsapp,
        street,
        number,
        city,
        uf,
        image_url
      })

      if (!pointId) {
        throw new Error('Internal Server Error')
      }

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
