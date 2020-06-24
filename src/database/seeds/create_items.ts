import Knex, { QueryBuilder } from 'knex'

export function seed(knex: Knex): QueryBuilder {
  return knex('items').insert([
    {
      title: 'Lâmpadas',
      image_url: 'http://localhost:3030/uploads/lampadas.svg'
    },
    {
      title: 'Pilhas e Baterias',
      image_url: 'http://localhost:3030/uploads/baterias.svg'
    },
    {
      title: 'Papéis e Papelão',
      image_url: 'http://localhost:3030/uploads/papeis-papelao.svg'
    },
    {
      title: 'Resíduos Eletrônicos',
      image_url: 'http://localhost:3030/uploads/eletronicos.svg'
    },
    {
      title: 'Resíduos Orgânicos',
      image_url: 'http://localhost:3030/uploads/organicos.svg'
    },
    {
      title: 'Óleo de Cozinha',
      image_url: 'http://localhost:3030/uploads/oleo.svg'
    }
  ])
}
