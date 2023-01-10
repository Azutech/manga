import jwt from 'jsonwebtoken';
import AppError from '../errors/errors';
import { Response, NextFunction } from 'express';
import { Request } from 'express-serve-static-core';
import dotenv from 'dotenv';

dotenv.config();

declare module 'express-serve-static-core' {
  export interface Request {
    user: any;
  }
}

export const secret = process.env.TOKEN_SECRET as string;

export const verifytoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split('')[1];
    }
    if (!token) {
      return next(new AppError('This token does not belong to you', 403));
    }

    const encryption = jwt.verify(token, secret);
    if (!encryption) {
      return next(new AppError('Invalid Token', 404));
    }
    req.user = encryption;

    // const currentUser = await User.findOne({encryption._id})
    // if(!currentUser) {

    // }

    next();
  } catch (err) {
    next(err);
  }
};
