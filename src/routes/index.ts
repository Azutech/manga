import { Router } from 'express';
import users from './user';
import auth from './auth';

const routes = Router();

routes.use('/users', users);
routes.use('/users', auth);

export default routes;
