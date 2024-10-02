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
exports.logout = exports.signin = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authS = __importStar(require("./../services/auth.services"));
const customError_1 = __importDefault(require("../helpers/customError"));
const genarateToken_1 = __importDefault(require("../utils/genarateToken"));
const accessToken_1 = __importDefault(require("./../utils/accessToken"));
const errorHadler_1 = __importDefault(require("../middlewares/errorHadler"));
exports.signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const values = req.body;
        const response = yield authS.signup(values);
        if (!response._id) {
            throw new customError_1.default('Internal server error', 500, 'INTERNAL_ERROR');
        }
        (0, genarateToken_1.default)(res, response._id);
        const accessToken = (0, accessToken_1.default)(response._id);
        res
            .status(201)
            .json({
            success: true,
            data: response,
            message: "Account created successfully.",
            accessToken,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected error occured. Please try again later.");
    }
}));
exports.signin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential, password } = req.body;
        const response = yield authS.signin(credential, password);
        console.log("response", response);
        if (!response._id) {
            throw new customError_1.default('Internal server error', 500, 'INTERNAL_ERROR');
        }
        (0, genarateToken_1.default)(res, response._id);
        const accessToken = (0, accessToken_1.default)(response._id);
        console.log(accessToken, "asdf");
        res
            .status(200)
            .json({
            success: true,
            data: response,
            message: "Loggined",
            accessToken,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out", success: true });
}));
