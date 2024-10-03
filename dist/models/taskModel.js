"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskScheema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    isOntime: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        ref: 'user'
    },
    completedOn: {
        type: String
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('task', taskScheema);
//# sourceMappingURL=taskModel.js.map