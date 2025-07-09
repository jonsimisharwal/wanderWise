import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import { TravelBlog } from "../models/TravelBlog.model.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//in this add publish button in frontend
//create blog
const Createblog=asyncHandler(async(req,res)=>{
    //userid from req.body check user exist or not
    //take image,title,description,.. and if empty throw
    //if user found create travelblog
    //populate data to response
    //return res
    const {userId,content,status,title,body,image,tags,category,isPublished}=req.body
    const existuser=await User.findById(userId)
    if(!existuser){
        throw new ApiError(400,"user not found")
    }
    if(!title ){
        throw new ApiError(400,"title not found")
    }
    if(!category ){
        throw new ApiError(400,"category not found")
    }
    const createblog=await TravelBlog.create({
        userid: userId,
        content: {
            title,
            body: body || "...",
            image: image || null,
            tags: tags || "",
            category
        },
        status: {
            isPublished: isPublished || false,
            isDraft: !(isPublished || false)
        }
    })
     // Populate user data in response
    const populatedBlog = await TravelBlog.findById(createblog._id)
        .populate('userid', 'username email');

    return res.status(201).json(
        new ApiResponse(201, populatedBlog, "Travel blog created successfully")
    );
})
//delete
const Deleteblog=asyncHandler(async(req,res)=>{
      //check user exist or not
      //findoneanddelete blog where userId:userid
      //if not found throw error
      //return res
      const userId=req.user?._id
      const {blogId}=req.params
      const user=await User.findById(userId)
      if(!user){
        throw new ApiError(400,"user not found")
      }
      const blog=await TravelBlog.findOneAndDelete({_id:blogId,userid:userId})
      if(!blog){
         return res.status(404).json(
            new ApiResponse(404,null,"blog not found")
         )
      }
      return res.status(200).json(
        new ApiResponse(200,blog,"blog successfully deleted")
      )
      
})

//update
const Updateblog=asyncHandler(async(req,res)=>{
    //user exist or not
    //take blog id exist or not
    //if blog exist findOneAndUpdate userId
    //return res
    const userid=req.user?._id
    const {blogId}=req.params
    const {title,body,image,tags,category,isPublished}=req.body
    const user=await User.findById(userid)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    
    const updateData = {};
    if (title) updateData['content.title'] = title;
    if (body) updateData['content.body'] = body;
    if (image) updateData['content.image'] = image;
    if (tags) updateData['content.tags'] = tags;
    if (category) updateData['content.category'] = category;
    if (isPublished !== undefined) {
        updateData['status.isPublished'] = isPublished;
        updateData['status.isDraft'] = !isPublished;
    }
    
    const blog=await TravelBlog.findOneAndUpdate({_id:blogId,userid:userid},
        updateData,
        {new: true}
    )
    if(!blog){
        return res.status(404).json(
            new ApiResponse(404,null,"blog not found")
        )
    }
    return res.status(200).json(
        new ApiResponse(200,blog,"blog updated successfully")
    )
})

//display
const Getblog=asyncHandler(async(req,res)=>{
     //user exist or not
     //take blogid from req.params
     //check blogexist or not
     //travelblog find blog by id passing userid
     //if not found throw error
     const userid=req.user?._id
     const {blogId}=req.params
     const user=await User.findById(userid)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    const blog=await TravelBlog.findOne({_id:blogId});
    if(!blog){
        return res.status(404).json(
            new ApiResponse(404,null,"blog not found")
        )
    }
     return res.status(200).json(
        new ApiResponse(200,blog,"Display blogs...")
     )
})

const Shareblogtopost=asyncHandler(async(req,res)=>{
     //user exist or not 
     //blogid and content from req.body
     //check if blog ispublished
     /// Check if user already shared this blog
     // Create new post in social feed
      // Populate the response

      const userid=req.user?._id
     const {blogId}=req.params
     const {content}=req.body
     const user=await User.findById(userid)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    
    const blog=await TravelBlog.findById(blogId)
    if(!blog){
        throw new ApiError(404,"blog not found")
    }
    
    if (!blog.status.isPublished) {
        throw new ApiError(400, "Only published blogs can be shared to social feed");
    }
    const existingPost = await Post.findOne({ 
        travelBlogId: blogId, 
        authorId: userid,
        isActive: true
    });
    
    if(existingPost){
        throw new ApiError(400,"Blog already shared to social feed")
    }
    
     const newPost = await Post.create({
        travelBlogId: blogId,
        authorId: userid,
        content: content || ""
    });
      const populatedPost = await Post.findById(newPost._id)
        .populate('authorId', 'username email')
        .populate({
            path: 'travelBlogId',
            populate: {
                path: 'userid',
                select: 'username email'
            }
        });

    return res.status(201).json(
        new ApiResponse(201, populatedPost, "Blog shared to social feed successfully")
    );
})
export {
    Createblog,
    Deleteblog,
    Updateblog,
    Getblog,
    Shareblogtopost
}