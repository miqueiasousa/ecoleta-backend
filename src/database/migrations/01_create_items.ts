import Knex, { SchemaBuilder } from 'knex'

export function up(knex: Knex): SchemaBuilder {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('image_url').notNullable()
  })
}

export function down(knex: Knex): SchemaBuilder {
  return knex.schema.dropTable('items')
}
