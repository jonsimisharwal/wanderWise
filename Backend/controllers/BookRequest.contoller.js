import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";
import { BookRequest } from "../models/bookrequest.model.js";
import { User } from "../models/user.model.js";
import { Place } from "../models/places.model.js";
import { Tripplan } from "../models/Plantrip.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import twilio from "twilio";

// Initialize Twilio client (you'll need to set these in your environment variables)
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map();

// Create book request
const createBookRequest = asyncHandler(async (req, res) => {
    const { tripplanId, placeId, totalbudget, requesteddate, phone, email } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!tripplanId || !placeId || !totalbudget || !requesteddate || !phone || !email) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Check if place exists
    const place = await Place.findById(placeId);
    if (!place) {
        throw new ApiError(404, "Place not found");
    }

    // Check if trip plan exists
    const tripplan = await Tripplan.findById(tripplanId);
    if (!tripplan) {
        throw new ApiError(404, "Trip plan not found");
    }

    // Validate requested date is in future
    const requestDate = new Date(requesteddate);
    if (requestDate <= new Date()) {
        throw new ApiError(400, "Requested date must be in the future");
    }

    // Create book request
    const bookRequest = await BookRequest.create({
        userId,
        tripplanId,
        placeId,
        totalbudget,
        requesteddate: requestDate,
        contactinfo: {
            phone,
            email
        }
    });

    // Populate the created book request with related data
    const populatedBookRequest = await BookRequest.findById(bookRequest._id)
        .populate('userId', 'name email')
        .populate('placeId', 'name country city budget')
        .populate('tripplanId', 'title duration');

    return res.status(201).json(
        new ApiResponse(201, populatedBookRequest, "Book request created successfully")
    );
});

// Get book request details
const getBookRequestDetails = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const userId = req.user._id;

    if (!requestId) {
        throw new ApiError(400, "Request ID is required");
    }

    const bookRequest = await BookRequest.findOne({
        _id: requestId,
        userId: userId
    })
    .populate('userId', 'name email')
    .populate('placeId', 'name country city budget category images')
    .populate('tripplanId', 'title duration activities accommodation transportation flights');

    if (!bookRequest) {
        throw new ApiError(404, "Book request not found");
    }

    // Prepare detailed response
    const details = {
        bookingId: bookRequest._id,
        totalBudget: bookRequest.totalbudget,
        requestedDate: bookRequest.requesteddate,
        status: bookRequest.status,
        user: {
            name: bookRequest.userId.name,
            email: bookRequest.userId.email,
            phone: bookRequest.contactinfo.phone,
            contactEmail: bookRequest.contactinfo.email
        },
        place: bookRequest.placeId,
        tripPlan: bookRequest.tripplanId,
        createdAt: bookRequest.createdAt,
        updatedAt: bookRequest.updatedAt
    };

    return res.status(200).json(
        new ApiResponse(200, details, "Book request details fetched successfully")
    );
});

// Submit book request (change status to reviewing)
const submitBookRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const userId = req.user._id;

    const bookRequest = await BookRequest.findOne({
        _id: requestId,
        userId: userId
    });

    if (!bookRequest) {
        throw new ApiError(404, "Book request not found");
    }

    if (bookRequest.status !== 'pending') {
        throw new ApiError(400, "Book request can only be submitted when status is pending");
    }

    // Update status to reviewing
    bookRequest.status = 'reviewing';
    await bookRequest.save();

    // Send confirmation email
    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: bookRequest.contactinfo.email,
            subject: 'Booking Request Submitted Successfully',
            html: `
                <h2>Booking Request Submitted</h2>
                <p>Dear Customer,</p>
                <p>Your booking request has been submitted successfully and is now under review.</p>
                <p><strong>Booking ID:</strong> ${bookRequest._id}</p>
                <p><strong>Status:</strong> ${bookRequest.status}</p>
                <p>We will contact you soon with further details.</p>
                <p>Thank you for choosing our service!</p>
            `
        });
    } catch (error) {
        console.error('Email sending failed:', error);
        // Don't throw error, just log it
    }

    return res.status(200).json(
        new ApiResponse(200, { status: bookRequest.status }, "Book request submitted successfully")
    );
});

