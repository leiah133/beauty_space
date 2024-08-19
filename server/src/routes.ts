import express from  'express';
import knex from './database/connection';



const routes = express.Router();


routes.get('/service', async (req, resp) =>{
  const service = await knex('service').select('*');
  const serializedService = service.map( services => {
    return {
      id: services.id,
      title: services.title,
      image_url: `http://localhost:3333/uploads/${services.image}`,
    };
  });

  return resp.json(serializedService);
});

routes.post('/salon', async (req, resp) =>{
  const{
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

 const ids = await trx('salon').insert({
  image: 'image-fake',
  name,
  email,
  whatsapp,
  latitude,
  longitude,
  city,
  uf,
 });
 const salonServices = service.map((service_id: number) => {
  return {
  service_id,
  salon_id: ids[0]
  }
 })
 await trx('salon_service').insert(salonServices)
 
 return resp.json({message: 'salon created'});
})

export default routes;