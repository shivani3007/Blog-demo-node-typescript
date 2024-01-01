import express from 'express';
const router = express.Router();
import auth from './auth.routes';
import user from './user.routes';
import post from './post.routes';

router.use('/user',user);
router.use('/auth',auth);
router.use('/post',post);

export default router;