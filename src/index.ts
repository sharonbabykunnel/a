import express,{ Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app : Express = express();

const  PORT  = process.env.PORT || 5000;
app.use(cors())
app.get('/',(req: Request, res: Response)=>{
    res.send('hi user');
});

app.listen(PORT,()=>{
    console.log('Server is running...')
})