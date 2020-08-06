import Knex, { QueryBuilder } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export function seed(knex: Knex): QueryBuilder {
  return knex('items').insert([
    {
      title: 'Lâmpadas',
      image_url: `${process.env.BASE_URL}/images/lampadas.svg`
    },
    {
      title: 'Pilhas e Baterias',
      image_url: `${process.env.BASE_URL}/images/baterias.svg`
    },
    {
      title: 'Papéis e Papelão',
      image_url: `${process.env.BASE_URL}/images/papeis-papelao.svg`
    },
    {
      title: 'Resíduos Eletrônicos',
      image_url: `${process.env.BASE_URL}/images/eletronicos.svg`
    },
    {
      title: 'Resíduos Orgânicos',
      image_url: `${process.env.BASE_URL}/images/organicos.svg`
    },
    {
      title: 'Óleo de Cozinha',
      image_url: `${process.env.BASE_URL}/images/oleo.svg`
    }
  ])
}
