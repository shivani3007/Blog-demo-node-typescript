import express from 'express';
const router = express.Router();
import {validate} from 'express-validation';
import {register, login} from '../controllers/auth.controller';
import { register as registerValidation } from '../validations/user';

router.post('/register', validate(registerValidation),register);
router.post('/login', login);

export default router;