import ItemRepo from '../database/repositories/ItemRepo'

export default class ItemService {
  private itemRepository: ItemRepo

  constructor() {
    this.itemRepository = new ItemRepo()
  }

  public async index() {
    try {
      const itemList = await this.itemRepository.findAll()

      return itemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
