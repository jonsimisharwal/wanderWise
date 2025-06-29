import { Router } from "express";
import { 
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
} from "../controllers/Tripplan.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const tripplanrouter = Router();

// Public routes (no authentication required)
tripplanrouter.route("/place/:placeId").get(getPlaceForTripPlanning);
tripplanrouter.route("/place/:placeId/plans").get(getTripPlansForPlace);
tripplanrouter.route("/place/:placeId/stats").get(getTripPlanStats);
tripplanrouter.route("/shared/:shareCode").get(getTripPlanByShareCode);

// Protected routes (authentication required)
tripplanrouter.use(verifyJWT); // Apply JWT verification to all routes below

// Trip plan CRUD operations
tripplanrouter.route("/place/:placeId/create").post(createTripPlanFromPage);
tripplanrouter.route("/:tripPlanId").get(getTripPlanById);
tripplanrouter.route("/:tripPlanId").patch(updateTripPlanFromPage);
tripplanrouter.route("/:tripPlanId").delete(deleteTripPlan);

// User's trip plans
tripplanrouter.route("/user/plans").get(getUserTripPlans);

// Trip plan status and visibility management
tripplanrouter.route("/:tripPlanId/status").patch(updateTripPlanStatus);
tripplanrouter.route("/:tripPlanId/visibility").patch(toggleTripPlanVisibility);

export default tripplanrouter;