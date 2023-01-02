import express, { Application, Request, Response } from "express";
import logger from "../src/logger/customlogger";
import * as dotenv from "dotenv";
import database from "../src/connections/database";

dotenv.config();

const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;

database().catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to my app \n Check out our stocks" });
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(PORT, () => {
  return logger.info(`Express is listening at http://localhost:${PORT}`);
});

export default app;
