"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';
exports.PORT = process.env.PORT || 3000;
//# sourceMappingURL=env.js.map