"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genarateToken = (res, uid) => {
    const token = jsonwebtoken_1.default.sign({ uid }, process.env.REFRESH_SECRET, { expiresIn: '1D' });
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict'
    });
};
exports.default = genarateToken;
