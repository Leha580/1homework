"use strict";
/*
export type h01video = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: null
    createdAt: string
    publicationDate: string
    availableResolutions: string
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
const videoTypes_1 = require("../input-output-types/videoTypes");
exports.db = {
    videos: [
        {
            id: 0,
            title: 'book1234116',
            author: 'author1',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2025-02-25T04:52:53.087Z',
            publicationDate: '2025-02-26T04:52:53.087Z',
            availableResolutions: [videoTypes_1.Resolutions.P144]
        },
        {
            id: 1,
            title: 'book2',
            author: 'author2',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2025-02-27T04:52:53.087Z',
            publicationDate: '2025-02-28T04:52:53.087Z',
            availableResolutions: [videoTypes_1.Resolutions.P240]
        },
        {
            id: 2,
            title: 'book33345',
            author: 'author3',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2025-02-15T04:52:53.087Z',
            publicationDate: '2025-02-16T04:52:53.087Z',
            availableResolutions: [videoTypes_1.Resolutions.P360]
        }
    ]
};
// функция для быстрой очистки/заполнения базы данных для тестов
const setDB = (dataset) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        exports.db.videos = [];
        // db.some = []
        return;
    }
    // если что-то передано - то заменяем старые значения новыми
    exports.db.videos = dataset.videos || exports.db.videos;
    // db.some = dataset.some || db.some
};
exports.setDB = setDB;
