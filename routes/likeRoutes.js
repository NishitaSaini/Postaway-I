import express from 'express';
import { toggleLike, getLikesByPostId } from '../controllers/like.controller.js';
import {authentication} from '../middlewares/authentication.js';

const router = express.Router();

router.get('/:postId', authentication, getLikesByPostId);
router.get('/toggle/:postId', authentication, toggleLike);

export default router;
