import  ApiError  from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tripplan } from "../models/Plantrip.model.js";
import { Place } from "../models/places.model.js";


// Get place details for trip planning
const getPlaceForTripPlanning = asyncHandler(async (req, res) => {
    const { placeId } = req.params;

    const place = await Place.findById(placeId);
    
    if (!place) {
        throw new ApiError(404, "Place not found");
    }

    if (place.status !== 'active') {
        throw new ApiError(400, "Place is not available for trip planning");
    }

    // Structure the response for the trip planning page
    const placeDetails = {
        id: place._id,
        title: place.title,
        name: place.name,
        description: place.description,
        images: {
            main: place.images.main,
            gallery: place.images.gallery,
            snapshots: place.images.snapshots
        },
        rating: {
            average: place.rating.average,
            totalReviews: place.rating.totalReviews
        },
        location: place.location,
        duration: place.duration,
        bestMonths: place.bestMonths,
        knownFor: place.knownFor,
        weather: place.weather,
        transportation: place.transportation,
        accommodation: place.accommodation,
        activities: place.activities,
        facilities: place.facilities,
        entryFee: place.entryFee,
        contact: place.contact
    };

    return res.status(200).json(
        new ApiResponse(200, placeDetails, "Place details retrieved successfully")
    );
});

// Create a new trip plan from trip planning page
const createTripPlanFromPage = asyncHandler(async (req, res) => {
    const { placeId } = req.params;
    const {
        title,
        description,
        travelerDetails,
        startDate,
        endDate,
        numberOfTravelers,
        budgetRange,
        selectedTransportation,
        selectedAccommodation,
        selectedActivities,
        preferences,
        notes,
        tags,
        isPublic
    } = req.body;

    // Validate required fields
    if (!title || !travelerDetails || !startDate || !endDate || !numberOfTravelers || !budgetRange) {
        throw new ApiError(400, "Title, traveler details, dates, number of travelers, and budget range are required");
    }

    // Validate traveler details
    if (!travelerDetails.name || !travelerDetails.email || !travelerDetails.phone) {
        throw new ApiError(400, "Traveler name, email, and phone are required");
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
        throw new ApiError(400, "End date must be after start date");
    }

    if (start < new Date()) {
        throw new ApiError(400, "Start date must be in the future");
    }

    // Verify place exists and is active
    const place = await Place.findById(placeId);
    if (!place) {
        throw new ApiError(404, "Place not found");
    }

    if (place.status !== 'active') {
        throw new ApiError(400, "Place is not available for trip planning");
    }

    // Create trip plan
    const tripPlan = await Tripplan.create({
        userId: req.user._id,
        placeId,
        title: title || `Trip to ${place.name}`,
        description,
        travelerDetails,
        startDate,
        endDate,
        numberOfTravelers,
        budgetRange,
        selectedTransportation,
        selectedAccommodation,
        selectedActivities: selectedActivities || [],
        preferences,
        notes,
        tags,
        isPublic: isPublic || false,
        status: 'draft'
    });

    // Populate the response
    const populatedTripPlan = await Tripplan.findById(tripPlan._id)
        .populate('userId', 'username email avatar')
        .populate('placeId', 'name title location images rating');

    return res.status(201).json(
        new ApiResponse(201, populatedTripPlan, "Trip plan created successfully")
    );
});

