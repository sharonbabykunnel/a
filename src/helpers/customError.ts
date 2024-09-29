
class CustomError extends Error {
    statusCode: number;
    code:string | null;

    constructor(message: string, statusCode: number, code: string | null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default CustomError