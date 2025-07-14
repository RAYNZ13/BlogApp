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

## 📌 Next Up (Day 5): Blog CRUD

- Create `Blog` model
- Implement:
  - POST `/api/blogs/create` – Create blog
  - GET `/api/blogs/` – List all blogs
  - GET `/api/blogs/:slug` – Get one blog
  - PUT `/api/blogs/:id` – Update (auth only)
  - DELETE `/api/blogs/:id` – Delete (auth only)
- Add ownership checks & slugify titles

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
