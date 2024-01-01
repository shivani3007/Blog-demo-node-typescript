import express from 'express';
import {connect} from './databaseConnection';
import dotenv from 'dotenv';
dotenv.config();
import { errorHandler } from './middlewares/errorHandler';
import passport from './authentication/passport-config';
import index from './routes/index.routes';

connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use('/api', index);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`app is running on port ${port}`);
})