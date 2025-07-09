import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import { feedback } from "../models/feedback.model.js"; // Fixed: Remove duplicate imports
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const Displayfeedback = asyncHandler(async(req, res) => {
    try {
        // Get all feedback with populated user data
        const allFeedback = await feedback.find({})
            .populate('userId', 'username email') // Populate user details
            .sort({ createdAt: -1 }); // Sort by newest first

        return res.status(200).json(
            new ApiResponse(200, allFeedback, "Feedback retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Error retrieving feedback");
    }
});

const createfeedback = asyncHandler(async(req, res) => {
    const { userId, rating, comment, category } = req.body;

    // Validate required fields
    if (!userId || !rating || !comment || !category) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }

    // Create new feedback
    const newFeedback = await feedback.create({
        userId,
        rating,
        comment,
        category
    });

    // Populate user data in response
    const populatedFeedback = await feedback.findById(newFeedback._id)
        .populate('userId', 'username email');

    return res.status(201).json(
        new ApiResponse(201, populatedFeedback, "Feedback created successfully")
    );
});

const editfeedback = asyncHandler(async(req, res) => {
    // Fixed: Get feedbackId from params, not userId
    const { feedbackId } = req.params;
    const { rating, comment, category } = req.body;

    // Check if feedback exists
    const existingFeedback = await feedback.findById(feedbackId);
    if (!existingFeedback) {
        throw new ApiError(404, "Feedback not found");
    }

    // Optional: Check if user owns this feedback (if you have authentication)
    // const userId = req.user?._id;
    // if (existingFeedback.userId.toString() !== userId.toString()) {
    //     throw new ApiError(403, "Not authorized to edit this feedback");
    // }

    // Update feedback with only provided fields
    const updatedFeedback = await feedback.findByIdAndUpdate(
        feedbackId,
        {
            ...(rating && { rating }),
            ...(comment && { comment }),
            ...(category && { category })
        },
        { 
            new: true, // Return updated document
            runValidators: true // Run schema validations
        }
    ).populate('userId', 'username email');

    return res.status(200).json(
        new ApiResponse(200, updatedFeedback, "Feedback updated successfully")
    );
});

const deletefeedback = asyncHandler(async(req, res) => {
    // Fixed: Get feedbackId from params, not userId
    const { feedbackId } = req.params;

    // Check if feedback exists
    const existingFeedback = await feedback.findById(feedbackId);
    if (!existingFeedback) {
        throw new ApiError(404, "Feedback not found");
    }

    // Optional: Check if user owns this feedback (if you have authentication)
    // const userId = req.user?._id;
    // if (existingFeedback.userId.toString() !== userId.toString()) {
    //     throw new ApiError(403, "Not authorized to delete this feedback");
    // }

    // Delete the feedback
    await feedback.findByIdAndDelete(feedbackId);

    return res.status(200).json(
        new ApiResponse(200, {}, "Feedback deleted successfully")
    );
});

const getuserfeedback = asyncHandler(async(req, res) => { // Fixed: Added req, res parameters
    // Get userId from params
    const { userId } = req.params;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }

    // Get user's feedback
    const userFeedback = await feedback.find({ userId })
        .populate('userId', 'username email')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, userFeedback, "User feedback retrieved successfully")
    );
});

export {
    Displayfeedback,
    createfeedback,
    editfeedback,
    deletefeedback,
    getuserfeedback
};