"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putInputValidation = exports.postInputValidation = void 0;
const videoTypes_1 = require("./videoTypes");
const moment_1 = __importDefault(require("moment"));
const postInputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !videoTypes_1.Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'availableResolution'
        });
    }
    if (typeof video.title !== 'string' || video.title.trim().length === 0 || video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'title'
        });
    }
    if (typeof video.author !== 'string' || video.author.trim().length === 0 || video.author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'author'
        });
    }
    return errors;
};
exports.postInputValidation = postInputValidation;
const putInputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !videoTypes_1.Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'availableResolution'
        });
    }
    if (typeof video.title !== 'string' || video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'title'
        });
    }
    if (typeof video.author !== 'string' || video.author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'author'
        });
    }
    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'canBeDownloaded'
        });
    }
    if (video.minAgeRestriction !== null && !Number.isFinite(video.minAgeRestriction) || video.minAgeRestriction > 18 || video.minAgeRestriction !== null && video.minAgeRestriction < 1) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'minAgeRestriction'
        });
    }
    function isValidIso(str) {
        return (0, moment_1.default)(str, moment_1.default.ISO_8601, true).isValid();
    }
    if (typeof video.publicationDate !== 'string' || !isValidIso(video.publicationDate)) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'publicationDate'
        });
    }
    return errors;
};
exports.putInputValidation = putInputValidation;
