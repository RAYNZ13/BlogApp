import express from 'express';
import { createBlogPost, deleteBlog, getAllBlogs, getBlogBySlug, updateBlog } from '../controller/blog.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/createBlog").post(verifyJWT, createBlogPost);
router.route("/getAllBlogs").get(getAllBlogs)
router.route("/:slug").get(getBlogBySlug);
router.route("/:id").put(verifyJWT, updateBlog);
router.route("/:id").delete(verifyJWT, deleteBlog);

export default router;