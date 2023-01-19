import { Router } from 'express';
import {
  authentication,
  signup,
  verificationEmail,
  logout,
} from '../services/auth/users';

const users = Router();

users.post('/auth/registeration', signup);
users.post('/auth/authenticate', authentication);
users.get('/auth/confirm/:code', verificationEmail);
users.get('/auth/logout', logout);

export default users;
