import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () =>{
    try{
        const dbUrl = process.env.DB_URL!;
        const db = await mongoose.connect(dbUrl);
        if(db){
            console.log('connected to database');
        }
    }catch(error){
        console.log('error',error);
    }
}