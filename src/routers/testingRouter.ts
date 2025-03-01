import {Request, Response, Router} from "express";
import {db} from "../db/db";


export const testingRouter = Router()

const deleteAllData = (req: Request, res: Response<void>) => {
    db.videos = [];
    return res.status(204).json()
}

testingRouter.delete('/', deleteAllData)