// Update trip plan from planning page
const updateTripPlanFromPage = asyncHandler(async (req, res) => {
    const { tripPlanId } = req.params;
    const updateData = req.body;

    // Find the trip plan
    const existingTripPlan = await Tripplan.findById(tripPlanId);
    
    if (!existingTripPlan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Check ownership
    if (existingTripPlan.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own trip plans");
    }

    // Validate dates if being updated
    if (updateData.startDate || updateData.endDate) {
        const startDate = new Date(updateData.startDate || existingTripPlan.startDate);
        const endDate = new Date(updateData.endDate || existingTripPlan.endDate);
        
        if (startDate >= endDate) {
            throw new ApiError(400, "End date must be after start date");
        }
    }

    // Update the trip plan
    const updatedTripPlan = await Tripplan.findByIdAndUpdate(
        tripPlanId,
        { 
            ...updateData,
            version: existingTripPlan.version + 1
        },
        { new: true, runValidators: true }
    ).populate('userId', 'username email avatar')
     .populate('placeId', 'name title location images rating');

    return res.status(200).json(
        new ApiResponse(200, updatedTripPlan, "Trip plan updated successfully")
    );
});

// Get all trip plans for a place (public ones)
const getTripPlansForPlace = asyncHandler(async (req, res) => {
    const { placeId } = req.params;
    const { page = 1, limit = 10, status, budgetRange, duration } = req.query;

    // Verify place exists
    const place = await Place.findById(placeId);
    if (!place) {
        throw new ApiError(404, "Place not found");
    }

    // Build query for public trip plans
    const query = {
        placeId,
        isPublic: true
    };

    // Add optional filters
    if (status) {
        query.status = status;
    }

    if (budgetRange) {
        query.budgetRange = budgetRange;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get trip plans with pagination
    const tripPlans = await Tripplan.find(query)
        .populate('userId', 'username avatar')
        .populate('placeId', 'name title location images rating')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    // Get total count for pagination
    const totalTripPlans = await Tripplan.countDocuments(query);
    const totalPages = Math.ceil(totalTripPlans / parseInt(limit));

    const responseData = {
        tripPlans,
        pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: totalTripPlans,
            itemsPerPage: parseInt(limit),
            hasNextPage: parseInt(page) < totalPages,
            hasPreviousPage: parseInt(page) > 1
        },
        place: {
            id: place._id,
            name: place.name,
            title: place.title
        }
    };

    return res.status(200).json(
        new ApiResponse(200, responseData, "Trip plans retrieved successfully")
    );
});

// Get user's trip plans
const getUserTripPlans = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status, placeId } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { userId };

    if (status) {
        query.status = status;
    }

    if (placeId) {
        query.placeId = placeId;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get user's trip plans
    const tripPlans = await Tripplan.find(query)
        .populate('placeId', 'name title location images rating')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    // Get total count
    const totalTripPlans = await Tripplan.countDocuments(query);
    const totalPages = Math.ceil(totalTripPlans / parseInt(limit));

    const responseData = {
        tripPlans,
        pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: totalTripPlans,
            itemsPerPage: parseInt(limit),
            hasNextPage: parseInt(page) < totalPages,
            hasPreviousPage: parseInt(page) > 1
        }
    };

    return res.status(200).json(
        new ApiResponse(200, responseData, "User trip plans retrieved successfully")
    );
});

