import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

//all blogs of registered user will display here
const getAllPosts=asyncHandler(async(req,res)=>{
   const { page = 1, limit = 10, filter } = req.query;
    
    // Build query
    const query = { isActive: true };
    if (filter && filter !== '') {
        query.filters = filter;
    }
    
    // Get posts with pagination
    const posts = await Post.find(query)
        .populate('userId', 'username email avatar')
        .populate({
            path: 'comments.userId',
            select: 'username avatar'
        })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    
    const total = await Post.countDocuments(query);
    
    return res.status(200).json(
        new ApiResponse(200, {
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        }, "Posts retrieved successfully")
    );
})

//show places
const getPostById=asyncHandler(async(req,res)=>{
  const { postId } = req.params;
    
    const post = await Post.findOne({ _id: postId, isActive: true })
        .populate('userId', 'username email avatar')
        .populate({
            path: 'comments.userId',
            select: 'username avatar'
        });
    
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, post, "Post retrieved successfully")
    );
})

const getUserPosts=asyncHandler(async(req,res)=>{
   const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    // Get user's posts
    const posts = await Post.find({ userId: userId, isActive: true })
        .populate('userId', 'username email avatar')
        .populate({
            path: 'comments.userId',
            select: 'username avatar'
        })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    
    const total = await Post.countDocuments({ userId: userId, isActive: true });
    
    return res.status(200).json(
        new ApiResponse(200, {
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total
        }, "User posts retrieved successfully")
    );
})

const toggleLikePost=asyncHandler(async(req,res)=>{
   const { postId } = req.params;
    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }
    
    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    
    // Check if user already liked the post
    const existingLikeIndex = post.likes.users.findIndex(
        like => like.userId.toString() === userId.toString()
    );
    
    if (existingLikeIndex > -1) {
        // Unlike: Remove user from likes array
        post.likes.users.splice(existingLikeIndex, 1);
        await post.save();
        
        return res.status(200).json(
            new ApiResponse(200, { 
                liked: false, 
                likesCount: post.likes.count 
            }, "Post unliked successfully")
        );
    } else {
        // Like: Add user to likes array
        post.likes.users.push({ userId: userId });
        await post.save();
        
        return res.status(200).json(
            new ApiResponse(200, { 
                liked: true, 
                likesCount: post.likes.count 
            }, "Post liked successfully")
        );
    }
})

const addComment=asyncHandler(async(req,res)=>{
   const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }
    
    if (!content || content.trim() === '') {
        throw new ApiError(400, "Comment content is required");
    }
    
    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    
    // Add comment
    post.comments.push({
        userId: userId,
        content: content.trim()
    });
    
    await post.save();
    
    // Populate the updated post
    const updatedPost = await Post.findById(postId)
        .populate('userId', 'username email avatar')
        .populate({
            path: 'comments.userId',
            select: 'username avatar'
        });
    
    return res.status(201).json(
        new ApiResponse(201, updatedPost, "Comment added successfully")
    );
})
const sharePost=asyncHandler(async(req,res)=>{
const { postId } = req.params;
    const userId = req.user?._id;
    
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }
    
    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    
    // Check if user already shared
    const existingShareIndex = post.shares.users.findIndex(
        share => share.userId.toString() === userId.toString()
    );
    
    if (existingShareIndex === -1) {
        // Add user to shares array
        post.shares.users.push({ userId: userId });
        await post.save();
    }
    
    return res.status(200).json(
        new ApiResponse(200, { 
            sharesCount: post.shares.count 
        }, "Post shared successfully")
    );
})

const getPostsByFilter=asyncHandler(async(req,res)=>{
   const { filter } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const posts = await Post.find({ 
        filters: filter, 
        isActive: true 
    })
        .populate('userId', 'username email avatar')
        .populate({
            path: 'comments.userId',
            select: 'username avatar'
        })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    
    const total = await Post.countDocuments({ filters: filter, isActive: true });
    
    return res.status(200).json(
        new ApiResponse(200, {
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total,
            filter
        }, `Posts with filter '${filter}' retrieved successfully`)
    );
})
export {
    getAllPosts,
    getPostById,
    getUserPosts,
    toggleLikePost,
    addComment,
    sharePost,
    getPostsByFilter
};