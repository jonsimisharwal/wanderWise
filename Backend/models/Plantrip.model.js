import mongoose,{Schema} from mongoose

const PlantripSchema=new mongoose.Schema({
    userId:{
       type:Schema.Types.ObjectId,
       require:true
    },
    placeId:{
        type:Schema.Types.ObjectId,
        require:true

    },
    title:{
        type: String,
        required: [true, 'Trip title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [150, 'Title cannot exceed 150 characters']

    },
    description:{
        type: String,
        required: [true, 'Trip description is required'],
        trim: true,
        minlength: [20, 'Description must be at least 20 characters'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']

    },
    image:{
        type:String,

    },
    Rating:{
        type: Number,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0,
        get: function(value) {
      return Math.round(value * 10) / 10;
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
    Months:{

    },
    BudgetRange:{
      type: String,
    required: [true, 'Budget range is required'],
    enum: {
      values: [
        'Budget (₹0-5,000)', 'Economy (₹5,000-15,000)', 
        'Mid-range (₹15,000-50,000)', 'Premium (₹50,000-1,50,000)', 
        'Luxury (₹1,50,000+)'
      ],
      message: 'Invalid budget range'
    }
    },
    budget_breakdown_accommodation: {
    type: Number,
    min: [0, 'Accommodation budget cannot be negative'],
    default: 0
  },
  
  budget_breakdown_transportation: {
    type: Number,
    min: [0, 'Transportation budget cannot be negative'],
    default: 0
  },
  
  budget_breakdown_activities: {
    type: Number,
    min: [0, 'Activities budget cannot be negative'],
    default: 0
  },
  
  budget_breakdown_total: {
    type: Number,
    min: [0, 'Total breakdown cannot be negative'],
    default: 0
  },
  additional_weather: {
    type: String,
    trim: true,
    maxlength: [300, 'Weather info cannot exceed 300 characters']
  },
  
  additional_transportation_mode: {
    type: String,
    trim: true,
    enum: {
      values: [
        'flight', 'train', 'bus', 'car', 'bike', 'walking', 
        'mixed', 'local-transport', 'cruise', 'other'
      ],
      message: 'Invalid transportation mode'
    }
  },
  
  additional_transportation_details: {
    type: String,
    trim: true,
    maxlength: [500, 'Transportation details cannot exceed 500 characters']
  },
  
  additional_transportation_cost: {
    type: Number,
    min: [0, 'Transportation cost cannot be negative'],
    default: 0
  },
  
    
},{timestamps:true});

export const Tripplan=mongoose.model("Tripplan",TripplanSchema);