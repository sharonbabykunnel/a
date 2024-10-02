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