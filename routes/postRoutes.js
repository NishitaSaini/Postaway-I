import express from "express";
import { authentication } from "../middlewares/authentication.js";
import * as postController from "../controllers/post.controller.js";

const router = express.Router();

router.post('/', authentication, postController.createPost);
router.get('/all', authentication, postController.getAllPosts);
router.get('/:id', authentication, postController.getPostById);
router.delete('/:id', authentication, postController.deletePost);
router.put('/:id', authentication, postController.updatePost);


export default router;