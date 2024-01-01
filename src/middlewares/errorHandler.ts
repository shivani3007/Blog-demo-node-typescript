import {Request, Response, NextFunction} from 'express';

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction) =>{
    try{
        let statusCode:number = err.statusCode || 500;

        let errMsg:string = '';
        if(err.details){
            if(err.details.body){
                errMsg = err.details.body[0].message;
            }else if(err.details.params){
                errMsg = err.details.params[0].message;
            }else if(err.details.query){
                errMsg = err.details.query[0].message;
            }else{
                errMsg = err.message
            }

            res.status(statusCode).json({
                statusCode,
                message:err.message,
                err:errMsg
            })
        }
        
    }catch(error){
        next(error);
    }
}