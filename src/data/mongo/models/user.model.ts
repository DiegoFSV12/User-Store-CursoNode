import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    img:{
        type:String //Sera opcional poner o no una imagen
    },
    role:{
        type:[String],//Sera un array de string
        default:['USER_ROLE'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
});

export const UserModel = mongoose.model('User',userSchema);