import mongoose from "mongoose";
import { User } from "./user.types";


const userSchema = new mongoose.Schema<User>({
    name : {
        type : String,
        required : true,
        trim : true,

    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        
    },
    password : {
         type : String,
        required : true,
        trim : true,
        
    }
}, {timestamps : true})

const user = mongoose.model<User>("User", userSchema)
export default user;