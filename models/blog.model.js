import { request } from "express";
import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,

    },
    slug: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: [String],
        default: [],
        required: false
    },
    banner: {
        type: String,
        required: false,
        default:'https://example.com/default-banner.png'
    }
},{
    timestamps: true,
})

blogSchema.pre('save', function(next) {
    console.log("--- Pre-save hook started ---");
    console.log("Current document title:", this.title);
    console.log("Is title modified?", this.isModified('title'));
    console.log("Is new document?", this.isNew);

    // Only generate slug if the title is modified or if it's a new document
    if (this.isModified('title') || this.isNew) {
        if (this.title) { // Ensure title exists before slugifying
            this.slug = slugify(this.title, { lower: true, strict: true });
            console.log("Generated slug:", this.slug);
        } else {
            console.log("Title is missing, cannot generate slug.");
            // Optionally, you could throw an error here if title is expected to always be present
            // next(new Error("Title is required for slug generation"));
        }
    } else {
        console.log("Title not modified and not a new document, skipping slug generation.");
    }
    console.log("Slug value before next():", this.slug);
    console.log("--- Pre-save hook finished ---");
    next(); // IMPORTANT: Call next() to proceed with the save operation
});

// blogSchema.pre('save',function(next){
//     if(this.isModified('title') || this.isNew){
//         this.slug = slugify(this.title, {
//             lower: true,
//             strict: true
//         });
//     }
//     next();
// })

export const Blog = new mongoose.model('Blog', blogSchema);
console.log("Blog model definition complete and exported."); // Add this log
