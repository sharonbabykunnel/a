"use strict";
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
exports.getOverdueTasksCount = exports.getCompletedTasksCount = exports.getTasksCount = exports.updateTask = exports.deleteCompletedTask = exports.deleteTask = exports.editTask = exports.getCompletedTasks = exports.getTasks = exports.createTask = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const createTask = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield taskModel_1.default.create(values);
});
exports.createTask = createTask;
const getTasks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new mongoose_1.default.Types.ObjectId(id);
    return yield taskModel_1.default.find({ user, isCompleted: false }).sort({ createdAt: -1 });
});
exports.getTasks = getTasks;
const getCompletedTasks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new mongoose_1.default.Types.ObjectId(id);
    return yield taskModel_1.default.find({ user, isCompleted: true }).sort({ createdAt: -1 });
});
exports.getCompletedTasks = getCompletedTasks;
const editTask = (values) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.default.Types.ObjectId(values._id);
    return yield taskModel_1.default.findOneAndUpdate({ _id }, { $set: values }, { new: true });
});
exports.editTask = editTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.default.Types.ObjectId(id);
    return yield taskModel_1.default.findOneAndDelete({ _id });
});
exports.deleteTask = deleteTask;
const deleteCompletedTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.default.Types.ObjectId(id);
    return yield taskModel_1.default.findOneAndDelete({ _id, isCompleted: true });
});
exports.deleteCompletedTask = deleteCompletedTask;
const updateTask = (id, completedOn) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.default.Types.ObjectId(id);
    return yield taskModel_1.default.findOneAndUpdate({ _id }, { $set: { isCompleted: true, completedOn } }, { new: true });
});
exports.updateTask = updateTask;
const getTasksCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new mongoose_1.default.Types.ObjectId(userId);
    return yield taskModel_1.default.countDocuments({ user });
});
exports.getTasksCount = getTasksCount;
const getCompletedTasksCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new mongoose_1.default.Types.ObjectId(userId);
    return yield taskModel_1.default.countDocuments({ user, isCompleted: true });
});
exports.getCompletedTasksCount = getCompletedTasksCount;
const getOverdueTasksCount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new mongoose_1.default.Types.ObjectId(userId);
    const currentDateTime = new Date();
    return yield taskModel_1.default.countDocuments({
        user,
        isCompleted: false,
        time: { $lt: parseTimeStringToDate(currentDateTime.toTimeString().slice(0, 5)) }
    });
});
exports.getOverdueTasksCount = getOverdueTasksCount;
const parseTimeStringToDate = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};
//# sourceMappingURL=task.repository.js.map