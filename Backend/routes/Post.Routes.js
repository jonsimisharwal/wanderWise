import { Router } from "express";
import {
    getAllPosts,
    getPostById,
    getUserPosts,
    toggleLikePost,
    addComment,
    sharePost,
    getPostsByFilter,
    getAllPublishedPostsAdmin
} from "../controllers/Post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const postrouter = Router();

// Public routes (no authentication required)
postrouter.route("/").get(getAllPosts);
postrouter.route("/:postId").get(getPostById);
postrouter.route("/user/:userId").get(getUserPosts);
postrouter.route("/filter/:filter").get(getPostsByFilter);

// Protected routes (authentication required)
postrouter.route("/:postId/like").post(verifyJWT, toggleLikePost);
postrouter.route("/:postId/comment").post(verifyJWT, addComment);
postrouter.route("/:postId/share").post(verifyJWT, sharePost);

// Admin routes (authentication + admin role required)
postrouter.route("/admin/published").get(verifyJWT, getAllPublishedPostsAdmin);

export default postrouter;