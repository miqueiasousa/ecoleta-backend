import Knex, { SchemaBuilder } from 'knex'

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('points', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('street').notNullable()
    table.decimal('number').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.string('image_url').notNullable()
  })
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('points')
}
