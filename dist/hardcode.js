"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARDCODE = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.HARDCODE = {
    PORT: process.env.PORT || 3000,
    PATH: {
        VIDEOS: '/hometask_01/api/videos',
        TESTING: '/hometask_01/api/testing'
    },
    HTTP_STATUSES: {
        OK_200: 200, // Запрос успешно выполнен
        Created_201: 201, // Запрос успешно выполнен, и был создан новый ресурс
        NoContent_204: 204, // Запрос успешно выполнен, но сервер не возвращает никакого содержимого
        MovedPermanently_301: 301, // Ресурс был навсегда перемещен на новый URL
        Found_302: 302, // Ресурс временно перемещен на другой URL (Moved Temporarily)
        NotModified_304: 304, // Ресурс не был изменен с момента последнего запроса
        BadRequest_400: 400, // Сервер не может обработать запрос из-за ошибки в синтаксисе запроса
        Unauthorized_401: 401, // Требуется аутентификация. Клиент должен предоставить учетные данные
        Forbidden_403: 403, // У клиента нет прав доступа к ресурсу
        NotFound_404: 404, // Ресурс не найден на сервере
        MethodNotAllowed_405: 405, // Метод, указанный в запросе, не поддерживается для данного ресурса
        Conflict_409: 409, // Запрос не может быть выполнен из-за конфликта с текущим состоянием ресурса
        Gone_410: 410, // Ресурс больше не доступен и не будет доступен в будущем
        UnprocessableEntity_422: 422, // Сервер понимает тип содержимого запроса, и синтаксис запроса верен, но сервер не смог обработать инструкции по обработке
        TooManyRequests_429: 429, // Клиент отправил слишком много запросов за определенный период времени
        InternalServerError_500: 500, // Сервер столкнулся с неожиданной ошибкой и не может выполнить запрос
        BadGateway_502: 502, // Сервер, выступая в роли шлюза или прокси, получил недействительный ответ от вышестоящего сервера
        ServiceUnavailable_503: 503, // Сервер временно не может обрабатывать запросы из-за перегрузки или технического обслуживания
        GatewayTimeout_504: 504, // Сервер, выступая в роли шлюза или прокси, не получил ответ от вышестоящего сервера в течение отведенного времени
    }
};
