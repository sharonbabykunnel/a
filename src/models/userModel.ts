import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        require:true,
        type:String
    }
})