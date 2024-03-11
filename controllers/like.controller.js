import likeModel from "../models/like.model.js";
import CustomError from "../utils/customError.js";

export const toggleLike = async(req, res, next) => {
   try
    {
        const {userId} = req.user;
        const {postId} = req.params;

        // Check if the user has already liked the post
        const existingLike = await likeModel.findOne({ userId, postId });
        if (existingLike) {
            // User has already liked the post, so remove the like
            await likeModel.findByIdAndDelete(existingLike._id);
            res.status(200).json({ message: 'Like removed successfully' });
          } else {
            // User has not liked the post yet, so add the like
            await likeModel.create({ userId, postId });
            res.status(201).json({ message: 'Like added successfully' });
          }
        } catch (error) {
          next(error);
        }
      };

      export const getLikesByPostId = async (req, res, next) => {
        try {
          const { postId } = req.params;
          const likes = await likeModel.find({ postId });
          res.status(200).json(likes);
        } catch (error) {
          next(error);
        }
      };