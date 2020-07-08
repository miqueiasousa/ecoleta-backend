import knex from '../../configs/knex'

class PointItemsRepository {
  public async create(pointId: number, itemId: number) {
    try {
      const [id]: number[] = await knex('point_items').insert({
        point_id: pointId,
        item_id: itemId
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointItemsRepository()
