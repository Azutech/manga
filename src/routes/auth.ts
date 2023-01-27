import { Router } from 'express';
import {
  authentication,
  signup,
  verificationEmail,
  logout,
  forgotPassword,
} from '../services/auth/users';

const users = Router();

users.post('/auth/registeration', signup);
users.post('/auth/authenticate', authentication);
users.post('/auth/forgotpass', forgotPassword);
users.get('/auth/confirm/:code', verificationEmail);
users.get('/auth/logout', logout);

export default users;
