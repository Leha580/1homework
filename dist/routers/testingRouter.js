"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.testingRouter = (0, express_1.Router)();
const deleteAllData = (req, res) => {
    db_1.db.videos = [];
    return res.status(204).json();
};
exports.testingRouter.delete('/', deleteAllData);
