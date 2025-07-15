import express from 'express'


const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static('public'))

//import routes
import userRouter from "./routes/auth.js"
import blogRouter from "./routes/blog.js"



app.use('/api/v1/users',userRouter)
app.use('/api/v1/blogs',blogRouter);



//error handling middleware
app.all("*", (req, res, next)=>{
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    })
})

app.use(err, req, res, next) => {
    console.error(err) // fro debugging

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Something Went Wrong",
        stack: process.env.NODE_ENV === "development" ? err.stack: undefined;
    })
}


export {app};