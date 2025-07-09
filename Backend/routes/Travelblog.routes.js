import { Router } from "express";
import {
    Createblog,
    Deleteblog,
    Updateblog,
    Getblog,
    Shareblogtopost
} from "../controllers/TravelBlog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const travelblogrouter = Router();

// All routes require authentication
travelblogrouter.use(verifyJWT);

// Blog CRUD operations
travelblogrouter.route("/create").post(Createblog);
travelblogrouter.route("/:blogId").get(Getblog);
travelblogrouter.route("/:blogId").put(Updateblog);
travelblogrouter.route("/:blogId").delete(Deleteblog);

// Share blog to social feed
travelblogrouter.route("/:blogId/share").post(Shareblogtopost);

export default travelblogrouter;