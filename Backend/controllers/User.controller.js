import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { asyncHandler } from "../utils/asyncHandler.js";

// Admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'

const generateAccessAndRefereshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async(req, res) => {
    const {fullname, username, email, password} = req.body;
    
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Check if registering user is admin based on credentials
    const isAdmin = (email === ADMIN_EMAIL || username === ADMIN_USERNAME)

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase(),
        isAdmin // Set admin status during registration
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

const login = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    
    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // Check and update admin status if needed
    const shouldBeAdmin = (
        user.email === ADMIN_EMAIL || 
        user.username === ADMIN_USERNAME
    )
    
    if (shouldBeAdmin && !user.isAdmin) {
        user.isAdmin = true
        await user.save({ validateBeforeSave: false })
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, 
                accessToken, 
                refreshToken,
                isAdmin: loggedInUser.isAdmin
            },
            "User logged In Successfully"
        )
    )
})

const logout = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
});

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

// ADMIN SPECIFIC FUNCTIONS

// Get all users (Admin only)
const getAllUsers = asyncHandler(async(req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    
    const query = search ? {
        $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { fullname: { $regex: search, $options: 'i' } }
        ]
    } : {}

    const users = await User.find(query)
        .select('-password -refreshToken')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })

    const total = await User.countDocuments(query)

    return res.json(
        new ApiResponse(200, {
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        }, "Users fetched successfully")
    )
})

// Delete user (Admin only)
const deleteUser = asyncHandler(async(req, res) => {
    const { userId } = req.params
    
    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "Cannot delete your own account")
    }

    const user = await User.findByIdAndDelete(userId)
    
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res.json(new ApiResponse(200, {}, "User deleted successfully"))
})

// Update user admin status (Admin only)
const updateUserAdminStatus = asyncHandler(async(req, res) => {
    const { userId } = req.params
    const { isAdmin } = req.body
    
    const user = await User.findByIdAndUpdate(
        userId,
        { isAdmin },
        { new: true, runValidators: true }
    ).select('-password -refreshToken')

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res.json(
        new ApiResponse(200, user, "User admin status updated successfully")
    )
})

// Get admin dashboard analytics
const getAdminAnalytics = asyncHandler(async(req, res) => {
    const totalUsers = await User.countDocuments()
    const adminUsers = await User.countDocuments({ isAdmin: true })
    const regularUsers = totalUsers - adminUsers
    
    const recentSignups = await User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    })

    const topExplorers = await User.find()
        .sort({ 'stats.numberofCountriesTraveled': -1 })
        .limit(5)
        .select('username fullname stats.numberofCountriesTraveled avatar')

    return res.json(
        new ApiResponse(200, {
            totalUsers,
            adminUsers,
            regularUsers,
            recentSignups,
            topExplorers
        }, "Analytics fetched successfully")
    )
})

// Check if current user is admin
const checkAdminStatus = asyncHandler(async(req, res) => {
    const isAdmin = (
        req.user.email === ADMIN_EMAIL || 
        req.user.username === ADMIN_USERNAME ||
        req.user.isAdmin === true
    )

    return res.json(
        new ApiResponse(200, { isAdmin }, "Admin status checked")
    )
})

export {
    registerUser,
    login,
    logout,
    changeCurrentPassword,
    getAllUsers,
    deleteUser,
    updateUserAdminStatus,
    getAdminAnalytics,
    checkAdminStatus
}