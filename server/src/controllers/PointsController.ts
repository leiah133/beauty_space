import { Request, Response } from 'express'
import knex from '../database/connection'


class PointController {
    async index(req:Request, res:Response) {
      //cidade, uf,items
      const { city, uf, items } = req.query;

      const parsedItems =String(items).split(',').map(item => Number(item.trim()))

      console.log('Query Params:', { city, uf, items });
      
      const point = await knex('points')
      .join('point_items', 'points.id','=','point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

      return res.json(point)
    }
    async show(req:Request, res:Response) {
        const {id} =  req.params

        const point = await knex('points').where('id', id).first()
        if(!point){
            return res.status(400).json({message:'Point not found.'})
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        return res.json({point, items})

    }
    async create(req: Request, resp: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        const trx = await knex.transaction();
        const point ={
            image: 'https://images.unsplash.com/photo-1675034743339-0b0747047727?q=60&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        const insertIds = await trx('points').insert(point)
        const point_id = insertIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
        
        await trx('point_items').insert(pointItems)
        await trx.commit()


        return resp.json({ 
            id: point_id,
            ...point,
        })


    }
}


export default PointController