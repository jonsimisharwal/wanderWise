import mongoose, { Schema } from 'mongoose';

const postSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: false,
        maxlength: 1000
    },
    filters: {
        type: String,
        required: true,
        enum: ['adventure', 'romantic', 'relaxation', 'cultural', 'party', 'spiritual', 'nature', 'family', 'roadtrip', ''],
        default: ''
    },
    // Add isActive field for soft delete functionality
    isActive: {
        type: Boolean,
        default: true
    },
    // Add isPublished field for admin functionality
    isPublished: {
        type: Boolean,
        default: false
    },
    likes: {
        count: {
            type: Number,
            default: 0,
            min: 0
        },
        users: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            likedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    shares: {
        count: {
            type: Number,
            default: 0,
            min: 0
        },
        users: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            sharedAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

// Pre-save middleware to update counts
postSchema.pre('save', function(next) {
    // Update likes count
    this.likes.count = this.likes.users.length;
    
    // Update shares count
    this.shares.count = this.shares.users.length;
    
    next();
});

export const Post = mongoose.model("Post", postSchema);