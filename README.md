<div align="center">

# ✅ TaskFlow

### Full-Stack Task Manager — React + Spring Boot

A modern full-stack task management app with clean UI,  
fast interactions, and production-ready architecture.

[![Live Demo](https://img.shields.io/badge/▲%20LIVE%20DEMO-VISIT-6366f1?style=for-the-badge)](https://taskflow0021.netlify.app/)
[![API](https://img.shields.io/badge/API-LIVE-22c55e?style=for-the-badge)](http://localhost:8080)

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>
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
