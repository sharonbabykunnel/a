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
exports.getTaskStatsService = exports.updateTask = exports.deleteCompletedTask = exports.deleteTask = exports.editTask = exports.postTask = exports.getCompletedTasks = exports.getTasks = void 0;
const customError_js_1 = __importDefault(require("../helpers/customError.js"));
const taskRepository = __importStar(require("../repository/task.repository"));
const getTasks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new customError_js_1.default("Internal Server Error", 500, '');
    const tasks = yield taskRepository.getTasks(id);
    return tasks;
});
exports.getTasks = getTasks;
const getCompletedTasks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new customError_js_1.default("Internal Server Error", 500, '');
    console.log(id);
    const tasks = yield taskRepository.getCompletedTasks(id);
    console.log(tasks);
    return tasks;
});
exports.getCompletedTasks = getCompletedTasks;
const postTask = (values) => __awaiter(void 0, void 0, void 0, function* () {
    if (!values)
        throw new customError_js_1.default("Internal Server Error", 500, '');
    const tasks = yield taskRepository.createTask(values);
    return tasks;
});
exports.postTask = postTask;
const editTask = (values) => __awaiter(void 0, void 0, void 0, function* () {
    if (!values)
        throw new customError_js_1.default("Internal Server Error", 500, '');
    const tasks = yield taskRepository.editTask(values);
    console.log(tasks);
    return tasks;
});
exports.editTask = editTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new customError_js_1.default("Invalid task ID", 400, 'INVALID_ID');
    const task = yield taskRepository.deleteTask(id);
    if (!task)
        throw new customError_js_1.default("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task);
    return task;
});
exports.deleteTask = deleteTask;
const deleteCompletedTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new customError_js_1.default("Invalid task ID", 400, 'INVALID_ID');
    const task = yield taskRepository.deleteCompletedTask(id);
    if (!task)
        throw new customError_js_1.default("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task);
    return task;
});
exports.deleteCompletedTask = deleteCompletedTask;
const updateTask = (id, completedOn) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new customError_js_1.default("Internal Server Error", 500, '');
    const task = yield taskRepository.updateTask(id, completedOn);
    if (!task)
        throw new customError_js_1.default("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task);
    return task;
});
exports.updateTask = updateTask;
const getTaskStatsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId)
        throw new customError_js_1.default("User ID is required", 400, 'INVALID_ID');
    const totalTasks = yield taskRepository.getTasksCount(userId);
    const completedTasks = yield taskRepository.getCompletedTasksCount(userId);
    const overdueTasks = yield taskRepository.getOverdueTasksCount(userId);
    return {
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate: ((completedTasks / totalTasks) * 100).toFixed(2),
    };
});
exports.getTaskStatsService = getTaskStatsService;
//# sourceMappingURL=task.services.js.map