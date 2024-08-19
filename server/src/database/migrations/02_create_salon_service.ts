import {Knex} from 'knex'


export async function up(knex : Knex){
  return knex.schema.createTable('salon_service', table=> {
    table.increments('id').primary()


    table.integer('salon_id').notNullable().references('id').inTable('salon');
    table.integer('service_id').notNullable().references('id').inTable('service');
  })
}
export async function down(knex:Knex){
  return knex.schema.dropTable('salon_service')
}