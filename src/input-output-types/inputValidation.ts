import {postInputVideoType, putInputVideoType, Resolutions} from "./videoTypes";
import {OutputErrorsType} from "./outputErrorsType";
import moment from 'moment';


export const postInputValidation = (video: postInputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions)|| video.availableResolutions.find(p=> !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'availableResolution'
        })
    }
    if (typeof video.title !== 'string' /*|| video.title.trim().length === 0*/ || video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'title'
        })
    }
    if (typeof video.author !== 'string'/*|| video.author.trim().length === 0*/|| video.title.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'author'
        })
    }

    return errors
}

export const putInputValidation = (video: putInputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if (!Array.isArray(video.availableResolutions)|| video.availableResolutions.find(p=> !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'availableResolution'
        })
    }
    if (typeof video.title !== 'string'|| video.title.trim().length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'title'
        })
    }
    if (typeof video.author !== 'string'|| video.author.trim().length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'author'
        })
    }
    if (video.minAgeRestriction !== null && !Number.isFinite(video.minAgeRestriction) || video.minAgeRestriction! > 18 || video.minAgeRestriction !== null && video.minAgeRestriction < 1) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'minAgeRestriction'
        })
    }

    function isValidIso(str: string): boolean {
        return moment(str, moment.ISO_8601, true).isValid();
    }
    if (typeof video.publicationDate !== 'string' || !isValidIso(video.publicationDate)) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'publicationDate'
        })
    }

    return errors
}