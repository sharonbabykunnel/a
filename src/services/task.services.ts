import CustomError from '../helpers/customError.js';
import * as taskRepository from '../repository/task.repository';
import { Task } from '../types/index.js';

export const getTasks = async (id:string)=>{
    if(!id) throw new CustomError("Internal Server Error",500,'');
    const tasks = await taskRepository.getTasks(id);
    return tasks
}

export const getCompletedTasks = async (id:string)=>{
    if(!id) throw new CustomError("Internal Server Error",500,'');
    console.log(id)
    const tasks = await taskRepository.getCompletedTasks(id);
    console.log(tasks)
    return tasks
}

export const postTask = async (values:Task)=>{
    if(!values) throw new CustomError("Internal Server Error",500,'');
    const tasks = await taskRepository.createTask(values);
    return tasks
}

export const editTask = async (values:Task,)=>{
    if(!values) throw new CustomError("Internal Server Error",500,'');
    const tasks = await taskRepository.editTask(values);
    console.log(tasks)
    return tasks
}

export const deleteTask = async (id:string,)=>{
    if(!id) throw new CustomError("Invalid task ID", 400, 'INVALID_ID');
    const task = await taskRepository.deleteTask(id);
    if (!task) throw new CustomError("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task)
    return task
}

export const deleteCompletedTask = async (id:string,)=>{
    if(!id) throw new CustomError("Invalid task ID", 400, 'INVALID_ID');
    const task = await taskRepository.deleteCompletedTask(id);
    if (!task) throw new CustomError("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task)
    return task
}

export const updateTask = async (id:string,completedOn:string)=>{
    if(!id) throw new CustomError("Internal Server Error",500,'');
    const task = await taskRepository.updateTask(id,completedOn);
    if (!task) throw new CustomError("Task not found", 404, 'TASK_NOT_FOUND');
    console.log(task)
    return task
}

export const getTaskStatsService = async (userId:string) => {
    if (!userId) throw new CustomError("User ID is required", 400, 'INVALID_ID');

    const totalTasks = await taskRepository.getTasksCount(userId);
    const completedTasks = await taskRepository.getCompletedTasksCount(userId);
    const overdueTasks = await taskRepository.getOverdueTasksCount(userId);

    return {
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate: ((completedTasks / totalTasks) * 100).toFixed(2),
    };
};