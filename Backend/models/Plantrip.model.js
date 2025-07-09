import mongoose, { Schema } from 'mongoose';
import { User } from './user.model.js';
import { Place } from './places.model.js';
const TripplanSchema = new mongoose.Schema({
    // User and Place References
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'User ID is required']
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: [true, 'Place ID is required']
    },

    // Trip Basic Information
    title: {
        type: String,
        required: [true, 'Trip title is required'],
        trim: true,
        minlength: [5, 'Title must be at least 5 characters'],
        maxlength: [150, 'Title cannot exceed 150 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },

    // Traveler Details (from the form)
    travelerDetails: {
        name: {
            type: String,
            required: [true, 'Traveler name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number']
        }
    },

    // Travel Dates
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Start date must be in the future'
        }
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'End date must be after start date'
        }
    },

    // Group Details
    numberOfTravelers: {
        type: Number,
        required: [true, 'Number of travelers is required'],
        min: [1, 'At least 1 traveler is required'],
        max: [50, 'Cannot exceed 50 travelers']
    },

    // Trip Duration (calculated)
    duration: {
        days: {
            type: Number,
            default: 0
        },
        nights: {
            type: Number,
            default: 0
        }
    },

    // Budget Planning
    budgetRange: {
        type: String,
        required: [true, 'Budget range is required'],
        enum: {
            values: [
                'Budget (₹0-5,000)', 
                'Economy (₹5,000-15,000)', 
                'Mid-range (₹15,000-50,000)', 
                'Premium (₹50,000-1,50,000)', 
                'Luxury (₹1,50,000+)'
            ],
            message: 'Invalid budget range'
        }
    },
    budgetBreakdown: {
        accommodation: {
            type: Number,
            min: [0, 'Accommodation budget cannot be negative'],
            default: 0
        },
        transportation: {
            type: Number,
            min: [0, 'Transportation budget cannot be negative'],
            default: 0
        },
        activities: {
            type: Number,
            min: [0, 'Activities budget cannot be negative'],
            default: 0
        },
        food: {
            type: Number,
            min: [0, 'Food budget cannot be negative'],
            default: 0
        },
        miscellaneous: {
            type: Number,
            min: [0, 'Miscellaneous budget cannot be negative'],
            default: 0
        },
        total: {
            type: Number,
            min: [0, 'Total budget cannot be negative'],
            default: 0
        }
    },

    // Selected Options (from the planning page)
    selectedTransportation: {
        mode: {
            type: String,
            enum: ['flight', 'train', 'bus', 'car', 'bike', 'walking', 'local-transport', 'cruise', 'other']
        },
        details: {
            type: String,
            trim: true,
            maxlength: [300, 'Transportation details cannot exceed 300 characters']
        },
        estimatedCost: {
            type: Number,
            min: [0, 'Transportation cost cannot be negative'],
            default: 0
        }
    },

    selectedAccommodation: {
        type: {
            type: String,
            enum: ['hotel', 'resort', 'hostel', 'guesthouse', 'apartment', 'camping', 'homestay', 'luxury', 'budget']
        },
        name: {
            type: String,
            trim: true,
            maxlength: [100, 'Accommodation name cannot exceed 100 characters']
        },
        details: {
            type: String,
            trim: true,
            maxlength: [300, 'Accommodation details cannot exceed 300 characters']
        },
        estimatedCost: {
            type: Number,
            min: [0, 'Accommodation cost cannot be negative'],
            default: 0
        },
        checkIn: Date,
        checkOut: Date
    },

    selectedActivities: [{
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, 'Activity name cannot exceed 100 characters']
        },
        description: {
            type: String,
            trim: true,
            maxlength: [300, 'Activity description cannot exceed 300 characters']
        },
        estimatedCost: {
            type: Number,
            min: [0, 'Activity cost cannot be negative'],
            default: 0
        },
        duration: {
            type: String,
            trim: true
        },
        scheduledDate: Date,
        priority: {
            type: String,
            enum: ['must-do', 'preferred', 'optional'],
            default: 'preferred'
        }
    }],

    // Trip Preferences
    preferences: {
        accommodationType: {
            type: String,
            enum: ['luxury', 'comfort', 'budget', 'mixed']
        },
        transportPreference: {
            type: String,
            enum: ['fastest', 'cheapest', 'most-comfortable', 'scenic']
        },
        activityTypes: [{
            type: String,
            enum: ['adventure', 'cultural', 'relaxation', 'food', 'shopping', 'nightlife', 'nature', 'sports']
        }],
        dietaryRestrictions: [{
            type: String,
            enum: ['vegetarian', 'vegan', 'gluten-free', 'halal', 'kosher', 'none']
        }],
        specialRequests: {
            type: String,
            trim: true,
            maxlength: [500, 'Special requests cannot exceed 500 characters']
        }
    },

    // Trip Status and Management
    status: {
        type: String,
        required: true,
        enum: ['draft', 'planned', 'booked', 'confirmed', 'ongoing', 'completed', 'cancelled'],
        default: 'draft'
    },

    // Sharing and Visibility
    isPublic: {
        type: Boolean,
        default: false
    },
    shareCode: {
        type: String,
        unique: true,
        sparse: true
    },

    // Additional Information
    notes: {
        type: String,
        trim: true,
        maxlength: [1000, 'Notes cannot exceed 1000 characters']
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [30, 'Tag cannot exceed 30 characters']
    }],

    // Booking References (if applicable)
    bookings: {
        accommodation: [{
            bookingId: String,
            provider: String,
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'cancelled'],
                default: 'pending'
            }
        }],
        transportation: [{
            bookingId: String,
            provider: String,
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'cancelled'],
                default: 'pending'
            }
        }],
        activities: [{
            activityId: String,
            bookingId: String,
            provider: String,
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'cancelled'],
                default: 'pending'
            }
        }]
    },

    // Weather at time of planning
    weatherSnapshot: {
        temperature: String,
        conditions: String,
        bestTimeConfirmation: String,
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    },

    // System fields
    lastModified: {
        type: Date,
        default: Date.now
    },
    version: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
});

