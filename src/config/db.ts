import mongoose from "mongoose";
import { DB_URL } from "./env";

const connectWithRetry = async ()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to mongodb...')
    } catch (error) {
        console.log(error);
        setTimeout(connectWithRetry,5000)
    }
}

connectWithRetry()

export default mongoose;