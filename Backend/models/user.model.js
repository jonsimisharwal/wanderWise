import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        index: true,
        minlength: [3, "username should be atleast 3 characters"],
        maxlength: [50, "username cannot exceed 50 characters"]
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(email) {
                return email.endsWith('@gmail.com') // Fixed typo
            },
            message: 'Email must be valid Gmail address (@gmail.com)'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    // Simple admin role field
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: [500, 'Bio cannot exceed 500 characters'],
        default: ''
    },
    location: {
        type: String,
        maxlength: [100, 'Location cannot exceed 100 characters'],
        default: ''
    },
    stats: {
        numberofCountriesTraveled: {
            type: Number,
            default: 0,
            min: [0, 'Countries traveled cannot be negative']
        },
        numberofAdventures: {
            type: Number,
            default: 0,
            min: [0, 'Adventures cannot be negative']
        },
        overallProgress: {
            type: Number,
            default: 0,
            min: [0, 'Progress cannot be negative'],
            max: [100, 'Progress cannot exceed 100%']
        }
    },
    achievements: [{
        badgeType: {
            type: String,
            enum: ['explorer', 'photographer', 'storyteller', 'mountainclimber', 'socialbutterfly', 'goalsetting', 'legend'],
            required: true
        },
        earnedAt: {
            type: Date,
            default: Date.now
        },
        criteria: {
            type: String,
            required: true
        }
    }],
    refreshToken: {
        type: String
    }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
            isAdmin: this.isAdmin // Include admin status in token
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)