import { Router } from 'express';
import users from './user';
import auth from './auth';

const routes = Router();

routes.use('/user', users);
routes.use('/user', auth);

export default routes;
