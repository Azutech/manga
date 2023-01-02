import mongoose from 'mongoose'
import { ConnectionOptions } from 'tls'
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGO_URI as string
mongoose.set("debug", true)



const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const database = async () => {
    await mongoose
        .connect(uri, connectionParams as ConnectionOptions)
        .then(() => {
            console.log("Connected to Manga DB on localhost")
        })

        .catch((err) => {
            console.error(`Error connecting to the database. n${err}`);
          });
}

export default database