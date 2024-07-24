import { Request, response, Response } from "express";
import { User, UserData } from "../models/user";
import { success, failure } from "../utils/commonInterfaces";
import Mongo from "../utils/mongoclient";
import { handleError } from "../utils/errorHandler";
import { Collection, ListDatabasesResult, ModifyResult } from "mongodb";

const mongoClient = new Mongo(process.env.MONGO_URI as string);

// Example route handler using the imported router
export const getList = async (req: Request, res: Response) => {
  try {

    //sanity checks
    if(req.body && (!req.body.skip || !req.body.limit)){
      const response: failure = {
        status: 404,
        response: [],
        msg: "skip or limit invalid"
      }
      return response
    }

    await mongoClient.connect()
    if (mongoClient.isConnected()) {
      const db = mongoClient.getDb()
      if (!db) {
        throw new Error('Database connection not established');
      } else {
        const collection: Collection = db.collection('users');
        const skip: number = parseInt(req.body.skip)
        const limit: number = parseInt(req.body.limit)
        const result: Array<unknown> = await collection.find({}).skip(skip).limit(limit).toArray();
        if (result && result.length > 0) {
          // console.log(result[0]);
          const response: success = {
            status: 200,
            response: result,
            msg: "Success"
          }
          return response
        } else {
          const response: failure = {
            status: 404,
            response: [],
            msg: "No data"
          }
          return response
        }

      }
    }
  } catch (error) {
    // Handle errors as needed
    console.error('Error in getList controller:', error);
    handleError(res, error)
  } finally {
    await mongoClient.disconnect()
  }
};


// Export other controllers as needed
