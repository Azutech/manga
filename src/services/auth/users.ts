import User from "../../models/users";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import AppError from "../../errors/errors";
import codeGenerator from "../../utils/codeGenerator";
import { createToken } from "../../utils/token";
import UserType from "../../interfaces/usertype";
import dotenv from "dotenv";

dotenv.config();
const code = codeGenerator();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: bcrypt.hashSync(req.body.password, 10),
    emailVerified: false,
    verificationCode: code,
  });

  const foundUser = await User.findOne(req.body.email).exec();

  if (foundUser)
    return next(new AppError("Email already exist, Use Another!!", 404));

 try {
    const refreshtoken = createToken(
        { email: newUser.email },
        TOKEN_SECRET,
        "30s"
      );
    
      if (!newUser) {
        return next(new AppError("Unable to create user", 404));
      }
      newUser.refreshtoken = refreshtoken;
    
      newUser.save();
    
      res.cookie("jwt", refreshtoken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
 } catch (err) {
    return next(err)
 }
};
