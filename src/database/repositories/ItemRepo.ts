import knex from '../../configs/knex'
import { IItem } from '../../types/index'

class ItemRepo {
  public async findAll() {
    try {
      const itemList = await knex<IItem>('items')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findByPointId(pointId: number) {
    try {
      const itemList: IItem[] = await knex
        .select('items.*')
        .from('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', pointId)

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ItemRepo()
