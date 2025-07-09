import { Router } from "express";
import {
    createPlace,
    getAllPlaces,
    getPlaceBySearch,
    getPlaceByFilters,
    getPlaceByCustomizedBudget,
    getPlaceByUser
} from "../controllers/Place.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const placerouter = Router();

// Public routes (no authentication required)
placerouter.route("/").get(getAllPlaces);
placerouter.route("/search").get(getPlaceBySearch);
placerouter.route("/filter").get(getPlaceByFilters);
placerouter.route("/budget").get(getPlaceByCustomizedBudget);

// Protected routes (authentication required)
placerouter.route("/create").post(verifyJWT, createPlace);
placerouter.route("/user").get(verifyJWT, getPlaceByUser);

export default placerouter;