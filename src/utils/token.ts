import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const secret = process.env.TOKEN_SECRET as string;

export const createToken = (data: any, secret: string, expiresIn: string) => {
  return jwt.sign(data, secret, { expiresIn: '1d' });
};
