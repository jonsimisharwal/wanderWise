import { Router } from "express";
import { 
    addwishlist, 
    removewishlist, 
    getwishlist 
} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"; // Assuming you have auth middleware

const wishlistrouter = Router();

wishlistrouter.route("/add").post(verifyJWT, addwishlist);

// Remove place from wishlist
// DELETE /api/v1/wishlist/remove/:placeId
wishlistrouter.route("/remove/:placeId").delete(verifyJWT, removewishlist);

// Get user's wishlist
// GET /api/v1/wishlist
wishlistrouter.route("/").get(verifyJWT, getwishlist);

// Alternative routes (if you prefer different URL patterns)

// GET /api/v1/wishlist/user/:userId (if you want to get wishlist by userId in params)
// router.route("/user/:userId").get(getwishlist);

// POST /api/v1/wishlist (alternative to /add)
// router.route("/").post(verifyJWT, addwishlist);

// DELETE /api/v1/wishlist/:placeId (alternative to /remove/:placeId)
// router.route("/:placeId").delete(verifyJWT, removewishlist);

export default wishlistrouter;