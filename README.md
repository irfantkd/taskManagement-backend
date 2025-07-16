# 📦 Task Management API

A RESTful **Task Management API** built with **Node.js, Express, MongoDB (Mongoose)** and deployed on **Vercel**.  
This API allows users to:  
✅ Register/Login  
✅ Create, Read, Update, Delete (CRUD) their tasks  
✅ Supports authentication (JWT)

---

## 🚀 Live API

🌐 [https://task-management-backend-orcin.vercel.app](https://task-management-backend-orcin.vercel.app)

---

## 📑 Features

- User Registration & Login
- JWT Authentication
- Create, Read, Update, Delete Tasks
- MongoDB Atlas Integration
- CORS Enabled for Frontend Integration
- Deployed on Vercel

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Deployment:** Vercel

---

## ⚡ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/irfantkd/taskManagement-backend.git
   cd taskManagement-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```
   MONGO_URI=your-mongodb-connection-string
   SECURITY_KEY=your-jwt-secret
   PORT=3001
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3001`

---

## 📬 API Endpoints

### 👤 Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |
| POST   | `/api/auth/verify`   | Verify user token   |

#### 📌 Example Request (Register)

```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

#### 📌 Example Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

---

### 📋 Task Routes (Protected)

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/api/task/create`     | Create a new task  |
| GET    | `/api/task/get`        | Get all user tasks |
| GET    | `/api/task/get:id`     | Get task by ID     |
| PUT    | `/api/task/update/:id` | Update task by ID  |
| DELETE | `/api/task/delete/:id` | Delete task by ID  |

#### 📌 Example Request (Create Task)

```json
POST /api/task/create
Authorization: Bearer jwt_token_here
{
  "title": "Complete MERN Project",
  "description": "Finish backend APIs and frontend integration",
  "status": "pending"
}
```

#### 📌 Example Response

```json
{
  "error": false,
  "message": "Task created successfully",
  "data": {
    "_id": "60f7c1b1234567890abcdef",
    "title": "Complete MERN Project",
    "description": "Finish backend APIs and frontend integration",
    "status": "pending",
    "user": "60f7c0b1234567890abcde",
    "createdAt": "2024-07-15T12:00:00.000Z",
    "updatedAt": "2024-07-15T12:00:00.000Z",
    "__v": 0
  }
}
```

---

## 🌐 Deployment

This API is deployed on **Vercel**:  
[https://task-management-backend-orcin.vercel.app](https://task-management-backend-orcin.vercel.app)

---

## 📝 Environment Variables

| Variable       | Description                     |
| -------------- | ------------------------------- |
| `MONGO_URI`    | MongoDB Atlas connection string |
| `SECURITY_KEY` | JWT secret key                  |
| `PORT`         | Port number (optional)          |

---

## 📂 Project Structure

```
task-management-api/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── config/
│   └── db.js
├── index.js
├── package.json
├── .env
├── vercel.json
└── README.md
```

---

## 💻 Local Testing

Use Postman or any REST client. Set `Authorization` header with your JWT token:

```
Authorization: Bearer <your_token_here>
```

---

## 📜 License

This project is open-source and free to use.
