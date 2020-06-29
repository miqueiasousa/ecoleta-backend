import ItemRepo from '../database/repositories/ItemRepo'

export default class ItemService {
  public static async index() {
    try {
      const itemList = await ItemRepo.findAll()

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
