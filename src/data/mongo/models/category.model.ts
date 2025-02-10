import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    available:{
        type: Boolean,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',//Debemos poner el mismo nombre que en el usermodel
        required: true
    },
});

export const CategoryModel = mongoose.model('Category',categorySchema);