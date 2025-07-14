import { User } from "../models/user_model.js";
import asyncHandler from "../utils/aysncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerUSer = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;

    //check all fields are there
    if([username, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are Required")
    }

    //existing user check
    const existingUser = await User.findOne({
        $or: [{username}, {email}] //check based on these params
        //The $or operator allows you to combine multiple query conditions within a single query, returning documents that satisfy at least one of those conditions. 
    })

    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    try{
        const user = await User.create({
            username: username.toLowerCase(),
            email: email,
            password: password,
        });

        const createdUser = await User.findById(user._id).select("-password");

        if(!createdUser){
            throw new ApiError(500, "Something wen wrong")
        }

        res.status(201).json(new ApiResponse(200, createdUser, "User registed successfully"))
    }catch(error){
        console.log("user creation error: ",error);
        throw new ApiError(500, "something went wrong while registering the user");
    }

})

const getAllUsers = asyncHandler( async(req, res) => {
    const users = await User.find().select('-password');

    res.status(200).json( new ApiResponse(200, users, "Users fetched Successfully;"));
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    //check all fields are there
    if([email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are Required")
    }

    //validate
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new ApiError(401,"Invalid email or password")
    }

    //compare the password using the in-built isPasswordCorrect method that you created in the userSchema
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid email or password")
    }

    const token = jwt.sign(
        {_id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )

    const userResponseData = user.toObject();
    delete userResponseData.password;
    
    res.status(200).json( new 
        ApiResponse(
            200,
            {
                user: userResponseData,
                token,
            },
            "User Logged in successfully"
        ))
})

export { registerUSer, getAllUsers, loginUser};