import knex from '../../configs/knex'

export default class ItemRepository {
  public static async findAll() {
    try {
      const itemList = await knex('items').select('*')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public static async findByPoint(pointId: number) {
    try {
      const itemList = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', pointId)

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
