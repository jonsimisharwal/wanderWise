import mongoose,{Schema, SchemaTypes} from 'mongoose'
import { User } from './user.model';
const TravelBlogSchema=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        title:{
            type:String,
            required:true,
            maxlength:[50,"length should be 100 char"],


        },
        body:{
           type:String,
           default:"...",
           maxlength:[500,"body length cannot exceed 500"]

        },
        image:{
           type: String,
           default: null

        },
        tags:{
            type: String,
            trim: true,
            lowercase: true

        },
        category:{
           type: String,
           required: true,
           enum: ['adventure', 'culture', 'food', 'nature', 'city', 'backpacking', 'luxury', 'budget', 'solo', 'family']
        }
    },
    likes:{
        count:{
            type: Number,
            default: 0,
            min: 0

        },
        users:[{
           userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
        }]
    },
    comments:{
        userId:{
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true
        },
        content:{
            type: String,
            required: true,
            maxlength: 1000
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    shares:{
        count:{
            type: Number,
            default: 0,
            min: 0
        },
        users:[{ userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sharedAt: {
      type: Date,
      default: Date.now
    },
    platform: {
      type: String,
      enum: ['facebook', 'twitter', 'instagram', 'linkedin', 'email', 'copy_link']
    }

        }]
    },
    status:{
        isPublished:{
            type: Boolean,
            default: false
        },
        isDraft:{
           type: Boolean,
           default: true
        }
    }

},{timestamps:true});


export const TravelBlog=mongoose.model("TravelBlog",TravelBlogSchema)