"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const videosController_1 = require("../controllers/videosController");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', videosController_1.videoController.getVideosController);
exports.videosRouter.get('/:id', videosController_1.videoController.findVideoController);
exports.videosRouter.post('/', videosController_1.videoController.createVideosController);
exports.videosRouter.put('/:id', videosController_1.videoController.updateVideoController);
exports.videosRouter.delete('/:id', videosController_1.videoController.deleteVideoController);
