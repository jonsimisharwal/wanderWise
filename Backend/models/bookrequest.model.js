import mongoose,{Schema} from 'mongoose'

const bookRequestSchema=new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    tripplanId:{
        type:Schema.Types.ObjectId,
        ref:"Tripplan"
    },
    placeId:{
         type:Schema.Types.ObjectId,
        ref:"Place"

    },
    totalbudget:{
          type: Number,
          required: true,
          min: 0
    },
    requesteddate:{
        type: Date,
      required: true,
      validate: {
        validator: function(date) {
          return date > new Date();
        },
        message: 'Requested date must be in the future'
    }
},
    contactinfo:{
        phone:{
          type: String,
        required: true,
        validate: {
          validator: function(phone) {
            return /^[+]?[\d\s\-\(\)]{10,15}$/.test(phone);
          },
          message: 'Please provide a valid phone number'

        }
    },
        email:{
          type: String,
        required: true,
        validate: {
          validator: function(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          },
          message: 'Please provide a valid email address'
        }
    
    }}
,
    status:{
       type: String,
    required: true,
    enum: ['pending', 'reviewing', 'approved', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
    }
},{timestamps:true});

   
// Pre-save middleware to validate requested date
bookRequestSchema.pre('save', function(next) {
  if (this.request.requestedDate <= new Date()) {
    return next(new Error('Requested date must be in the future'));
  }
  next();
});

export const BookRequest = mongoose.model('BookRequest', bookRequestSchema);