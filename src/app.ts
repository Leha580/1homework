import express, {Request, Response, Router} from 'express'
import {HARDCODE} from "./hardcode";
import {videosRouter} from "./routers/videosRouter";
import {testingRouter} from "./routers/testingRouter";




export const app = express()
app.use(express.json())
express.urlencoded({ extended: true })


app.get('/', (req, res)=> {
    res.status(200).json({version: '1.05'})
})
app.use(HARDCODE.PATH.VIDEOS, videosRouter)
app.use(`${HARDCODE.PATH.TESTING}/all-data`, testingRouter)