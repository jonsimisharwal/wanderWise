import mongoose ,{Schema } from mongoose
import { User } from "./user.model";
const postSchema=new mongoose.Schema({
    image:{
      type: String,
      required: true
    },
    location:{
      type: String,
      required: true
    },
    title:{
       type: String,
       required: true,
       trim: true,
       maxlength: 200
    },
    description:{
        type: String,
        required: false,
        maxlength: 1000
    },
    filters:{
          type: String,
          required: true,
          enum: ['adventure',  'romantic','relaxation','cultural' ,'party','spiritual','nature','family', 'roadtrip',''],
          default: ''
    },
    likes:{
        count:{
             type: Number,
             default: 0,
             min: 0

        },
        users:{
           type: String,
           required: false,
           default: ''
        }
    },
    comments:{
        userId:{
          type: String,
          required: true
        },
        content:{
           type: String,
           required: true,
           maxlength: 500,
           default:''
        },
        createdAt:{
             type: Date,
             default:Date.now

        }
    },
    shares:{
        count:{
             type: Number,
             default: 0,
             min: 0

        },
        users:{
           type: String,
           required: false,
           default: ''
        }
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

// Pre-save middleware to validate interactions
postSchema.pre('save', function(next) {
  // Ensure counts match the user lists
  if (this.likes.users) {
    const likeCount = this.likes.users.split(',').filter(id => id.trim()).length;
    this.likes.count = likeCount;
  }
  
  if (this.shares.users) {
    const shareCount = this.shares.users.split(',').filter(id => id.trim()).length;
    this.shares.count = shareCount;
  }
  
  next();
});

export const Post=mongoose.model("Post",postSchema);