import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import USER, { IUser } from '../schemas/user.schema';
import { verifyPassword } from '../utils/helperFunctions';
import ROLE, { IRole } from '../schemas/role.schema';


/** Registration api for users :- */
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const register = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const {name , surname, email,password, age , role} = req.body;

        const roleFound:IRole | null = await ROLE.findOne({name:role});
        
        const newUser = new USER({
            name:name,
            surname:surname,
            email:email,
            password:password,
            age:age,
            role:roleFound!._id,
        });

        const createdUser = await newUser.save();
        return res.status(200).json({createdUser});
    }catch(error){
        next(error)
    }
}


/** Login api for users :- */
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const login = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {email, password} = req.body;
        const user:IUser | null = await USER.findOne({email});

        if(!user){
            return res.status(404).json({message:'User not found with this email'});
        }

        const hashedPassword:string = user.password;
        const isPasswordCorrect:boolean | undefined= await verifyPassword(password, hashedPassword);

        if(!isPasswordCorrect){
            return res.status(401).json({message:'Invalid credentials'});
        }

        const secretKey:string = process.env.SECRET_KEY!;
        const token:string = await jwt.sign({id:user._id},secretKey, {expiresIn:'24h'});
        return res.status(200).json({accessToken:token});
    }catch(error){
        next(error);
    }
}