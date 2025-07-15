import { ApiError } from "../utils/apiError";

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            throw new ApiError(403, "You dont have permission to perform this action.");
        }
        next();
    }
}