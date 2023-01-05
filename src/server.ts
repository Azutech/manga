import express, { Application, Request, Response } from "express";
import logger from "../src/logger/customlogger";
import * as dotenv from "dotenv";
import database from "../src/connections/database";
import Router  from "../src/routes/user";

dotenv.config();

const server: Application = express();

const PORT: number | string = process.env.PORT || 3000;

database().catch((err) => console.error(err));


server.use('/api', Router)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to my app \n Check out our stocks" });
});

server.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist" });
});

server.listen(PORT, () => {
  return logger.info(`Express is listening at http://localhost:${PORT}`);
});

export default server;