// Pre-save middleware to calculate duration and total budget
TripplanSchema.pre('save', function(next) {
    // Calculate trip duration
    if (this.startDate && this.endDate) {
        const timeDiff = this.endDate.getTime() - this.startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.duration.days = daysDiff;
        this.duration.nights = Math.max(0, daysDiff - 1);
    }

    // Calculate total budget
    if (this.budgetBreakdown) {
        this.budgetBreakdown.total = 
            this.budgetBreakdown.accommodation + 
            this.budgetBreakdown.transportation + 
            this.budgetBreakdown.activities +
            this.budgetBreakdown.food +
            this.budgetBreakdown.miscellaneous;
    }

    // Update last modified
    this.lastModified = new Date();
    
    next();
});

// Generate share code for public trips
TripplanSchema.pre('save', function(next) {
    if (this.isPublic && !this.shareCode) {
        this.shareCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    next();
});

// Indexes for better query performance
TripplanSchema.index({ userId: 1, createdAt: -1 });
TripplanSchema.index({ placeId: 1, isPublic: 1 });
TripplanSchema.index({ status: 1 });
TripplanSchema.index({ shareCode: 1 }, { sparse: true });
TripplanSchema.index({ startDate: 1, endDate: 1 });
TripplanSchema.index({ 'travelerDetails.email': 1 });

// Virtual for formatted duration
TripplanSchema.virtual('formattedDuration').get(function() {
    if (this.duration.days <= 1) {
        return `${this.duration.days} day`;
    } else if (this.duration.days <= 7) {
        return `${this.duration.days} days, ${this.duration.nights} nights`;
    } else {
        const weeks = Math.floor(this.duration.days / 7);
        const remainingDays = this.duration.days % 7;
        return `${weeks} week${weeks > 1 ? 's' : ''}${remainingDays > 0 ? ` ${remainingDays} days` : ''}`;
    }
});

// Virtual for total estimated cost
TripplanSchema.virtual('totalEstimatedCost').get(function() {
    let total = 0;
    if (this.selectedTransportation && this.selectedTransportation.estimatedCost) {
        total += this.selectedTransportation.estimatedCost;
    }
    if (this.selectedAccommodation && this.selectedAccommodation.estimatedCost) {
        total += this.selectedAccommodation.estimatedCost;
    }
    if (this.selectedActivities && this.selectedActivities.length > 0) {
        total += this.selectedActivities.reduce((sum, activity) => sum + (activity.estimatedCost || 0), 0);
    }
    return total;
});

export const Tripplan = mongoose.model("Tripplan", TripplanSchema);