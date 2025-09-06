 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();



 
const app = express();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


// Middleware to parse JSON request bodies

if(process.env.NODE_ENV !== "production") {

app.use(
    cors({
    origin: "http://localhost:5173"
})
);

}


app.use (express.json()); // this middleeware will parse JSON bodies: req.body
app.use(rateLimiter);
// Custom middleware to log request method and URL

// app.use((req, res, next) => {
//    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//    next();
// });







app.use("/api/notes", noteRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../fontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../fontend", "dist", "index.html"));
});
}

// Connect to the database and start the server
connectDB().then(() =>{
app.listen(PORT, ()  => {
    console.log ("server started on PORT:", PORT);
}); 
});

