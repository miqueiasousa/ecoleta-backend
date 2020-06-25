import knex from '../../configs/knex'

export default class ItemRepository {
  private table = knex('point_items')

  public async create(item_id: number, point_id: number) {
    try {
      const [id] = await this.table.insert({
        item_id,
        point_id
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
