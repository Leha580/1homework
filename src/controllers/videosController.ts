import {Response, Request} from 'express'
import {db} from "../db/db";
import {OutputVideoType, postInputVideoType, putInputVideoType} from "../input-output-types/videoTypes";
import {postInputValidation, putInputValidation} from "../input-output-types/inputValidation";
import {OutputErrorsType} from "../input-output-types/outputErrorsType";
import {ParamType} from "../input-output-types/requestTypes";



export const videoController = {
    getVideosController: (req: Request, res: Response<OutputVideoType[]>) => {
        const videos = db.videos // получаем видео из базы данных

        res.status(200).json(videos) // отдаём видео в качестве ответа
    },

    findVideoController: (req: Request<ParamType>, res: Response<OutputVideoType | OutputErrorsType>)=> {
        const videoId = +req.params.id

        const notExistingId: OutputErrorsType = {
            errorsMessages: [{message: 'not existing id', field: 'id'}]
        };


        if(db.videos[db.videos.findIndex((el: OutputVideoType)=> {
            return el.id === videoId
        })]) {
            return res.status(200).json(db.videos[db.videos.findIndex((el: OutputVideoType)=> {
                return el.id == videoId
            })])
        } else {
            return res.status(404).json(notExistingId)
        }
    },

    createVideosController: (req: Request<any, any, postInputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
        //console.log('req.body:', req.body);
        const errors = postInputValidation(req.body)
        if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки

            return res.status(400).json(errors)
            // return res.status(400).json(errors)
        }

        const publicationDate = new Date();
        publicationDate.setDate(publicationDate.getDate() + 1)
        // если всё ок - добавляем видео
        const newVideo: OutputVideoType /*VideoDBType*/ = {
            ...req.body,
            id: Date.now() + Math.random(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: publicationDate.toISOString(),
        }
        db.videos = [...db.videos, newVideo]

        return res.status(201).json(newVideo)
    },

    updateVideoController: (req: Request<ParamType, any, putInputVideoType>, res: Response<OutputErrorsType>) => {
        //console.log('req.body:', req.body);
        const reqId = +req.params.id
        const notExistingId: OutputErrorsType = {
            errorsMessages: [{message: 'not existing id', field: 'id'}]
        };

        const videoId = db.videos.findIndex((el: OutputVideoType)=> {
            return el.id === reqId
        })

        if(!db.videos[videoId]) {
            return res.status(404).json(notExistingId)
        }
        const errors = putInputValidation(req.body)
        if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки

            return res.status(400).json(errors)
        }

        db.videos[videoId] = {
            ...db.videos[videoId],
            ...req.body
        }

        return res.status(204).json()
    },

    deleteVideoController: (req: Request<ParamType>, res: Response<void>)=> {
        const reqId = +req.params.id
        const videoId = db.videos.findIndex((el: OutputVideoType)=> {
            return el.id === reqId
        })
        if(db.videos[videoId]) {
            db.videos.splice(videoId, 1)


            return res.status(204).json()
        } else {
            return res.status(404).json()
        }
    },

}