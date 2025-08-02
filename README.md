# 📝 BlogApp Backend API

A robust, secure, and scalable blogging platform backend built with **Node.js**, **Express**, and **MongoDB**. It features user authentication, role-based access control, blog management (CRUD), advanced querying (search, filters, pagination), and a modular code structure ready for production.

---

## 🚀 Features

### ✅ Authentication & Authorization
- User registration & login with hashed passwords
- JWT-based auth and middleware
- Role-based access (`user`, `admin`)
- Secure route protection

### ✅ Blog Management
- Create, Read, Update, Delete (CRUD) for blogs
- Slug-based blog URLs
- Only authors or admins can modify/delete

### ✅ Advanced Query Support
- Full-text search on title & content
- Filter blogs by tags and author
- Pagination and sorting support

### ✅ Developer Experience
- Clean folder structure (MVC)
- Custom error & response handling
- Global error middleware
- Environment-based configurations

---

## 📁 Project Structure

```
BlogApp/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
└── index.js
```

---

## 📚 Tech Stack

- **Node.js** – runtime environment
- **Express.js** – web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – authentication
- **Postman** – API testing

---

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/RAYNZ13/BlogApp.git
cd BlogApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=your_port_no
MONGODB_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 4. Start the server
```bash
npm run dev   # for development
```

---

## 🛠️ API Endpoints

### 🔐 Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### 📘 Blog Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/blogs/` | Get all blogs (public) |
| GET | `/api/blogs/:slug` | Get a single blog by slug |
| POST | `/api/blogs/create` | Create a new blog (auth required) |
| PUT | `/api/blogs/:id` | Update a blog (author or admin only) |
| DELETE | `/api/blogs/:id` | Delete a blog (author or admin only) |

### 🔍 Query Parameters
- `?search=keyword`
- `?tag=nodejs`
- `?author=userid`
- `?page=1&limit=10`

---

## 🔒 Role-Based Access

| Role | Capabilities |
|------|--------------|
| `user` | Create, update, delete own blogs |
| `admin` | Delete any blog, elevated privileges |

---

## 🧪 Testing Checklist

- ✅ Register / Login
- ✅ Create / Read / Update / Delete Blogs
- ✅ JWT token verification
- ✅ Admin privileges
- ✅ Query filters (search, tags, pagination)
- ✅ Error responses & status codes

---

## 👨‍💻 Author

**Rayyan Ahmed**  
🚀 Building real-world apps step by step  
📅 Started: July 10, 2025

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
