import ItemRepo from '../database/repositories/ItemRepo'

class ItemService {
  public async index() {
    try {
      const itemList = await ItemRepo.findAll()

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new ItemService()
