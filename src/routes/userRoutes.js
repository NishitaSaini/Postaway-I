import Express from "express";
import * as userController from "../controllers/user.controller.js";

const router = Express.Router();

router.post("/signup",(req,res,next)=>{
    userController.signUp(req,res,next);
  });
router.post('/signin', userController.signIn);

export default router;