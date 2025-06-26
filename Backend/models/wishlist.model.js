import mongoose,{Schema} from mongoose
import { User } from "./user.model";
const wishlistSchema=new mongoose.Schema({
    userId:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    places_addedAt:{
       type:Date,
       default:Date.now
    },
    
    placeId:{
      type:Schema.Types.ObjectId,
      ref:"Place"
    }
},{timestamps:true});

export const wishlist=mongoose.model("wishlist",wishlistSchema);