import {Request, Response, NextFunction} from 'express';
import POST from '../schemas/post.schema';
import { IUser } from '../schemas/user.schema';

/** Create post */
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const createPost = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const {title, content } = req.body;
        const user: IUser | undefined = req.user as IUser ;
        const userId:string | undefined = user?._id;
        
        const newPost = {
            title,
            content,
            createdBy:userId,
            image:req.file?.filename
        }

        const createdPost = await POST.create(newPost);
        return res.status(200).json({createdPost});

    }catch(error){
        next(error)
    }
}

export const showAll = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const posts = await POST.find();
         if(posts.length <1){
            return res.status(404).json({message:'Posts not found'})
         }

         return res.status(200).json({posts});
    }catch(error){
        next(error);
    }
}