import mongoose, {Document, Schema} from 'mongoose';

export interface IPost extends Document{
    createdBy:string;
    title: string;
    content: string;
    image:string;
    isDeleted:boolean;
} 

const postSchema = new Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
   },
    image:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
    }
});

export default mongoose.model<IPost>('Post',postSchema);