// Update contact details
const updateContactDetails = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    const { phone, email } = req.body;
    const userId = req.user._id;

    if (!phone && !email) {
        throw new ApiError(400, "At least one contact detail (phone or email) is required");
    }

    const bookRequest = await BookRequest.findOne({
        _id: requestId,
        userId: userId
    });

    if (!bookRequest) {
        throw new ApiError(404, "Book request not found");
    }

    // Update contact info
    if (phone) {
        bookRequest.contactinfo.phone = phone;
    }
    if (email) {
        bookRequest.contactinfo.email = email;
    }

    await bookRequest.save();

    return res.status(200).json(
        new ApiResponse(200, {
            phone: bookRequest.contactinfo.phone,
            email: bookRequest.contactinfo.email
        }, "Contact details updated successfully")
    );
});

// Send phone OTP
const sendPhoneOTP = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        throw new ApiError(400, "Phone number is required");
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with expiration (5 minutes)
    otpStore.set(phone, {
        otp,
        expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    try {
        // Send OTP via Twilio
        await twilioClient.messages.create({
            body: `Your verification code is: ${otp}. Valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        return res.status(200).json(
            new ApiResponse(200, { message: "OTP sent successfully" }, "OTP sent to phone number")
        );
    } catch (error) {
        console.error('SMS sending failed:', error);
        throw new ApiError(500, "Failed to send OTP");
    }
});

// Verify phone number
const verifyPhoneNumber = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        throw new ApiError(400, "Phone number and OTP are required");
    }

    const storedOtpData = otpStore.get(phone);

    if (!storedOtpData) {
        throw new ApiError(400, "OTP not found or expired");
    }

    if (Date.now() > storedOtpData.expires) {
        otpStore.delete(phone);
        throw new ApiError(400, "OTP has expired");
    }

    if (storedOtpData.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    // Remove OTP from store
    otpStore.delete(phone);

    return res.status(200).json(
        new ApiResponse(200, { verified: true }, "Phone number verified successfully")
    );
});

// Send email verification
const sendEmailVerification = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Store token with expiration (1 hour)
    otpStore.set(email, {
        token: verificationToken,
        expires: Date.now() + 60 * 60 * 1000 // 1 hour
    });

    try {
        // Send verification email
        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `
                <h2>Email Verification</h2>
                <p>Please click the link below to verify your email address:</p>
                <a href="${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}">
                    Verify Email
                </a>
                <p>This link will expire in 1 hour.</p>
            `
        });

        return res.status(200).json(
            new ApiResponse(200, { message: "Verification email sent" }, "Verification email sent successfully")
        );
    } catch (error) {
        console.error('Email sending failed:', error);
        throw new ApiError(500, "Failed to send verification email");
    }
});

// Verify email ID
const verifyEmailId = asyncHandler(async (req, res) => {
    const { email, token } = req.body;

    if (!email || !token) {
        throw new ApiError(400, "Email and verification token are required");
    }

    const storedTokenData = otpStore.get(email);

    if (!storedTokenData) {
        throw new ApiError(400, "Verification token not found or expired");
    }

    if (Date.now() > storedTokenData.expires) {
        otpStore.delete(email);
        throw new ApiError(400, "Verification token has expired");
    }

    if (storedTokenData.token !== token) {
        throw new ApiError(400, "Invalid verification token");
    }

    // Remove token from store
    otpStore.delete(email);

    return res.status(200).json(
        new ApiResponse(200, { verified: true }, "Email verified successfully")
    );
});

// Get user book requests
const getUserBookRequests = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    // Build filter
    const filter = { userId };
    if (status) {
        filter.status = status;
    }

    const bookRequests = await BookRequest.find(filter)
        .populate('placeId', 'name country city budget')
        .populate('tripplanId', 'title duration')
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

    const totalRequests = await BookRequest.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(200, {
            bookRequests,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalRequests / parseInt(limit)),
                totalRequests,
                hasNext: parseInt(page) < Math.ceil(totalRequests / parseInt(limit)),
                hasPrev: parseInt(page) > 1
            }
        }, "User book requests fetched successfully")
    );
});

export {
    createBookRequest,
    getBookRequestDetails,
    submitBookRequest,
    updateContactDetails,
    verifyPhoneNumber,
    verifyEmailId,
    sendPhoneOTP,
    sendEmailVerification,
    getUserBookRequests
};