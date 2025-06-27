import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { Tripplan } from "../models/Plantrip.model";
import { TravelTales } from "../models/TravelTales.model";

//form of filling details by user[startdate,enddate,src,dest,numberof travels,mood,season,budget]
//edit details by user
//update details  by user
//display filled data
//display transportation according to src and dest and date by apifetch
//display location accomodation by apifetch
//display location activities by api fetch
//display weather according to location by api
//display currency according to location by api
//select anyone from each transportation,activities,accomodation
//button for booking->bookrequest 


//create travel tales
const createTravelTale = asyncHandler(async (req, res) => {
    //user exist or not
    //take data from req.body
    //if empty throw error
    //if user found create travel tale
    //populate data to response
    //return res
    const { userId, startDate, endDate, src, dest, numberOfTravels, mood, season, budget,custombudget } = req.body;
    const existuser=await User.findById(userId);
    if(!existuser){
        throw new ApiError(400,"user not found")
    }
    const traveltale=await TravelTales.create({
        userId,
        startDate,
        endDate,
        src,
        dest,
        numberOfTravels,
        mood,
        season,
        budget: {
            totalBudget: custombudget!== undefined? custombudget :budget
        }
    })
    // Populate user data in response
    const populatedTale = await TravelTales.findById(traveltale._id)
        .populate('userId', 'username email');
    return res.status(201).json(
        new ApiResponse(201, traveltale, "Travel tale created successfully")
    );
});
//edit travel tales
const editTravelTale = asyncHandler(async (req, res) => {
    //user exist or not
    //findoneandupdate travel tale where userId:userId
    //if not found throw error
    //return res
    const userId = req.user?._id;
    const { travelTaleId } = req.params;
    const { startDate, endDate, src, dest, numberOfTravels, mood, season, budget,custombudget } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "user not found");
    }
    
    const updatedTale = await TravelTales.findOneAndUpdate(
        { _id: travelTaleId, userId: userId },
        {
            startDate,
            endDate,
            src,
            dest,
            numberOfTravels,
            mood,
            season,
            budget: {
                totalBudget: custombudget !== undefined ? custombudget : budget
            }
        },
        { new: true }
    );
    
    if (!updatedTale) {
        throw new ApiError(404, "Travel tale not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, updatedTale, "Travel tale updated successfully")
    );
});
//delete travel tales
const deleteTravelTale = asyncHandler(async (req, res) => {
    //user exist or not
    //findoneanddelete travel tale where userId:userId
    //if not found throw error
    //return res
    const userId = req.user?._id;
    const { travelTaleId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "user not found");
    }
    
    const deletedTale = await TravelTales.findOneAndDelete({ _id: travelTaleId, userId: userId });
    
    if (!deletedTale) {
        throw new ApiError(404, "Travel tale not found");
    }
    
    return res.status(200).json(
        new ApiResponse(200, deletedTale, "Travel tale successfully deleted")
    );
});

//display travel tales by user
const getTravelTalesByUser = asyncHandler(async (req, res) => {
    //user exist or not
    //find travel tales by userId
    //if not found throw error
    //return res
    const userId = req.user?._id;
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "user not found");
    }
    
    const travelTales = await TravelTales.find({ userId: userId }).populate('userId', 'username email');
    
    if (!travelTales || travelTales.length === 0) {
        throw new ApiError(404, "No travel tales found for this user");
    }
    
    return res.status(200).json(
        new ApiResponse(200, travelTales, "Travel tales retrieved successfully")
    );
});
//display transportation
const gettransportation = asyncHandler(async (req, res) => {
    // Fetch transportation data based on src and dest
    // This is a placeholder function, implement actual API call
    const { src, dest } = req.query;
    
    if (!src || !dest) {
        throw new ApiError(400, "Source and destination are required");
    }
    
    // Simulate fetching transportation data
    const transportationData = {
        src,
        dest,
        options: ["Bus", "Train", "Flight","car","bicycle"],
    };
    
    return res.status(200).json(
        new ApiResponse(200, transportationData, "Transportation data retrieved successfully")
    );
});
// display accomodation
const getaccomodation = asyncHandler(async (req, res) => {
    // Fetch accommodation data based on src and dest
    // This is a placeholder function, implement actual API call
    const { src, dest } = req.query;
    
    if (!src || !dest) {
        throw new ApiError(400, "Source and destination are required");
    }
    
    // Simulate fetching accommodation data
    const accommodationData = {
        src,
        dest,
        options: ["Hotel", "Hostel", "Airbnb","Guest House"],
    };
    
    return res.status(200).json(
        new ApiResponse(200, accommodationData, "Accommodation data retrieved successfully")
    );
}
// display activities
const getactivities = asyncHandler(async (req, res) => {
    // Fetch activities data based on src and dest
    // This is a placeholder function, implement actual API call
    const { src, dest } = req.query;
    
    if (!src || !dest) {
        throw new ApiError(400, "Source and destination are required");
    }
    
    // Simulate fetching activities data
    const activitiesData = {
        src,
        dest,
        options: ["Sightseeing", "Adventure Sports", "Cultural Tours","Shopping"],
    };
    
    return res.status(200).json(
        new ApiResponse(200, activitiesData, "Activities data retrieved successfully")
    );
});
// displayweather
const getweather = asyncHandler(async (req, res) => {
    // Fetch weather data based on location
    // This is a placeholder function, implement actual API call
    const { location } = req.query;
    
    if (!location) {
        throw new ApiError(400, "Location is required");
    }
    
    // Simulate fetching weather data
    const weatherData = {
        location,
        temperature: "25°C",
        condition: "Sunny",
        forecast: "Clear skies with no precipitation expected",
    };
    
    return res.status(200).json(
        new ApiResponse(200, weatherData, "Weather data retrieved successfully")
    );
});
// display currency
const getcurrency = asyncHandler(async (req, res) => {
    // Fetch currency data based on location
    // This is a placeholder function, implement actual API call
    const { location } = req.query;
    
    if (!location) {
        throw new ApiError(400, "Location is required");
    }
    
    // Simulate fetching currency data
    const currencyData = {
        location,
        currency: "USD",
        exchangeRate: "1 USD = 0.85 EUR",
    };
    
    return res.status(200).json(
        new ApiResponse(200, currencyData, "Currency data retrieved successfully")
    );
});

export{
    createTravelTale,
    editTravelTale,
    deleteTravelTale,
    getTravelTalesByUser,
    gettransportation,
    getaccomodation,
    getactivities,
    getweather,
    getcurrency
}