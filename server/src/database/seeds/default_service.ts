import {Knex} from 'knex';


export async function seed(knex : Knex){
  await knex('service').insert([
    {title:'Cabelos', image:'cabelos.svg'},
    {title:'Cílios', image:'cilios.svg'},
    {title:'Depilação', image:'depilacao.svg'},
    {title:'Maquiagem', image:'maquiagem.svg'},
    {title:'Sombrancelhas', image:'sombrancelhas.svg'},
    {title:'Unhas', image:'unhas.svg'}
  ])
}