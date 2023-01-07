import { Router } from "express";
import { signup, register } from "../services/auth/users";

const users = Router();

users.post("/auth/register", signup);
users.post("/auth/signup", register);

export default users;
