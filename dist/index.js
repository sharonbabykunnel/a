"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const dirname = path_1.default.resolve();
const io = new socket_io_1.Server(server, {
    pingTimeout: 6000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
});
exports.io = io;
io.on("connection", (socket) => {
    console.log('connected to socket.io', socket.id);
    socket.on('setup', (userId) => {
        socket.join(userId);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', tasks_routes_1.default);
app.use('/auth', auth_routes_1.default);
app.use(express_1.default.static(path_1.default.join(dirname, './../ToDo_List/', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(dirname, './../ToDo_List/', 'dist', 'index.html'));
});
server.listen(PORT, () => {
    console.log('Server is running...');
});
//# sourceMappingURL=index.js.map