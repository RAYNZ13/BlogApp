import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/aysncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Blog } from "../models/blog.model.js";


const createBlogPost = asyncHandler( async (req, res) => {
    const { title, content, tags, banner } = req.body;

    //2. Validate required fields
    if([title, content].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required");
    }
    
    if(!req.user?.id && !req.user?._id){
        throw new ApiError(401, "User not authenticated");
    }
    console.log("Authenticated User ID:", req.user._id);

    // --- ADD THIS LINE FOR DEBUGGING ---
    console.log("Blog model imported:", Blog);
    try {
        const blog = await Blog.create({
            title,
            content,
            tags,
            author: req.user._id,
            banner,
        });

        if(!blog){
            throw new ApiError(500,"Failed to create a blog Post, Please try again.")
        }

        res.status(201).json(
            new ApiResponse(
                201,
                blog,
                "Blog created Successfully!"
            )
        );
    } catch (error) {
        console.error("Error creating blog post: ",error);
        if (error.code === 11000) { // MongoDB duplicate key error (e.g., for unique title or slug)
            throw new ApiError(409, "A blog post with this title or slug already exists. Please choose a different title.");
        }
        if (error.name === 'ValidationError') { // Mongoose validation errors (e.g., if a required field was somehow missed)
            // You can parse `error.errors` for more detailed validation messages if needed
            console.error("Mongoose Validation Error:", error.message, error.errors); // Log detailed validation errors
            throw new ApiError(400, error.message || "Invalid blog post data provided.");
        }
        // For any other unexpected errors during the creation process
        console.error("An unexpected error occurred during blog post creation:", error); // Log the actual error for debugging
        throw new ApiError(500, "An unexpected error occurred during blog post creation.");

    }
})

const getAllBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find({}).populate("author", "-_id username email avatar").sort({createdAt: -1});

    if(blogs.length === 0){
        console.log("No Blogs Found");
        return res.status(200).json(new ApiResponse(200,[],"No blogs found"))
    }

    return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetched Successfully!."))
})

const getBlogBySlug = asyncHandler( async (req, res) => {
    const {slug} = req.params;

    const blogPost = await Blog.findOne({slug}).populate("author", "-_id username email avatar")

    if(!blogPost){
        throw new ApiError(401, "Blog not found")
    }else{
        return res.status(200).json(
            new ApiResponse(
                200,
                blogPost,
                `Blog post "${slug}" fetched successfully!`
            )
        )
    }
})

export {createBlogPost, getAllBlogs, getBlogBySlug};