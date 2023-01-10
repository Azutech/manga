import { Router } from 'express';
import { signup } from '../services/auth/users';
import { getAllUsers, getUser, destroyerUser } from '../services/users/users';

const users = Router();

users.post('/auth/registeration', signup);
users.get('/auth/getAllUser', getAllUsers);
users.get('/auth/getUser/:id', getUser);
users.delete('/auth/destroyUser/:id', destroyerUser);

export default users;
