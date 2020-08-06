import Knex, { QueryBuilder } from 'knex'

export function seed(knex: Knex): QueryBuilder {
  return knex('items').insert([
    {
      title: 'Lâmpadas',
      image_url: 'http://localhost:3030/images/lampadas.svg'
    },
    {
      title: 'Pilhas e Baterias',
      image_url: 'http://localhost:3030/images/baterias.svg'
    },
    {
      title: 'Papéis e Papelão',
      image_url: 'http://localhost:3030/images/papeis-papelao.svg'
    },
    {
      title: 'Resíduos Eletrônicos',
      image_url: 'http://localhost:3030/images/eletronicos.svg'
    },
    {
      title: 'Resíduos Orgânicos',
      image_url: 'http://localhost:3030/images/organicos.svg'
    },
    {
      title: 'Óleo de Cozinha',
      image_url: 'http://localhost:3030/images/oleo.svg'
    }
  ])
}
