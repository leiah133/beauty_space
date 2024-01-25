import {Knex} from 'knex';

export async function seed(knex : Knex) {
    await knex('items').insert([
        {title:'Cabelos' , image: 'cabelos.svg'},
        {title:'Unhas' , image: 'unhas.svg'},
        {title:'Sombrancelhas' , image: 'sombrancelhas.svg'},
        {title:'Maquiagem' , image: 'maquiagem.svg'},
        {title:'Depilação' , image: 'depilacao.svg'},
        {title:'Cílios' , image: 'cilios.svg'},
    ])
}