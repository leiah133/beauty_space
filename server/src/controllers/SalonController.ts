import knex from '../database/connection'
import { Request, Response } from 'express';

class SalonController {
  async index(req: Request, resp: Response){
    const {city, uf, service}= req.query

    const parsedService = String(service)
    .split(',')
    .map(service => Number(service.trim()))

    const salon = await knex('salon')
      .join('salon_service', 'salon.id', '=', 'salon_service.salon_id')
      .whereIn('salon_service.service_id', parsedService)
      .where( 'city', String(city))
      .where( 'uf', String(uf))
      .distinct()
      .select('salon.*')

    return resp.json(salon)
  }
  
  async show(req: Request, resp: Response) {
    const { id } = req.params
    
    const salon = await knex('salon').where('id', id).first();

    if (!salon) {
      return resp.status(400).json({ message: 'Salao nao encontrado' })
    }
    const service = await knex('service')
    .join('salon_service', 'service.id',  '=', 'salon_service.service_id')
    .where( 'salon_service.salon_id', id)
    .select('service.title')
    return resp.json({salon, service})
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
      service
    } = req.body

    const trx = await knex.transaction();
    const salons = {
      image: 'https://img.freepik.com/fotos-gratis/salao-de-beleza-com-equipamentos-de-cosmetologia-em-estilo-anime_23-2151500961.jpg?t=st=1724191601~exp=1724195201~hmac=574f91101ffe4b553d91c8c7c9c267e77368408568f652b5e989657667c1a6af&w=400',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedIds = await trx('salon').insert(salons);
    const salon_id = insertedIds[0];

    const salonServices = service.map((service_id: number) => {
      return {
        service_id,
        salon_id
      }
    })
    await trx('salon_service').insert(salonServices)
    await trx.commit()
    return resp.json({
      id: salon_id,
      ...salons,
    });
  }
}
export default SalonController;