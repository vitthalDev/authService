import { Response } from "express";
import { error } from "./commonInterfaces";

export const handleError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    console.error(error)
    const response: error = {
      status: 500,
      response: error,
      msg: error.message
    }
    res.status(500).jsonp(response)
  } else {
    res.status(500).json({ error: "Unknown error occurred" });
  }
};