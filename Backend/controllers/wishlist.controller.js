import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { wishlist } from "../models/wishlist.model";
import { User } from "../models/user.model";
import { Place } from "../models/places.model";
import { asyncHandler } from "../utils/asyncHandler";

//add to wishlist
const addwishlist=asyncHandler(async(req,res)=>{
    //take userid and placeid from req.body
   //check user exist if no throw error
   //find place by placeid
   //find place exist in wishlist if exist do nothing already added
   //if place not found in wishlist then create wishlist added to the response
   //if no then throw error
   const {userId,placeId}=req.body;
   const user=await User.findById(userId);
   if(!user){
    throw new ApiError(400,"user not found")
   }
   const place=await Place.findById(placeId);
   if(!place){
    throw new ApiError(400,"place does not exist")
   }
   const existplace=await wishlist.findOne({
    userId:userId,
    placeId:placeId
   });
   if(existplace){
    res.status(200).json(
        new ApiResponse(200,"","place already exist in wishlist"));
   }
   const addplace=await wishlist.create({
    userId: userId,
        placeId: placeId});
     
   return res.status(200).json(new ApiResponse(200,addplace,"added place to your wishlist successfully"))


})
//remove wishlist
const removewishlist=asyncHandler(async(req,res)=>{
//placeid found out
//check if placeid exist in place if no throw error
//findanddelete place by passing placeid then added to the response
//if not find throw error
const userid= req.user?._id || req.body.userId;
const placeid=req.params.placeId || req.body.placeId;
const existeduser=await User.findById(userid);
if(!existeduser){
    throw new ApiError(400,"user not found")
}
const place=await Place.findById(placeid);
if(!place){
    throw new ApiError(400,"place not found")

}
const existplace=await FindOneAndDelete({
    userId:userid,
    placeId:placeid
}) 
if(!existplace){
    return res.status(404).json(
        new ApiResponse(404,null,"does not exist in wishlist")
    )
}
  return res.status(200).json(
    new ApiResponse(200,existplace,"successfully remove from wishlist")
  );

})
// get user wishlist
const getwishlist=asyncHandler(async(req,res)=>{
    //userid check exist
    //place id
    //find place 
    //added to the respone
    const userId = req.user?._id  || req.body.userId;
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "user not found");
    }
    
    // Get all wishlist items for the user and populate place details
    const userWishlist = await wishlist.find({ userId: userId })
        .populate('placeId') // This will get full place details
        .exec();
    
    if (!userWishlist || userWishlist.length === 0) {
        return res.status(200).json(
            new ApiResponse(200, [], "your wishlist is empty")
        );
    }
    
    return res.status(200).json(
        new ApiResponse(200, userWishlist, "your wishlist retrieved successfully")
    );
})

export
{addwishlist,removewishlist,getwishlist}