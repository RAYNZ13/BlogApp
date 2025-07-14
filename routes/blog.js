import express from 'express';
import { createBlogPost, getAllBlogs, getBlogBySlug } from '../controller/blog.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/createBlog").post(verifyJWT, createBlogPost);
router.route("/getAllBlogs").get(getAllBlogs)
router.route("/:slug").get(getBlogBySlug);

export default router;