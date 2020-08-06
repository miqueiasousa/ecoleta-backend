import knex from '../../configs/knex'

class PointItemsRepository {
  public async create(data: { pointId: number; itemId: number }) {
    try {
      const [id]: number[] = await knex('point_items').insert({
        point_id: data.pointId,
        item_id: data.itemId
      })

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointItemsRepository()
