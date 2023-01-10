import { Router } from "express";
import { signup } from "../services/auth/users";

const users = Router();

users.post("/auth/registeration", signup);


export default users;
