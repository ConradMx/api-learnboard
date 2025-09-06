 import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();



 
const app = express();

const PORT = process.env.PORT || 5001;



// Middleware to parse JSON request bodies



app.use(
    cors({
    origin: "http://localhost:5173"
})
);
app.use (express.json()); // this middleeware will parse JSON bodies: req.body
app.use(rateLimiter);
// Custom middleware to log request method and URL

// app.use((req, res, next) => {
//    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//    next();
// });







app.use("/api/notes", noteRoutes);

// Connect to the database and start the server
connectDB().then(() =>{
app.listen(PORT, ()  => {
    console.log ("server started on PORT:", PORT);
}); 
});

