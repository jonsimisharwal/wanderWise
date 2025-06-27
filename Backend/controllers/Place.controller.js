import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Place } from "../models/places.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create place - admin only
const createPlace = asyncHandler(async (req, res) => {
    const { name, description, continent, country, city, budget, category, images, coordinates } = req.body;

    // Validate required fields
    if (!name || !continent || !country || !budget) {
        throw new ApiError(400, "Name, continent, country, and budget are required");
    }

    // Check if user is admin (assuming you have user role checking)
    if (req.user?.role !== 'admin') {
        throw new ApiError(403, "Only admin users can create places");
    }

    // Create new place
    const place = await Place.create({
        name,
        description,
        continent,
        country,
        city,
        budget,
        category,
        images,
        coordinates,
        createdBy: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, place, "Place created successfully")
    );
});

// Get all places
const getAllPlaces = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 }
    };

    const places = await Place.aggregate([
        { $match: {} },
        { $sort: options.sort },
        { $skip: (options.page - 1) * options.limit },
        { $limit: options.limit }
    ]);

    const totalPlaces = await Place.countDocuments();

    return res.status(200).json(
        new ApiResponse(200, {
            places,
            pagination: {
                currentPage: options.page,
                totalPages: Math.ceil(totalPlaces / options.limit),
                totalPlaces,
                hasNext: options.page < Math.ceil(totalPlaces / options.limit),
                hasPrev: options.page > 1
            }
        }, "Places fetched successfully")
    );
});

// Get place by search
const getPlaceBySearch = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        throw new ApiError(400, "Search query is required");
    }

    const places = await Place.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { city: { $regex: query, $options: 'i' } },
            { country: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    }).limit(20);

    return res.status(200).json(
        new ApiResponse(200, places, `Found ${places.length} places matching "${query}"`)
    );
});

// Get place by filters
const getPlaceByFilters = asyncHandler(async (req, res) => {
    const { continent, category, budgetRange, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (continent) {
        filter.continent = continent;
    }
    if (category) {
        filter.category = category;
    }
    if (budgetRange) {
        const [minBudget, maxBudget] = budgetRange.split('-').map(Number);
        if (isNaN(minBudget) || isNaN(maxBudget)) {
            throw new ApiError(400, "Invalid budget range format. Use 'min-max' format");
        }
        filter.budget = { $gte: minBudget, $lte: maxBudget };
    }

    // Fetch places with pagination and filters
    const places = await Place.find(filter)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalPlaces = await Place.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(200, {
            places,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPlaces / parseInt(limit)),
                totalPlaces
            },
            filters: { continent, category, budgetRange }
        }, `Found ${places.length} places matching the filters`)
    );
});

// Get place by customized budget
const getPlaceByCustomizedBudget = asyncHandler(async (req, res) => {
    const { customizebudgetrange, page = 1, limit = 10 } = req.query;

    if (!customizebudgetrange) {
        throw new ApiError(400, "Budget value is required");
    }

    const budgetValue = parseInt(customizebudgetrange);

    if (isNaN(budgetValue) || budgetValue <= 0) {
        throw new ApiError(400, "Budget must be a valid positive number");
    }

    // Find places with budget less than or equal to the specified budget
    const filter = {
        budget: { $lte: budgetValue }
    };

    const places = await Place.find(filter)
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ budget: 1 }); // Sort by budget ascending (cheapest first)

    const totalPlaces = await Place.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(200, {
            places,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPlaces / parseInt(limit)),
                totalPlaces
            },
            filters: { maxBudget: budgetValue }
        }, `Found ${places.length} places within budget of ${budgetValue}`)
    );
});

// Get places by user (logged-in user's places)
const getPlaceByUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const places = await Place.find({ createdBy: userId })
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalPlaces = await Place.countDocuments({ createdBy: userId });

    return res.status(200).json(
        new ApiResponse(200, {
            places,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPlaces / parseInt(limit)),
                totalPlaces
            }
        }, `Found ${places.length} places created by user`)
    );
});

export {
    createPlace,
    getAllPlaces,
    getPlaceBySearch,
    getPlaceByFilters,
    getPlaceByCustomizedBudget,
    getPlaceByUser
};