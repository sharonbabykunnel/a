import mongoose, {Document, Schema, CallbackError} from "mongoose";
import bcrypt from 'bcrypt'

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
  }

const userSchema: Schema<IUser> = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

userSchema.pre('save',async function(next){
    try {
        const user = this as IUser
        if(!user.isModified('password')){
            return next()
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        next()   
    } catch (error) {
        next(error as CallbackError);
    }
})

export default mongoose.model<IUser>('user',userSchema)