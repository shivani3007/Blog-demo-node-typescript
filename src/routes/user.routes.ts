import express from 'express';
const router = express.Router();
import {authenticateAndAuthorize} from '../middlewares/authentication';
import { Role } from '../utils/enums';

router.get('/protected',authenticateAndAuthorize([Role.ADMIN,Role.USER]), (req,res)=>{
    res.send('protected route')
})

export default router;