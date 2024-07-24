import express, { Express, Request, Response } from "express";
// import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config()

import Mongo from "./utils/mongoclient";
import userRoutes from './routes/user.route'

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000 as number;
const mongoClient = new Mongo(process.env.MONGO_URI as string);


app.listen(PORT, () => {
  console.log("Listening on port ", PORT)
})