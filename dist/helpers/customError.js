"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        if (code)
            this.code = code;
    }
}
exports.default = CustomError;
//# sourceMappingURL=customError.js.map