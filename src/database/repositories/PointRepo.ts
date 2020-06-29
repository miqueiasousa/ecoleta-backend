import knex from '../../configs/knex'

interface IPoint {
  name: string
  email: string
  whatsapp: string
  street: string
  number: number
  city: string
  uf: string
  image_url: string
}

export default class ItemRepository {
  public static async create(data: IPoint) {
    try {
      const [id] = await knex('points').insert(data)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public static async findOne(id: number) {
    try {
      const point = await knex('points').where('id', id).first()

      return point
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
