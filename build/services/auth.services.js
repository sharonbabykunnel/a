"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = signin;
exports.signup = signup;
const customError_1 = __importDefault(require("../helpers/customError"));
const authR = __importStar(require("./../repository/auth.repository"));
function signin(credential, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!credential || !password)
            throw new customError_1.default('Credential and Password are required', 400, 'VALIDATION_ERROR');
        const isNumeric = !isNaN(Number(credential)) && !isNaN(parseFloat(credential));
        const parseCredential = isNumeric ? Number(credential) : credential;
        let user;
        if (typeof parseCredential === 'number') {
            user = yield authR.findByNumber(parseCredential);
        }
        else {
            user = yield authR.findByEmail(parseCredential);
        }
        if (!user)
            throw new customError_1.default('User not found', 404, 'USER_NOT_FOUND');
        const verify = yield authR.verifyPassword(password, user.password);
        if (!verify)
            throw new customError_1.default('Incorrect password', 401, 'INCORRECT_PASSWORD');
        return user;
    });
}
function signup(values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!values.email || !values.password || !values.name || !values.number)
            throw new customError_1.default("Email, Number, Name, and Password are required", 400, 'VALIDATION_ERROR');
        const existingUser = yield authR.findByEmail(values.email);
        if (existingUser)
            throw new customError_1.default("User already exists", 400, 'USER_ALREADY_EXISTS');
        const existingNumber = yield authR.findByNumber(values.number);
        if (existingNumber)
            throw new customError_1.default("Number already exists. Login using the number.", 400, 'USER_ALREADY_EXISTS');
        const response = yield authR.createUser(values);
        console.log(response, 'response');
        return response;
    });
}
