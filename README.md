# ✅ TaskFlow — Task Manager

A full-stack Task Manager built with React 19 + Vite (frontend) and Spring Boot 3 (backend).  
Focused on clean architecture, fast UI interactions, and production-ready structure.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-6366f1?style=for-the-badge&logo=vercel)](https://taskflow0021.netlify.app/)

---

## 🚀 Highlights

- Full-stack CRUD application with clean separation  
- Optimistic UI updates for instant user feedback  
- RESTful API design with structured response format  
- Dockerized setup for consistent environment  
- Lightweight architecture using in-memory storage  

---

## 🛠️ Tech Stack

### 💻 Frontend
- React 19  
- Vite  
- Tailwind CSS  

### ⚙️ Backend
- Spring Boot 3.2  
- Java 17  
- Maven  

### 🧠 Storage
- In-memory (ConcurrentHashMap)  

---

## ⚡ Features

- Create, view, update, and delete tasks  
- Inline task editing  
- Filter tasks (All / Active / Completed)  
- Progress tracking with visual indicator  
- Loading states and error handling  
- Optimistic UI updates for better UX  

---

## 🚀 Running Locally

### Backend

cd backend  
mvn spring-boot:run  

API runs on: http://localhost:8080  

---

### Frontend

cd frontend  
npm install  
npm run dev  

App runs on: http://localhost:5173  

(Vite proxies API requests → no CORS issues in development)

---

## 🐳 Running with Docker

docker compose up --build  

- Frontend → http://localhost:80  
- Backend → http://localhost:8080  

---

## 📡 API Reference

GET /tasks → List all tasks  

POST /tasks  
Body: { "title": "..." }  

PATCH /tasks/:id  
Body: { "completed": true, "title": "..." }  

DELETE /tasks/:id → Delete task  

Response format:  
{  
  "success": true,  
  "message": "...",  
  "data": { ... }  
}  

---

## 🧪 Running Tests

cd backend  
mvn test  

---

## 🧾 Engineering Decisions

- In-memory storage → fast setup, no DB overhead  
- Optimistic UI → better perceived performance  
- Single repo → simplified development and deployment  
- CORS open → simplified dev (restricted in production)  
- Client-side sorting using createdAt  

---

## 📈 What This Project Demonstrates

- Full-stack application development  
- REST API design and integration  
- State management and UI optimization  
- Backend architecture using Spring Boot  
- Clean, maintainable code practices  

---

## ⚠️ Trade-offs

- No persistent storage (data resets on restart)  
- No authentication (out of scope)  
- Not horizontally scalable (in-memory design)  

---

## ⭐ If you found this useful

Consider giving a star — it helps visibility.
