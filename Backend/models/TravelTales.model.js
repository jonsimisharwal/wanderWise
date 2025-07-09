import mongoose,{Schema} from "mongoose";
import { User } from "./user.model.js";
const TravelTaleSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    source:{
       type:String,
       require:true

    },
    destination:{
       type:String,
       require:true
    },
    startDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || v >= new Date();
      },
      message: 'Start date cannot be in the past'
    }
  },
  
  endDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return !v || !this.startDate || v >= this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
    mood:{
        type: String,
        enum: ['adventure', 'relaxation', 'cultural', 'romantic', 'family', 'business', 'solo'],
        required: true

    },
    season:{
        type: String,
        enum: ['spring', 'summer', 'autumn', 'winter'],
        required: true
    },
    Budget:{
       type: Number,
        required: true,
        min: 0
    },
    customBudget:{
       type: Number,
       min: 0
    },
    budget_distribution_accommodation: {
        type: Number,
        min: 0,
        default: 0
    },
    budget_distribution_transportation: {
        type: Number,
        min: 0,
        default: 0
    },
    budget_distribution_activities: {
        type: Number,
        min: 0,
        default: 0
    },
    additional_weather_temperature: {
        type: String
    },
    
    
    additional_currencyConverter_fromCurrency: {
        type: String,
        uppercase: true,
        length: 3 // ISO currency codes are 3 characters
    },
    additional_currencyConverter_toCurrency: {
        type: String,
        uppercase: true,
        length: 3
    },
    additional_currencyConverter_exchangeRate: {
        type: Number,
        min: 0
    },
    additional_currencyConverter_convertedAmount: {
        type: Number,
        min: 0
    }
},{
    timestamps:true
});

// Pre-save middleware to validate budget distribution
TravelTaleSchema.pre('save', function(next) {
    const totalDistribution = 
        (this.budget_distribution_accommodation || 0) +
        (this.budget_distribution_transportation || 0) +
        (this.budget_distribution_activities || 0);
    
    const budget = this.budget_customizedBudget || this.budget_totalBudget;
    
    if (totalDistribution > budget) {
        next(new Error('Budget distribution cannot exceed total budget'));
    } else {
        next();
    }
});
export const TravelTales=new mongoose.model('TravelTale',TravelTaleSchema);