import { Document, Types } from "mongoose";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    number: number;
}

export interface UserDocument extends Omit<User, '_id'>, Document {}

export interface UserInput extends Omit<User, '_id'> {}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    time: string;
    user:Types.ObjectId | string
    isCompleted: boolean;
    isOntime: boolean;
    completedOn?:string;
}

export interface TaskDocument extends Omit<Task, '_id'>,Document{}