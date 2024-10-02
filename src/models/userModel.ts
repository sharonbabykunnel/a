import mongoose from 'mongoose';
import { UserDocument } from '../types';

const userSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
});

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;