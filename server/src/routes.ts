import express from  'express';

import SalonController from './controllers/SalonController';
import ServiceController from './controllers/ServiceController';



const routes = express.Router();
const salonController = new SalonController()
const serviceController = new ServiceController()


routes.get('/service', serviceController.index);


routes.post('/salon', salonController.create)
routes.get('/salon', salonController.index)
routes.get('/salon/:id', salonController.show)

export default routes;