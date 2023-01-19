import { Router } from 'express';

import { getAllUsers, getUser, destroyerUser, personalInfo } from '../services/users/users';

const users = Router();

users.get('/user/getAllUser', getAllUsers);
users.get('/user/getUser/:id', getUser);
users.post('/user/shippingAddress/:id', personalInfo);
users.delete('/user/destroyUser/:id', destroyerUser);

export default users;