// Get single trip plan by ID
const getTripPlanById = asyncHandler(async (req, res) => {
    const { tripPlanId } = req.params;

    const tripPlan = await Tripplan.findById(tripPlanId)
        .populate('userId', 'username email avatar')
        .populate('placeId', 'name title location images rating duration bestMonths weather transportation accommodation activities facilities entryFee contact');

    if (!tripPlan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Check if user can access this trip plan
    const canAccess = tripPlan.isPublic || 
                     (req.user && tripPlan.userId._id.toString() === req.user._id.toString());

    if (!canAccess) {
        throw new ApiError(403, "You don't have permission to access this trip plan");
    }

    return res.status(200).json(
        new ApiResponse(200, tripPlan, "Trip plan retrieved successfully")
    );
});

// Get trip plan by share code
const getTripPlanByShareCode = asyncHandler(async (req, res) => {
    const { shareCode } = req.params;

    const tripPlan = await Tripplan.findOne({ shareCode, isPublic: true })
        .populate('userId', 'username avatar')
        .populate('placeId', 'name title location images rating duration bestMonths weather transportation accommodation activities facilities entryFee contact');

    if (!tripPlan) {
        throw new ApiError(404, "Trip plan not found or not publicly shared");
    }

    return res.status(200).json(
        new ApiResponse(200, tripPlan, "Shared trip plan retrieved successfully")
    );
});

// Delete trip plan
const deleteTripPlan = asyncHandler(async (req, res) => {
    const { tripPlanId } = req.params;

    const tripPlan = await Tripplan.findById(tripPlanId);

    if (!tripPlan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Check ownership
    if (tripPlan.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own trip plans");
    }

    await Tripplan.findByIdAndDelete(tripPlanId);

    return res.status(200).json(
        new ApiResponse(200, null, "Trip plan deleted successfully")
    );
});

// Update trip plan status
const updateTripPlanStatus = asyncHandler(async (req, res) => {
    const { tripPlanId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['draft', 'planned', 'booked', 'confirmed', 'ongoing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid status provided");
    }

    const tripPlan = await Tripplan.findById(tripPlanId);

    if (!tripPlan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Check ownership
    if (tripPlan.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own trip plans");
    }

    const updatedTripPlan = await Tripplan.findByIdAndUpdate(
        tripPlanId,
        { 
            status,
            version: tripPlan.version + 1
        },
        { new: true, runValidators: true }
    ).populate('userId', 'username email avatar')
     .populate('placeId', 'name title location images rating');

    return res.status(200).json(
        new ApiResponse(200, updatedTripPlan, "Trip plan status updated successfully")
    );
});

// Toggle trip plan visibility
const toggleTripPlanVisibility = asyncHandler(async (req, res) => {
    const { tripPlanId } = req.params;

    const tripPlan = await Tripplan.findById(tripPlanId);

    if (!tripPlan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Check ownership
    if (tripPlan.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only modify your own trip plans");
    }

    const updatedTripPlan = await Tripplan.findByIdAndUpdate(
        tripPlanId,
        { 
            isPublic: !tripPlan.isPublic,
            version: tripPlan.version + 1
        },
        { new: true, runValidators: true }
    ).populate('userId', 'username email avatar')
     .populate('placeId', 'name title location images rating');

    return res.status(200).json(
        new ApiResponse(200, updatedTripPlan, `Trip plan ${updatedTripPlan.isPublic ? 'made public' : 'made private'} successfully`)
    );
});

// Get trip plan statistics for a place
const getTripPlanStats = asyncHandler(async (req, res) => {
    const { placeId } = req.params;

    // Verify place exists
    const place = await Place.findById(placeId);
    if (!place) {
        throw new ApiError(404, "Place not found");
    }

    // Get statistics
    const stats = await Tripplan.aggregate([
        { $match: { placeId: new mongoose.Types.ObjectId(placeId), isPublic: true } },
        {
            $group: {
                _id: null,
                totalTripPlans: { $sum: 1 },
                averageDuration: { $avg: "$duration.days" },
                budgetRangeStats: {
                    $push: "$budgetRange"
                },
                statusStats: {
                    $push: "$status"
                },
                averageTravelers: { $avg: "$numberOfTravelers" }
            }
        }
    ]);

    // Process budget range statistics
    let budgetRangeBreakdown = {};
    let statusBreakdown = {};

    if (stats.length > 0) {
        const budgetRanges = stats[0].budgetRangeStats;
        const statuses = stats[0].statusStats;

        // Count budget ranges
        budgetRanges.forEach(range => {
            budgetRangeBreakdown[range] = (budgetRangeBreakdown[range] || 0) + 1;
        });

        // Count statuses
        statuses.forEach(status => {
            statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
        });
    }

    const responseData = {
        place: {
            id: place._id,
            name: place.name,
            title: place.title
        },
        statistics: {
            totalPublicTripPlans: stats.length > 0 ? stats[0].totalTripPlans : 0,
            averageDuration: stats.length > 0 ? Math.round(stats[0].averageDuration) : 0,
            averageTravelers: stats.length > 0 ? Math.round(stats[0].averageTravelers) : 0,
            budgetRangeBreakdown,
            statusBreakdown
        }
    };

    return res.status(200).json(
        new ApiResponse(200, responseData, "Trip plan statistics retrieved successfully")
    );
});

export {
    getPlaceForTripPlanning,
    createTripPlanFromPage,
    updateTripPlanFromPage,
    getTripPlansForPlace,
    getUserTripPlans,
    getTripPlanById,
    getTripPlanByShareCode,
    deleteTripPlan,
    updateTripPlanStatus,
    toggleTripPlanVisibility,
    getTripPlanStats
};