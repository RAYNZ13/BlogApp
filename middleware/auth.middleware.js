import asyncHandler from "../utils/aysncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user_model.js";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(async (req, res, next)=>{
    try {
            //Check if the Authorization header exists and starts with Bearer
            const token = req.header("Authorization")?.replace("Bearer ","");
        
            if(!token){
                throw new ApiError(401, "Unauthorized Access");
            }
            
        
            //verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
            //find the user
            const user = await User.findById(decodedToken?._id).select("-password");
        
            if(!user){
                throw new ApiError(401, "Invalid Access: User not found");
            }
        
            //attach the user object to the request
            req.user = user
        
            //pass the control to the next middleware
            next()
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            throw new ApiError(401, "Unauthorized request: Token expired");
        }else if(error instanceof jwt.JsonWebTokenError){
            throw new ApiError(401, "Unauthorized request: Invalid Token");
        }else if(error instanceof ApiError){
            throw error;
        }else{
            console.error("Error in verifyJWT middleware: ",error);
            throw new ApiError(500, "Internal server error during authentication")
        }
    }
})


export { verifyJWT }