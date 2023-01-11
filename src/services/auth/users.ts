import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import bcrypt, { hashSync } from 'bcrypt';
import User from '../../models/users';
import codeGenerator from '../../utils/codeGenerator';
import { createToken } from '../../utils/token';
import UserType from '../../interfaces/usertype';
import AppError from '../../errors/errors';
import { verificationMail } from '../mail/sendMails';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const signup = async function (req: Request, res: Response) {
  const code = codeGenerator();

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: hashSync(req.body.password, 10),
    emailVerified: false,
    verificationCode: code,
  });
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check) {
      res.status(404).json({ message: 'user already exists' });
    }

    const refreshtoken = createToken(
      { email: newUser.email },
      TOKEN_SECRET,
      '30s'
    );

    if (!newUser)
      return res.status(404).json({ message: 'Unable to create User' });
    newUser.refreshtoken = refreshtoken;

    await newUser.save();
    await verificationMail(
      newUser.firstName,
      newUser.email,
      newUser.verificationCode
    );
    return res.status(202).json({
      success: true,
      message: 'User has been created',
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: `User not created ${err}` });
  }
};

export const verificationEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.params;
  const user = await User.findOne({ verificationCode: code });
  console.log(user)
  if (!user)
    return next(new AppError(`This user ${user} can not be verified`, 404));

  try {
    user.emailVerified = true;
    await user.save();

    return res.status(202).json({
      message:
        'Email has been verified, Close this tab and Go to the Login page',
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
