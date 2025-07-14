import express from 'express'


const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'))

//import routes
import userRouter from "./routes/auth.js"

app.use('/api/v1/users',userRouter)




//error handling middleware
app.use((err, req, res, next) => {
    console.log("Caught by global error handling: ",err);
    console.log("Error Stack: ",err.stack);


    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors || []; // If your ApiError has an 'errors' array

    // Send a JSON response to the client
    res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors,
        // In production, you might not want to send the stack trace to the client
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
})

export {app};