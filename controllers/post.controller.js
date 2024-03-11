import postModel from "../models/post.model.js";
import CustomError from "../utils/customError.js";

//create a new post
export async function createPost (req, res, next) {
    try{
        const {userId} = req.user; // Assuming we have user data in the request object after authentication
        const { caption, imageUrl } = req.body;
        const post = await postModel.create({ userId, caption, imageUrl });
        res.status(201).json(post);
    }catch(error){
        next(error)
    }
};

//get all posts
export async function getAllPosts(req, res, next) {
    try{
        const posts = await postModel.find();
        return res.status(200).json(posts);
    }catch(error){
        next(error);
    }
};

//get a post by Id
export async function getPostById (req, res, next) {
    try
   { 
    const postId = req.params.id;
    const post = await postModel.findById(postId);
    if(!post){
        throw new CustomError(404,'Post not found');
    }
    res.status(200).json(post);
}catch(error){
    next(error);
}
};

//update post
export async function updatePost(req, res, next){
    try
    {
        const postId = req.params.id;
        const {caption, imageUrl} = req.body;
        const updatedPost = await postModel.findByIdAndUpdate(postId, { caption, imageUrl }, { new: true });

        if(!updatedPost){
            throw new CustomError(404, 'Post not found');
        }
        res.status(200).json(updatedPost);
    }catch(error){
        next(error);
    }
};

//delete post
export async function deletePost(req, res, next){
    try
    {
        const PostId = req.params.id;
        const deletedPost = await postModel.findByIdAndDelete(PostId);

        if(!deletedPost){
        throw new CustomError(404, 'Post not found');
    }
    res.status(200).send('Post deleted');
    }catch(error){
        next(error); 
    }
};