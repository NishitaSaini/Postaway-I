import commentModel from "../models/comment.model.js";
import CustomError from "../utils/customError.js";

//add a new comment to a specific post
export const createComment = async(req, res, next) => {
    try
    {    
    const {userId} = req.user;
    const {postId, content} = req.body;
    const comment = await commentModel.create({userId, postId, content});
    res.status(201).json(comment);
}catch(error){
    next(error);
}
};

//get all comments by post Id
export const getCommentsByPostId = async(req, res, next) => {
    try{
        const postId = req.params.id;
        const comments = await commentModel.find({postId});
        res.status(200).json(comments);
    }catch(error){
        next(error);
    }
};

//update comment
export const updateComment = async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const { content } = req.body;
      const updatedComment = await commentModel.findByIdAndUpdate( commentId, { content }, { new: true });
      if (!updatedComment) {
        throw new CustomError(404, 'Comment not found');
      }
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  };

//Delete Comment
  export const deleteComment = async (req, res, next) => {
    try {
      const commentId = req.params.id;
      const deletedComment = await commentModel.findByIdAndDelete(commentId);
      if (!deletedComment) {
        throw new CustomError(404, 'Comment not found');
      }
      res.status(204).json('Comment deleted succesfully');
    } catch (error) {
      next(error);
    }
  };