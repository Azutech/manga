import { Router } from 'express';
import {
  authentication,
  signup,
  verificationEmail,
} from '../services/auth/users';
import { getAllUsers, getUser, destroyerUser } from '../services/users/users';

const users = Router();

users.post('/auth/registeration', signup);
users.post('/auth/authenticate', authentication);
users.get('/auth/getAllUser', getAllUsers);
users.get('/auth/getUser/:id', getUser);
users.get('/auth/confirm/:code', verificationEmail);
users.delete('/auth/destroyUser/:id', destroyerUser);

export default users;
