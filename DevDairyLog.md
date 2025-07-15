# 🛠️ DevLog – Blogging Backend API

This is a step-by-step log of my full-stack backend project to build a secure blogging system using Node.js, Express, MongoDB, Mongoose, and JWT authentication.

---

## ✅ Day 1: Project Setup

- Initialized project using `npm init`
- Installed dependencies: express, mongoose, dotenv, nodemon
- Created clean folder structure: `/controllers`, `/models`, `/routes`, `/middlewares`, `/utils`, `/config`
- Created `index.js` and `app.js` with basic server setup
- Connected MongoDB Atlas cluster via `mongoose.connect()`

---

## ✅ Day 2: User Authentication

- Defined `User` schema with fields: username, email, password, avatar, description
- Added validation and password hashing via `pre('save')` hook
- Created `/api/auth/register` route to register new users
- Built custom `ApiError`, `ApiResponse`, and `asyncHandler` utility files

---

## ✅ Day 3: Login + JWT

- Added `/api/auth/login` route
- Validated user credentials
- Used `bcrypt.compare()` to verify password
- Generated JWT token on successful login
- Sent token + user (without password) in response

---

## ✅ Day 4: JWT Middleware + Protected Routes

- Created `verifyJWT` middleware
- Verified token using `jsonwebtoken.verify()`
- Attached user to `req.user`
- Protected `/api/auth/users` route to be accessed only by authenticated users
- Tested all routes using Postman

---

## ✅ Day 5: Blog Schema + Create & Read APIs

### ✅ What I Completed:

- Created `Blog` schema with fields: title, content, slug, author, tags, banner
- Added pre-save hook to auto-generate slugs using `slugify`
- Built `POST /api/blogs/create` route:
  - Authenticated route to create a blog post
  - Automatically assigns current user as the author
  - Validates required fields (title, content)
- Built `GET /api/blogs/` route:
  - Publicly accessible
  - Returns all blog posts, sorted by latest
  - Populates author info (username, email, avatar)
- Built `GET /api/blogs/:slug` route:
  - Fetches a single blog post by slug
  - Returns 404 if slug is invalid or not found

### 🧪 All tested using Postman:

- Blog creation with token → ✅
- View all blogs without token → ✅
- Fetch specific blog by slug → ✅

> Date: 2025-07-14

---

## ✅ Day 6: Blog Update & Delete APIs

### ✅ What I Completed:

- 🛠 Added `updateBlogPost()` controller:
  - Allows authors to update title, content, tags, banner
  - Protected by `verifyJWT`
  - Checks if `req.user._id === blog.author`
- 🔗 Route: `PUT /api/blogs/:id`

- 🗑 Added `deleteBlogPost()` controller:
  - Allows blog author to delete their own blog
  - Checks ownership before deleting
- 🔗 Route: `DELETE /api/blogs/:id`

- ✅ Tested both using Postman
- 🔒 Verified that only the author can update or delete

> Date: 2025-07-15

-## 📌 U-coming Tasks (Future Days)

### 🔍 Day 7: Filters, Search, and Pagination

### ✅ What I Completed:

- 🔍 **Search Support**:

  - Users can search blog posts by title or content using `?search=query`
  - Uses MongoDB regex for case-insensitive partial match

- 📚 **Pagination Support**:

  - Supports `?page` and `?limit` query parameters
  - Returns total blogs, current page, total pages

- 🔖 **Filtering Support**:

  - Filter blogs by tag: `?tag=nodejs`
  - Filter by author ID: `?author=64f99a...`
  - Combinations work: `?search=api&tag=backend&page=2`

- ✅ Fully tested with Postman for all combinations

### 🔐 Day 8: Role-Based Access Control (RBAC)

### ✅ What I Completed:

- 🧩 Added `role` field to `User` schema:

  - Default is `"user"`
  - Supports `"admin"` for elevated privileges

- 🔐 Created `restrictTo()` middleware:

  - Checks if `req.user.role` is allowed
  - Throws `403` if not

- 🧠 Updated ownership check in `deleteBlogPost()`:

  - Allows deletion if:
    - User is the blog's author OR
    - User has admin role

- 🧪 Fully tested using Postman:
  - User can't delete other's blog
  - Admin can delete any blog
  - Role manually toggled in DB via MongoDB Compass

### 📦 Day 9: Error Handling, Defaults & Cleanup

### ✅ What I Completed:

- 🛑 Added global 404 handler:

  - `app.all('*')` now returns proper not found message for unknown routes

- 🧼 Centralized error middleware:

  - All thrown errors (`ApiError`) now return clean, consistent responses
  - `stack` shown only in development mode

- 📦 Reviewed and cleaned:

  - Consistent HTTP status codes (`200`, `201`, `400`, `401`, `403`, `404`, `500`)
  - Final controller structure and folders (routes, utils, models, middleware)

- 🧪 Final test sweep (Postman):
  - Auth, register, login
  - JWT verification
  - Create, read, update, delete blog
  - Role-based delete control
  - Pagination, search, filtering
  - 404 + internal server errors

---

## 🎉 Project Status: **MVP Complete ✅**

### 👨‍💻 Backend Features:

- Express.js REST API
- MongoDB with Mongoose ODM
- JWT-based authentication
- Middleware-driven access control
- Role-based permissions (user/admin)
- Blog creation, reading, updating, deletion
- Tag/author filters, search, and pagination
- Error handling, 404 fallback
- Clean structure with modular files

> Date: 2025-07-15

## 📚 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for auth
- Postman for testing

---

> Logged by: Rayyan Ahmed  
> Started: 2025-07-10
