import knex from '../../configs/knex'

export default class ItemRepository {
  private table = knex('items')

  public async findAll() {
    try {
      const itemList = await this.table.select('*')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
