# 🚀 Fullstack User Management System

A full-stack User Management System built using **React (Vite), Node.js, Express, and MongoDB Atlas**.

This application allows users to perform full CRUD operations, search users, manage user status (Active/Inactive), and view dashboard statistics.

---

## 🛠 Tech Stack

### 🔹 Frontend
- React (Vite)
- Axios
- Tailwind CSS
- React Hot Toast

### 🔹 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- MVC Architecture
- dotenv
- CORS

---

## ✨ Features

### ✅ Core Features
- Create new users
- View all users
- Update users
- Delete users

### 🔍 Search Functionality
- Search users by name or email
- Case-insensitive search
- Shows "User not found" when no results

### 🔄 Status Management
- Each user has a status (Active / Inactive)
- Toggle status dynamically
- Active and Inactive users displayed separately

### 📊 Dashboard Statistics
- Total Users count
- Active Users count
- Inactive Users count

### 🎨 Modern UI
- Responsive design using Tailwind CSS
- Toast notifications for actions
- Loading indicators
- Clean dashboard layout

---

## 🏗 Project Architecture


project-root/
│
├── server.js
├── package.json
├── .env.example
│
├── src/
│ ├── config/
│ ├── models/
│ ├── controllers/
│ └── routes/
│
└── client/
├── src/
├── package.json
└── tailwind.config.js



### Backend Architecture
- MVC Pattern
- Routes → Controllers → Models
- REST API structure

### Frontend Architecture
- Component-based structure
- State management using useState
- API communication using Axios

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/users | Get all users |
| GET | /api/users?search=keyword | Search users |
| POST | /api/users | Create user |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |
| PATCH | /api/users/:id/toggle | Toggle user status |

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

git clone https://github.com/ramklk/user-management-system-mern.git

cd user-management-system-mern


---

### 2️⃣ Backend Setup

npm install

Create a `.env` file in root:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start backend:

node server.js

Backend runs at:
http://localhost:5000

---

### 3️⃣ Frontend Setup

cd client
npm install
npm run dev


Frontend runs at:
http://localhost:5173


---

## 🧠 What I Learned

- Full-stack development workflow
- Connecting React frontend to Express backend
- REST API design
- MongoDB schema validation
- State management in React
- HTTP request lifecycle
- Error handling and status codes
- MVC backend architecture
- CORS handling
- Production-like UI development

---

## 🚀 Future Improvements

- Add Authentication (JWT)
- Add Role-based Access (Admin/User)
- Add Pagination
- Deploy frontend and backend
- Add Unit Testing
- Add Dark Mode

---