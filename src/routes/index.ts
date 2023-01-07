import { Router } from "express";
import users from "./user";

const routes = Router();

routes.use("/user", users);

export default routes;
