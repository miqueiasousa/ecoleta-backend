import PointRepo from '../database/repositories/PointRepo'
import ItemRepo from '../database/repositories/ItemRepo'
import PointItemsRepo from '../database/repositories/PointItemsRepo'

export default class ItemService {
  private pointRepository: PointRepo
  private itemRepository: ItemRepo
  private pointItemsRepository: PointItemsRepo

  constructor() {
    this.pointRepository = new PointRepo()
    this.itemRepository = new ItemRepo()
    this.pointItemsRepository = new PointItemsRepo()
  }

  public async show(id: number) {
    try {
      const point = await this.pointRepository.findOne(id)

      if (!point) {
        throw new Error('Point not found')
      }

      const itemList = await this.itemRepository.findByPoint(id)

      return { point, itemList }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async create({
    name,
    email,
    whatsapp,
    street,
    number,
    city,
    uf,
    image,
    items
  }: {
    name: string
    email: string
    whatsapp: string
    street: string
    number: number
    city: string
    uf: string
    image: string
    items: string
  }) {
    try {
      const image_url = `http://localhost:3030/uploads/${image}`
      const itemList = items.split(',').map((item) => Number(item.trim()))
      const pointId = await this.pointRepository.create({
        name,
        email,
        whatsapp,
        street,
        number,
        city,
        uf,
        image_url
      })

      if (pointId) {
        Promise.all(
          itemList.map(async (itemId) => {
            const a = await this.pointItemsRepository.create(pointId, itemId)
            console.log(a)
          })
        )
      }

      return pointId
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
