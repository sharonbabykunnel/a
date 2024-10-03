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
exports.getTaskStats = exports.updateTask = exports.deleteCompletedTask = exports.deleteTask = exports.editTask = exports.postTask = exports.getCompletedTasks = exports.getTasks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = __importDefault(require("../helpers/customError"));
const errorHadler_1 = __importDefault(require("../middlewares/errorHadler"));
const taskServices = __importStar(require("../services/task.services"));
const __1 = require("..");
exports.getTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield taskServices.getTasks(id);
        res.status(200).json({ success: true, data: response, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.getCompletedTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const response = yield taskServices.getCompletedTasks(id);
        res.status(200).json({ success: true, data: response, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.postTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const values = req.body;
        const response = yield taskServices.postTask(values);
        __1.io.to(values.user).emit('taskCreated', response);
        res.status(200).json({ success: true, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.editTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const values = req.body;
        const response = yield taskServices.editTask(values);
        __1.io.to(values.user).emit('taskEdited', response);
        res.status(200).json({ success: true, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield taskServices.deleteTask(id);
        const userId = response.user.toString();
        __1.io.to(userId).emit('taskDeleted', id);
        res.status(200).json({ success: true, data: response, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.deleteCompletedTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield taskServices.deleteCompletedTask(id);
        const userId = response.user.toString();
        __1.io.to(userId).emit('taskDeleted', id);
        res.status(200).json({ success: true, data: response, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.updateTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, completedOn } = req.body;
        const response = yield taskServices.updateTask(id, completedOn);
        const userId = response.user.toString();
        __1.io.to(userId).emit('taskUpdated', id);
        res.status(200).json({ success: true, data: response, message: 'Success' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default)
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        else
            (0, errorHadler_1.default)(res, 500, "An unexpected errro occured. Please try again later.");
    }
}));
exports.getTaskStats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const stats = yield taskServices.getTaskStatsService(userId);
        res.status(200).json({ success: true, data: stats });
    }
    catch (error) {
        console.log(error);
        if (error instanceof customError_1.default) {
            (0, errorHadler_1.default)(res, error.statusCode, error.message, error.code);
        }
        else {
            (0, errorHadler_1.default)(res, 500, "An unexpected error occurred. Please try again later.");
        }
    }
}));
//# sourceMappingURL=task.controller.js.map