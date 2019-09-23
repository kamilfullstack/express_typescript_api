"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const respond_1 = require("../helpers/respond");
class Errors {
    static notFound(req, res, next) {
        const err = new Error('404 page not found');
        err.status = 400;
        next(err);
    }
    static catchAsync(fn) {
        return (req, res, next) => {
            fn(req, res, next).catch((err) => next(err));
        };
    }
    static catchErrors(err, req, res, next) {
        const respondData = {
            status: err.status || 500,
            serverStatus: false,
            message: 'Błąd funkcji asynchronicznej servera',
            dataRequest: req.body,
            dataRespond: req.body,
            err: err.message,
            extraInfo: 'Coś nie poszło po naszej myśli',
            extraInfoTitle: 'Błąd backendu'
        };
        return new respond_1.Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
    }
}
exports.Errors = Errors;
