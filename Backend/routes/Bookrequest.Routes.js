import { Router } from "express";
import {
    createBookRequest,
    getBookRequestDetails,
    submitBookRequest,
    updateContactDetails,
    verifyPhoneNumber,
    verifyEmailId,
    sendPhoneOTP,
    sendEmailVerification,
    getUserBookRequests
} from "../controllers/BookRequest.contoller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"; // Assuming you have authentication middleware

const bookrequestrouter = Router();

// Apply authentication middleware to all routes
bookrequestrouter.use(verifyJWT);

// POST /api/book-requests - Create new book request
bookrequestrouter.route("/").post(createBookRequest);

// GET /api/book-requests - Get user's book requests with pagination and filtering
bookrequestrouter.route("/").get(getUserBookRequests);

// GET /api/book-requests/:requestId - Get specific book request details
bookrequestrouter.route("/:requestId").get(getBookRequestDetails);

// PUT /api/book-requests/:requestId/submit - Submit book request for review
bookrequestrouter.route("/:requestId/submit").put(submitBookRequest);

// PUT /api/book-requests/:requestId/contact - Update contact details
bookrequestrouter.route("/:requestId/contact").put(updateContactDetails);

// Verification routes
// POST /api/book-requests/verify/send-phone-otp - Send OTP to phone
bookrequestrouter.route("/verify/send-phone-otp").post(sendPhoneOTP);

// POST /api/book-requests/verify/phone - Verify phone number with OTP
bookrequestrouter.route("/verify/phone").post(verifyPhoneNumber);

// POST /api/book-requests/verify/send-email - Send email verification
bookrequestrouter.route("/verify/send-email").post(sendEmailVerification);

// POST /api/book-requests/verify/email - Verify email with token
bookrequestrouter.route("/verify/email").post(verifyEmailId);

export default bookrequestrouter;