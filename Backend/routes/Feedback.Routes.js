import { Router } from "express";
import {
    Displayfeedback,
    createfeedback,
    editfeedback,
    deletefeedback,
    getuserfeedback
} from "../controllers/Feedback.controller.js";

const feedbackrouter = Router();

// GET /api/feedback - Display all feedback
feedbackrouter.route("/").get(Displayfeedback);

// POST /api/feedback - Create new feedback
feedbackrouter.route("/").post(createfeedback);

// PUT /api/feedback/:feedbackId - Edit specific feedback
feedbackrouter.route("/:feedbackId").put(editfeedback);

// DELETE /api/feedback/:feedbackId - Delete specific feedback
feedbackrouter.route("/:feedbackId").delete(deletefeedback);

// GET /api/feedback/user/:userId - Get feedback by specific user
feedbackrouter.route("/user/:userId").get(getuserfeedback);

export default feedbackrouter;