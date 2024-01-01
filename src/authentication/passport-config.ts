import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();
import { IUser} from '../schemas/user.schema';
import USER from '../schemas/user.schema';


const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

passport.use(new Strategy(jwtOptions, async (payload, done) =>{
    try{
        const user:IUser | null = await USER.findById(payload.id);
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }catch(error){
        done(error, false)
    }
}));

export default passport;