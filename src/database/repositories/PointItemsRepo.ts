import knex from '../../configs/knex'

export default class ItemRepository {
  public static async create(pointId: number, itemId: number) {
    try {
      const [id] = await knex('point_items').insert({
        point_id: pointId,
        item_id: itemId
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
