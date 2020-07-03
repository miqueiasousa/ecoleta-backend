import knex from '../../configs/knex'
import { IItem } from '../../types/index'

class ItemRepo {
  public async findAll(): Promise<IItem[]> {
    try {
      const itemList: IItem[] = await knex<IItem>('items')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findByPoint(pointId: number): Promise<IItem[]> {
    try {
      const itemList: IItem[] = await knex<IItem>('items')
        .select('items.*')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', pointId)

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ItemRepo()
