import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import bcrypt, { hashSync } from "bcrypt";
import User from "../../models/users";
import codeGenerator from "../../utils/codeGenerator";
import { createToken } from "../../utils/token";
import UserType from "../../interfaces/usertype";
import AppError from "../../errors/errors";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET as string;

export const signup = async (req: Request, res: Response) => {
  const code = codeGenerator();

  const newUser: UserType = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: bcrypt.hashSync(req.body.password, 10),
    emailVerified: false,
    verificationCode: code,
  };

  const foundUser = await User.findOne(req.body.email).exec();

  if (foundUser) return res.status(404).json({ message: "User exists" });

  try {
    // const refreshtoken = createToken(
    //   { email: newUser.email },
    //   TOKEN_SECRET,
    //   "30s"
    // );

    // if (!newUser) {
    //     return res.status(404).json({ message: `cant create user` });
    // }
    // newUser.refreshtoken = refreshtoken;

    // const user = new User(newUser);

    // user.save();

    // res.cookie("jwt", refreshtoken, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24,
    // });

    res.status(202).json({
      success: true,
      message: "user has been created successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(404).json({ message: `cant create user ${err}` });
  }
};

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body;

  if (!email)
    return res.status(404).json({ message: "kindly fill in all your email" });

  const foundUser = await User.findOne({ email }).exec();

  if (foundUser)
    return res.status(404).json({ message: "user already exixts" });

  try {
    const user = await User.findByIdAndUpdate(
      { email },
      {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
      },

      { new: true, upsert: true }
    );

    user.password = hashSync(req.body.password, 10);

    const refreshtoken = createToken(
      { email: user.email },
      TOKEN_SECRET,
      "30s"
    );
    if (!user)
      return res.status(404).json({ message: "Unable to create User" });
    user.refreshtoken = refreshtoken;
    user.save();

    return res.status(202).json({
      success: true,
      message: "user has been created successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: `unable to create user ${err}` });
  }
};
