import knex from '../database/connection'

export default class ItemRepository {
  private knex = knex('items')

  public async findAll() {
    try {
      const itemList = await this.knex.select('*')

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
