import knex from '../../configs/knex'

export default class ItemRepository {
  private table = knex('point_items')

  public async create(pointId: number, itemId: number) {
    try {
      const [id] = await this.table.insert({
        point_id: pointId,
        item_id: itemId
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
