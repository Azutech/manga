import { Router } from 'express';
import users from './user';
import auth from './auth';
import { categor } from './products/cartegory';
import { products } from '../routes/products/products';

const routes = Router();

routes.use('/users', users);
routes.use('/users', auth);
routes.use('/products', categor);
routes.use('/products', products);

export default routes;
