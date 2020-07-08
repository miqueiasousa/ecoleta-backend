import knex from '../../configs/knex'
import { IPoint, IPointRepoCreateDTO } from '../../types/index'

class PointRepo {
  public async create(data: IPointRepoCreateDTO) {
    try {
      const [id]: number[] = await knex('points').insert(data)

      return id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findById(id: number) {
    try {
      const [point] = await knex<IPoint>('points').where('id', id)

      return point
    } catch (error) {
      throw new Error(error.message)
    }
  }

  public async findByUfAndCity(uf: string, city: string) {
    try {
      const pointList = await knex<IPoint>('points')
        .where('uf', uf)
        .andWhere('city', city)

      return pointList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointRepo()
