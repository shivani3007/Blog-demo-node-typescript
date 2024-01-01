import bcrypt from 'bcrypt';
import mongoose , {Schema , Document} from 'mongoose';

export interface IUser extends Document{
    _id:string;
    name:string;
    surname:string;
    email:string;
    password:string;
    age:number;
    isDeleted:false;
    role:string;
}

const userSchema:Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Role'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
});

//Hash the password before saving to database
userSchema.pre('save',async function(next:any) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword:string = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error)
    }
})

// Exclude the password field when converting the document to JSON
userSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    },
  });

export default mongoose.model<IUser>('User',userSchema);