"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const hardcode_1 = require("./hardcode");
const videosRouter_1 = require("./routers/videosRouter");
const testingRouter_1 = require("./routers/testingRouter");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
express_1.default.urlencoded({ extended: true });
exports.app.get('/', (req, res) => {
    res.status(200).json({ version: '1.05' });
});
exports.app.use(hardcode_1.HARDCODE.PATH.VIDEOS, videosRouter_1.videosRouter);
exports.app.use(`${hardcode_1.HARDCODE.PATH.TESTING}/all-data`, testingRouter_1.testingRouter);
