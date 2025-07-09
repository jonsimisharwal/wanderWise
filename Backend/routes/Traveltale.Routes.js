import { Router } from "express";
import {
    createTravelTale,
    editTravelTale,
    deleteTravelTale,
    getTravelTalesByUser,
    gettransportation,
    getaccomodation,
    getactivities,
    getweather,
    getcurrency
} from "../controllers/TravelTale.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const traveltalerouter = Router();

// Travel Tales CRUD operations (protected routes)
traveltalerouter.route("/create").post(verifyJWT, createTravelTale);
traveltalerouter.route("/:travelTaleId").put(verifyJWT, editTravelTale);
traveltalerouter.route("/:travelTaleId").delete(verifyJWT, deleteTravelTale);
traveltalerouter.route("/user").get(verifyJWT, getTravelTalesByUser);

// Travel planning utilities (public routes)
traveltalerouter.route("/transportation").get(gettransportation);
traveltalerouter.route("/accommodation").get(getaccomodation);
traveltalerouter.route("/activities").get(getactivities);
traveltalerouter.route("/weather").get(getweather);
traveltalerouter.route("/currency").get(getcurrency);

export default traveltalerouter;