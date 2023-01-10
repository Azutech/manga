import mongoose from 'mongoose';
import logger from '../logger/customlogger';
import { ConnectionOptions } from 'tls';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI as string;
mongoose.set('debug', true);

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const database = async () => {
  await mongoose
    .connect(uri, connectionParams as ConnectionOptions)
    .then(() => {
      logger.info('Connected to Manga DB on localhost');
    })

    .catch((err) => {
      logger.error(`Error connecting to the database. n${err}`);
      process.exit(1);
    });
};

export default database;
