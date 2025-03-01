import {Router} from "express";
import {videoController} from "../controllers/videosController";


export const videosRouter = Router()

videosRouter.get('/', videoController.getVideosController)
videosRouter.get('/:id', videoController.findVideoController)
videosRouter.post('/', videoController.createVideosController)
videosRouter.put('/:id', videoController.updateVideoController)
videosRouter.delete('/:id', videoController.deleteVideoController)


