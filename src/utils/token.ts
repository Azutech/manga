import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const secret = process.env.TOKEN_SECRET as string;

export const createToken = (id: number) => {
  return jwt.sign({ id }, secret, { expiresIn: "7days" });
};
