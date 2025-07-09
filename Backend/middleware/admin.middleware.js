import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import  ApiError  from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// Admin credentials - store these securely in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'

// Check if user is admin by matching credentials
export const verifyAdmin = asyncHandler(async (req, res, next) => {
    try {
        // First verify JWT token (reuse existing verifyJWT logic)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        // Check if user is admin by matching email or username with admin credentials
        const isAdminByCredentials = (
            user.email === ADMIN_EMAIL || 
            user.username === ADMIN_USERNAME ||
            user.isAdmin === true
        )

        if (!isAdminByCredentials) {
            throw new ApiError(403, "Admin access required")
        }

        // Set admin flag if not already set
        if (!user.isAdmin) {
            await User.findByIdAndUpdate(user._id, { isAdmin: true })
            user.isAdmin = true
        }

        req.user = user
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

// Optional: Middleware to check admin status from token
export const requireAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, "Authentication required")
    }

    if (!req.user.isAdmin) {
        throw new ApiError(403, "Admin access required")
    }

    next()
})