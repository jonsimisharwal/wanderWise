import { Router } from "express";
import { 
    registerUser, 
    login, 
    logout, 
    changeCurrentPassword,
    getCurrentUser,
    updateUserProfile,
    getUserStats,
    getUserAchievements,
    addAchievement,
    updateUserStats,
    refreshAccessToken,
    getUserByUsername,
    uploadAvatar,
    uploadCoverImage,
    // Admin functions
    getAllUsers,
    deleteUser,
    updateUserAdminStatus,
    getAdminAnalytics,
    checkAdminStatus
} from "../controllers/User.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const userrouter = Router();

// Public routes (no authentication required)
userrouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

userrouter.route("/login").post(login);
userrouter.route("/refresh-token").post(refreshAccessToken);

// Public route to get user profile by username (for viewing other users)
userrouter.route("/profile/:username").get(getUserByUsername);

// Protected routes (authentication required)
userrouter.route("/logout").post(verifyJWT, logout);
userrouter.route("/change-password").post(verifyJWT, changeCurrentPassword);

// Current user routes
userrouter.route("/current-user").get(verifyJWT, getCurrentUser);
userrouter.route("/update-profile").patch(verifyJWT, updateUserProfile);
userrouter.route("/check-admin").get(verifyJWT, checkAdminStatus);

// User stats and achievements routes
userrouter.route("/stats").get(verifyJWT, getUserStats);
userrouter.route("/stats/update").patch(verifyJWT, updateUserStats);
userrouter.route("/achievements").get(verifyJWT, getUserAchievements);
userrouter.route("/achievements/add").post(verifyJWT, addAchievement);

// Avatar and cover image upload routes
userrouter.route("/avatar").patch(
    verifyJWT, 
    upload.single("avatar"), 
    uploadAvatar
);

userrouter.route("/cover-image").patch(
    verifyJWT, 
    upload.single("coverImage"), 
    uploadCoverImage
);

// ADMIN ROUTES (Admin access required)
userrouter.route("/admin/users").get(verifyAdmin, getAllUsers);
userrouter.route("/admin/analytics").get(verifyAdmin, getAdminAnalytics);
userrouter.route("/admin/users/:userId").delete(verifyAdmin, deleteUser);
userrouter.route("/admin/users/:userId/admin-status").patch(verifyAdmin, updateUserAdminStatus);

export default userrouter;