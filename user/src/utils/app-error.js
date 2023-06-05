"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODES = exports.ValidationError = exports.NotFoundError = exports.BadRequestError = exports.APIError = exports.AppError = void 0;
const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
exports.STATUS_CODES = STATUS_CODES;
class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack, logingErrorResponse) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class APIError extends AppError {
    constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description = "Internal Server Error", isOperational = true, errorStack, logingErrorResponse) {
        super(name, statusCode, description, isOperational, errorStack, logingErrorResponse);
    }
}
exports.APIError = APIError;
class NotFoundError extends AppError {
    constructor(description = "Not Found", logingErrorResponse) {
        super("NOT FOUND", STATUS_CODES.NOT_FOUND, description, true, false, logingErrorResponse);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends AppError {
    constructor(description = "Bad request", logingErrorResponse) {
        super("BAD REQUEST", STATUS_CODES.BAD_REQUEST, description, true, false, logingErrorResponse);
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends AppError {
    constructor(description = "Validation Error", errorStack, logingErrorResponse) {
        super("BAD REQUEST", STATUS_CODES.BAD_REQUEST, description, true, errorStack, logingErrorResponse);
    }
}
exports.ValidationError = ValidationError;
