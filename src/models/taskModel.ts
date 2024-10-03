import mongoose from 'mongoose'
import { TaskDocument } from '../types';

const taskScheema = new mongoose.Schema<TaskDocument>({
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    isOntime:{
        type:Boolean,
        default:false
    },
    user:{
        type:String,
        ref:'user'
    },
    completedOn:{
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model<TaskDocument>('task',taskScheema);