import express, { Express, Request, Response } from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

import Mongo from "./utils/mongoclient";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000 as number;
const mongoClient = new Mongo(process.env.MONGO_URI as string);


app.get("/", async (req: Request, res: Response) => {
  // res.send("ALL Ok with TS and tsc watch")

  try {
    await mongoClient.connect();

    if (mongoClient.isConnected()) {
      const db = mongoClient.getDb();
      if (!db) {
        throw new Error('Database connection not established');
      }
      const collection = db.collection('users');
      const result = await collection.find({}).toArray();
      console.log(result);
      res.json(result);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await mongoClient.disconnect();
  }
})

app.listen(PORT, () => {
  console.log("Listening on port ", PORT)
})