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

## 📌 Upcoming Tasks (Future Days)

### 🔄 Day 6: Blog Update & Delete APIs

- PUT `/api/blogs/:id` – only by the blog's author
- DELETE `/api/blogs/:id` – only by author or admin
- Ownership check via `req.user._id === blog.author`

### 🔍 Day 7: Filters, Search, Pagination (Optional Enhancements)

- Filter by tag, author, or keyword
- Search in title/content
- Paginate blogs (`?page=1&limit=10`)

### 🔐 Day 8: Role-Based Access Control (RBAC)

- Add roles in `User` schema (`user`, `admin`)
- Only admin can delete any post
- Add `restrictTo()` middleware

### 🧪 Day 9: Testing, Error Handling, Final Cleanup

- Improve error messages
- Add default catch route (404 not found)
- Final test sweep via Postman

---

## 📚 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for auth
- Postman for testing

---

> Logged by: Rayyan Ahmed  
> Started: 2025-07-10
