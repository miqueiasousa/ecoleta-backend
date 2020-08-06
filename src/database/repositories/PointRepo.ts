import knex from '../../configs/knex'
import { IPoint, IPointDTO } from '../../interfaces/IPoint'

class PointRepo {
  public async create(data: IPointDTO) {
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

  public async findByUfAndCity(data: { uf: string; city: string }) {
    try {
      const pointList = await knex<IPoint>('points')
        .where('uf', data.uf)
        .andWhere('city', data.city)

      return pointList
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default new PointRepo()
