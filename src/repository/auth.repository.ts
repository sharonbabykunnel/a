import { User, UserDocument } from '../types';
import UserModel from '../models/userModel'
import bcrypt from 'bcrypt'
import { Types } from 'mongoose'

export async function findByEmail(email:string) : Promise< User | null > {
    const user = await UserModel.findOne({ email });
    return user ? userToPlainObject(user) : null;
}

export async function findByNumber(number:number) : Promise<User | null> {
    const user = await UserModel.findOne({ number });
    return user ? userToPlainObject(user) : null;
}

export async function createUser(values: UserDocument) : Promise<User>  {
    const user = await UserModel.create(values);
    return userToPlainObject(user) 
}

export async function verifyPassword(inputPassword : string, password : string) : Promise<boolean> {
    return await bcrypt.compare(inputPassword, password);
}


function userToPlainObject(user: UserDocument): User {
    const { _id, name, email, password, number } = user.toObject();
    return { 
        _id: _id instanceof Types.ObjectId ? _id.toString() : _id, 
        name, 
        email, 
        password, 
        number 
    };
}