import express,{ Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import './config/db'
import authRoute from './routes/auth.routes'
import taskRoute from './routes/tasks.routes'
import http from 'http';
import { Server } from "socket.io"
import path from 'path';

dotenv.config()
const app : Express = express();
const server = http.createServer(app);
const dirname = path.resolve()
const io = new Server(server,{
    pingTimeout:6000,
    cors:{
        origin: process.env.FRONTEND_URL
    }
})
io.on("connection",(socket)=>{
    console.log('connected to socket.io',socket.id)
    socket.on('setup',(userId)=>{
        socket.join(userId)
    });
    socket.on('disconnect',()=>{
        console.log('User disconnected')
    })
})

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
const  PORT  = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',taskRoute);
app.use('/auth',authRoute);
app.use(express.static(path.join(dirname, './../ToDo_List/','dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirname,'./../ToDo_List/','dist','index.html'))
})
server.listen(PORT,()=>{
    console.log('Server is running...')
});
export {io}