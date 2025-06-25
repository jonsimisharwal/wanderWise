import mongoose,{Schema} from 'mongoose'

const PlaceSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Place title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
       
    },
    location:{
        type:String,
        required:[true,"location is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"description is rquired"],
        trim:true,
        minlength: [50, 'Description must be at least 50 characters'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    image:{

    },
    snapshots:{

    },
    rating:{
     type: Number,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0,
    get: function(value) {
      return Math.round(value * 10) / 10; // Round to 1 decimal place
    }
    },
    Duration:{
     type: String,
    trim: true,
    enum: {
      values: ['1-2 hours', '2-4 hours', '4-6 hours', 'Half day', 'Full day', '2-3 days', '3-5 days', '1 week+'],
      message: 'Invalid time required option'
    }
    },
    VisitedMonths:{
      type: String,
      trim: true,
      maxlength: [200, 'Special months info cannot exceed 200 characters']
    },
    knownFor:{

    },
    budgetRange:{
     type: String,
    trim: true,
    enum: {
      values: ['Budget (₹0-1000)', 'Mid-range (₹1000-5000)', 'Premium (₹5000-15000)', 'Luxury (₹15000+)'],
      message: 'Invalid budget range'
    }
    },
   filters_category:{
      type: String,
    required: [true, 'Category is required'],
    trim: true,
    lowercase: true,
    enum: {
      values: [
        'temple', 'beach', 'mountain', 'city', 'historical', 'nature', 
        'adventure', 'cultural', 'religious', 'wildlife', 'heritage', 
        'hill-station', 'desert', 'lake', 'waterfall', 'fort', 'palace'
      ],
      message: 'Invalid category'
    }
    },
    continent:{
     type: String,
    trim: true,
    lowercase: true,
    enum: {
      values: ['asia', 'europe', 'north-america', 'south-america', 'africa', 'australia', 'antarctica'],
      message: 'Invalid continent'
    }
    },
    filters_advancedFilters_range: {
    type: String,
    trim: true,
    enum: {
      values: ['local', 'domestic', 'international'],
      message: 'Invalid range filter'
    }
  },
  filters_advancedFilters_difficulty: {
    type: String,
    trim: true,
    enum: {
      values: ['easy', 'moderate', 'difficult', 'extreme'],
      message: 'Invalid difficulty level'
    }
  },
    filters_advancedFilters_bestSeason: {
    type: String,
    trim: true,
    enum: {
      values: ['spring', 'summer', 'monsoon', 'autumn', 'winter', 'year-round'],
      message: 'Invalid season'
    }
  },


},{timestamps:true});

export const Place=mongoose.model("Place",PlaceSchema);