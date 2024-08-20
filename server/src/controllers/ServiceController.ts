
import knex from '../database/connection'
import { Request, Response } from 'express';



class ServiceController{
  async index (req:Request, resp:Response){
    const service = await knex('service').select('*');
    const serializedService = service.map( services => {
      return {
        id: services.id,
        title: services.title,
        image_url: `http://localhost:3333/uploads/${services.image}`,
      };
    });
  
    return resp.json(serializedService);
  }
}
export default ServiceController;