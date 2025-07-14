import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace from both ends of a string
        minlength: [3, 'Username must be at least 3 characters long.'] 
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']

    },
    password: {
        type: String,
        required: [true, 'Passwprd is required'],
        minlength: [6, 'Password must be at least 6 characters long.'],
        select: false
    },
    description:{
        type: String,
        required: false,
        maxlength: [500, 'Description cannot exceed 500 characters.']
    },
    avatar:{
        type: String,
        required: false,
        default: 'https://example.com/default-avatar.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

},{
    timestamps: true
})


// PRE-SAVE HOOK FOR PASSWORD HASHING
userSchema.pre('save', async function(next) {
    // only hash if the password is new or modified
    if(!this.isModified('password')){
        return next();
    }
    try {
        //generate salt
        const salt = await bcrypt.genSalt(10)

        //combine salt with password and hash it
        this.password = await bcrypt.hash(this.password, salt);

        console.log(`Hashed Password : ${this.password}`);

    } catch (error) {
        next(error);
    }
})

//create a method to check if the encrypted password and the user's password are same
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


export const User = new mongoose.model('User', userSchema);