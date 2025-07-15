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
    //inital code
    // const blogs = await Blog.find({}).populate("author", "-_id username email avatar").sort({createdAt: -1});
    
    // if(blogs.length === 0){
    //     console.log("No Blogs Found");
    //     return res.status(200).json(new ApiResponse(200,[],"No blogs found"))
    // }
    
    // return res.status(200).json(new ApiResponse(200, blogs, "Blogs Fetched Successfully!."))


    //implemeting search and pagination
    
    //extract the query params
    const { search="", page=1, limit=5 , tag, author} = req.query;

    // search filter using regex to match the title or content
    //search the word in title  OR  search the word in content
    const searchFilter = {
        $or: [
            { title: { $regex: search, $options: "i"  } },// i -> case insensitive
            { content : { $regex: search, $options: "i" } }
        ]
    }

    //using tags and author
    if(tag) {
        searchFilter.tags = {$in: [tag]} // since tag is array in our schema
        //select documents where the tags array contains the value of the tag variable
    }

    if(author){
        searchFilter.author = author;
    }

    //count the totalDocuments
    const totalBlogs = await Blog.countDocuments(searchFilter)

    //fetch the page
    const blogs = await Blog.find(searchFilter)
    .sort({createdAt: -1})
    .skip((page - 1)*limit)
    .limit(Number(limit))
    .populate("author", "-_id username email avatar")


    if(!blogs){
        throw new ApiError(404, "No Blogs Found");
    }

    res.status(200).json(
        new ApiResponse(200,{
                totalBlogs,
                currentPage: Number(page),
                totalPages: Math.ceil(totalBlogs / limit),
                blogs
            },"Blogs fetched successfully.")
    )
    
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

const updateBlog = asyncHandler( async (req, res)=> {
    const {id} = req.params;
    const {title, content, tags, banner} = req.body;
    //find the blogpost
    const blog = await Blog.findOne({ _id: id });
    
    if(!blog){
        throw new ApiError(404, "Blog Not Found :(");
    }

    //check if the current user is the blogs's author
    if(blog.author.toString() !== req.user._id.toString()){
        throw new ApiError(403, "Not authorized to update the blog");
    }

    //update the fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.banner = banner || blog.banner;

    try {
        await blog.save();
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error (e.g., if new title creates a duplicate slug)
            throw new ApiError(409, "A blog post with this title or slug already exists. Please choose a different title.");
        }
        if (error.name === 'ValidationError') { // Mongoose validation errors
            console.error("Mongoose Validation Error during update:", error.message, error.errors);
            throw new ApiError(400, error.message || "Invalid blog post data provided for update.");
        }
        // For any other unexpected errors during the save process
        console.error("An unexpected error occurred during blog post update:", error);
        throw new ApiError(500, "An unexpected error occurred during blog post update.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            blog,
            "Blog updated Successfully"
        )
    );

})

const deleteBlog = asyncHandler( async (req, res)=>{
    const {id} = req.params;

    const blog = await Blog.findOne({_id: id});

    if(!blog){
        throw new ApiError(404, "Blog Not Found");
    }

    //owner and admin check
    const owner = blog.author.toString() === req.user._id.toString()
    const admin = req.user.role === "admin"

    if(!owner && !admin){
        throw new ApiError(403, "Not Authorized to Delete this Blog.")
    }

    await blog.deleteOne();

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Blog deleted successfully"
        )
    );
})

export {
    createBlogPost, 
    getAllBlogs, 
    getBlogBySlug, 
    updateBlog,
    deleteBlog
};