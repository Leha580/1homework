"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = void 0;
const db_1 = require("../db/db");
const inputValidation_1 = require("../input-output-types/inputValidation");
exports.videoController = {
    getVideosController: (req, res) => {
        const videos = db_1.db.videos; // получаем видео из базы данных
        res.status(200).json(videos); // отдаём видео в качестве ответа
    },
    findVideoController: (req, res) => {
        const videoId = +req.params.id;
        const notExistingId = {
            errorsMessages: [{ message: 'not existing id', field: 'id' }]
        };
        if (db_1.db.videos[db_1.db.videos.findIndex((el) => {
            return el.id === videoId;
        })]) {
            return res.status(200).json(db_1.db.videos[db_1.db.videos.findIndex((el) => {
                return el.id == videoId;
            })]);
        }
        else {
            return res.status(404).json(notExistingId);
        }
    },
    createVideosController: (req, res) => {
        //console.log('req.body:', req.body);
        const errors = (0, inputValidation_1.postInputValidation)(req.body);
        if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
            return res.status(400).json(errors);
            // return res.status(400).json(errors)
        }
        const publicationDate = new Date();
        publicationDate.setDate(publicationDate.getDate() + 1);
        // если всё ок - добавляем видео
        const newVideo /*VideoDBType*/ = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date().toISOString(), publicationDate: publicationDate.toISOString() });
        db_1.db.videos = [...db_1.db.videos, newVideo];
        return res.status(201).json(newVideo);
    },
    updateVideoController: (req, res) => {
        //console.log('req.body:', req.body);
        const reqId = +req.params.id;
        const notExistingId = {
            errorsMessages: [{ message: 'not existing id', field: 'id' }]
        };
        const videoId = db_1.db.videos.findIndex((el) => {
            return el.id === reqId;
        });
        if (!db_1.db.videos[videoId]) {
            return res.status(404).json(notExistingId);
        }
        const errors = (0, inputValidation_1.putInputValidation)(req.body);
        if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
            return res.status(400).json(errors);
        }
        db_1.db.videos[videoId] = Object.assign(Object.assign({}, db_1.db.videos[videoId]), req.body);
        return res.status(204).json();
    },
    deleteVideoController: (req, res) => {
        const reqId = +req.params.id;
        const videoId = db_1.db.videos.findIndex((el) => {
            return el.id === reqId;
        });
        if (db_1.db.videos[videoId]) {
            db_1.db.videos.splice(videoId, 1);
            return res.status(204).json();
        }
        else {
            return res.status(404).json();
        }
    },
};
