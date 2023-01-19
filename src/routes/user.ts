import { Router } from 'express';

import { getAllUsers, getUser, destroyerUser } from '../services/users/users';

const users = Router();

users.get('/user/getAllUser', getAllUsers);
users.get('/user/getUser/:id', getUser);
users.post('/user/shippingAddress/:id');
users.delete('/user/destroyUser/:id', destroyerUser);

export default users;
