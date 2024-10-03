import mongoose, { mongo } from 'mongoose';
import TaskModel from '../models/taskModel'
import { Task } from '../types';

export const createTask = async(values:Task)=>{
    return await TaskModel.create(values)
}

export const getTasks = async (id:string)=>{
    const user = new mongoose.Types.ObjectId(id);
    return await TaskModel.find({user, isCompleted:false}).sort({createdAt:-1});
}

export const getCompletedTasks = async (id:string)=>{
    const user = new mongoose.Types.ObjectId(id);
    return await TaskModel.find({user, isCompleted:true}).sort({createdAt:-1});
}

export const editTask = async (values:Task)=>{
    const _id = new mongoose.Types.ObjectId(values._id);
    return await TaskModel.findOneAndUpdate({_id},{$set:values},{new:true});
}

export const deleteTask = async (id:string)=>{
    const _id = new mongoose.Types.ObjectId(id);
    return await TaskModel.findOneAndDelete({_id});
}

export const deleteCompletedTask = async (id:string)=>{
    const _id = new mongoose.Types.ObjectId(id);
    return await TaskModel.findOneAndDelete({_id,isCompleted:true});
}

export const updateTask = async (id:string,completedOn:string)=>{
    const _id = new mongoose.Types.ObjectId(id);
    return await TaskModel.findOneAndUpdate({_id},{$set:{isCompleted:true,completedOn}},{new:true});
}


export const getTasksCount = async (userId:string) => {
    const user = new mongoose.Types.ObjectId(userId);
    return await TaskModel.countDocuments({ user });
};

export const getCompletedTasksCount = async (userId:string) => {
    const user = new mongoose.Types.ObjectId(userId);
    return await TaskModel.countDocuments({ user, isCompleted: true });
};

export const getOverdueTasksCount = async (userId:string) => {
    const user = new mongoose.Types.ObjectId(userId);
    const currentDateTime = new Date();

    return await TaskModel.countDocuments({
        user,
        isCompleted: false,
        time: { $lt: parseTimeStringToDate(currentDateTime.toTimeString().slice(0, 5)) }
    });
};

const parseTimeStringToDate = (timeString:string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); 
    return date;
};
