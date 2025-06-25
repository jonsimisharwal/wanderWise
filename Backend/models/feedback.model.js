import mongoose,{Schema} from 'mongoose'
import { User } from './user.model';
const feedbackSchema=new mongoose.Schema({
    userId:{
         type:Schema.Types.ObjectId,
         ref:"User"
    },
    rating:{
        type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number'
    }
    },
    comment:{
         type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    category:{
         type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['bug', 'feature', 'improvement', 'complaint', 'praise', 'other'],
      message: 'Category must be one of: bug, feature, improvement, complaint, praise, other'
    },
    lowercase: true,
    index: true

    }
},{timestamps:true});
// Middleware to update updatedAt on save
feedbackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});
export const feedback=mongoose.model("feedback",feedbackSchema);