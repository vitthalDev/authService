import { Router, Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { getList } from "../controllers/user.controller";

const router = Router();


router.get('/list', async (req: Request, res: Response) => {
  try {
    const respose = await getList(req, res);
    console.log(respose)
    res.status(200).jsonp(respose)
  } catch (error: unknown) {
    handleError(res, error)
  }
})

export default router;