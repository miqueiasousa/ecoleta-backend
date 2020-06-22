import ItemRepo from '../repositories/ItemRepo'

export default class ItemService {
  private itemRepository: ItemRepo

  constructor() {
    this.itemRepository = new ItemRepo()
  }

  public async index() {
    try {
      const itemList = await this.itemRepository.findAll()

      const serializedItemList = itemList.map((item) => ({
        id: item.id,
        image_url: `http://localhost:3030/uploads/${item.image}`,
        title: item.title
      }))

      return serializedItemList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
