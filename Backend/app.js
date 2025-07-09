import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
})
const app = express()

const PORT= process.env.PORT || 8000;
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Backend URL: http://localhost:${PORT}`);
});
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

//routes-import 
import wishlistRouter from './routes/Wishlist.Routes.js';
import feedbackrouter from "./routes/Feedback.Routes.js";
import placerouter from "./routes/Place.Routes.js";
import bookrequestrouter from "./routes/Bookrequest.Routes.js";
import postrouter from "./routes/Post.Routes.js";
import travelblogrouter from "./routes/Travelblog.routes.js";
import traveltalerouter from "./routes/Traveltale.Routes.js";
import userrouter from "./routes/User.Routes.js";
import tripplanrouter from "./routes/Tripplan.Routes.js";

//routes-decelaration
app.use('/api/wishlist', wishlistRouter);
app.use('/api/tripplanner', tripplanrouter);
app.use('/api/feedback', feedbackrouter);
app.use('/api/FindPlaces', placerouter);
app.use('/api/posts', postrouter);
app.use('/api/TravelBlogs', travelblogrouter);
app.use('/api/users', userrouter);
app.use('/api/TravelTales', traveltalerouter);
app.use('/api/bookrequest', bookrequestrouter);



export { app }