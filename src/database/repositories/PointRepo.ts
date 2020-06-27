import knex from '../../configs/knex'

export default class ItemRepository {
  private table = knex('points')

  public async create({
    name,
    email,
    whatsapp,
    street,
    number,
    city,
    uf,
    image_url
  }: {
    name: string
    email: string
    whatsapp: string
    street: string
    number: number
    city: string
    uf: string
    image_url: string
  }) {
    try {
      const [id] = await this.table.insert({
        name,
        email,
        whatsapp,
        street,
        number,
        city,
        uf,
        image_url
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findOne(id: number) {
    try {
      const [point] = await this.table.where('id', id)

      return point
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
