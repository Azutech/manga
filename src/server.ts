import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import logger from "../src/logger/customlogger";
import database from "../src/connections/database";
import routes from "./routes/index";
// import passport from 'passport' 

dotenv.config();

const server: Application = express();

const PORT: number | string = process.env.PORT || 3000;

database().catch((err) => console.error(err));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));


//passport
// server.use(passport.initialize())
// server.use(passport.session())


server.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to my app \n Check out our stocks" });
  console.log("welcome");
});

server.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist" });
});

server.use("/api", routes);

server.listen(PORT, () => {
  return logger.info(`Express is listening at http://localhost:${PORT}`);
});

export default server;
