import knex from '../../configs/knex'

export default class ItemRepository {
  private table = knex('items')

  public async findByPoint(pointId: number) {
    try {
      const itemList = await this.table
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', pointId)

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findAll() {
    try {
      const itemList = await this.table.select('*')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
