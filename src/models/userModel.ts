import mongoose, { CallbackError } from 'mongoose';
import { UserDocument } from '../types';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
});

userSchema.pre('save',async function(next){
    try {
        if(!this.isModified('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error as CallbackError);
    }
})

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;