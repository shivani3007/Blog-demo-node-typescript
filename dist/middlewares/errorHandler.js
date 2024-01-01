"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    try {
        let statusCode = err.statusCode || 500;
        let errMsg = '';
        if (err.details) {
            if (err.details.body) {
                errMsg = err.details.body[0].message;
            }
            else if (err.details.params) {
                errMsg = err.details.params[0].message;
            }
            else if (err.details.query) {
                errMsg = err.details.query[0].message;
            }
            else {
                errMsg = err.message;
            }
            res.status(statusCode).json({
                statusCode,
                message: err.message,
                err: errMsg
            });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.errorHandler = errorHandler;
