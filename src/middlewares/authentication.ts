import {Request, Response, NextFunction} from 'express';
import passport from '../authentication/passport-config';
import { IUser } from '../schemas/user.schema';
import ROLE, { IRole } from '../schemas/role.schema';
 
 export const authenticateAndAuthorize = (roles: string[]= []) => (req:Request,res:Response,next:NextFunction) => {
    passport.authenticate('jwt',{session:false}, async(err:Error, user:IUser) =>{

        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({message:'Unauthorized'});
        }

        const roleId = user.role;
        const roleFound:IRole | null = await ROLE.findById(roleId);
        const role: string | null= roleFound!.name;

        if(roleFound !== null && typeof roleFound !== 'string'){
            if(!roles.includes(role)){
                return res.status(403).json({message:'Forbidden'});
            }
        }

        req.user = user;
        next();
        
    })(req,res,next);
 }