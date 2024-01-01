import express from 'express';
const router = express.Router();
import {authenticateAndAuthorize} from '../middlewares/authentication';
import { Role } from '../utils/enums';
import { createPost , showAll} from '../controllers/post.controller';
import upload from '../utils/multerSetup';

router.post('/create-post',authenticateAndAuthorize([Role.USER]), upload.single('image'),createPost);
router.get('/get-posts',authenticateAndAuthorize([Role.USER, Role.ADMIN]),showAll);

export default router;