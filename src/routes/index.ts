import { Router } from 'express';
import users from './user';
import auth from './auth';
import { categor } from './products/cartegory';

const routes = Router();

routes.use('/users', users);
routes.use('/users', auth);
routes.use('products', categor);

export default routes;
