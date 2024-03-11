import express from "express";
import * as commnentController from "../controllers/comment.controller.js";
import { authentication } from "../middlewares/authentication.js";

const router = express.Router();

router.get('/:id', authentication, commnentController.getCommentsByPostId);
router.post('/:id', authentication, commnentController.createComment);
router.put('/:id', authentication, commnentController.updateComment);
router.delete('/:id', authentication, commnentController.deleteComment);

export default router;