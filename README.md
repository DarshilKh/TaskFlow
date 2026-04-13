# TaskFlow — Task Manager

A full-stack Task Manager built with **React 19 + Vite** (frontend) and **Spring Boot 3** (backend).

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, JSX, Tailwind CSS   |
| Backend  | Spring Boot 3.2, Java 17, Maven     |
| Storage  | In-memory (ConcurrentHashMap)       |

---

## Prerequisites

- **Java 17+**
- **Maven 3.8+**
- **Node.js 18+**

---

## Running Locally

### 1. Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

The API will start on **http://localhost:8080**.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**.

Vite proxies `/tasks` requests to `localhost:8080`, so no CORS config is needed in dev.

---

## Running with Docker

```bash
docker compose up --build
```

- Frontend → http://localhost:80  
- Backend → http://localhost:8080

---

## API Reference

| Method | Endpoint       | Description          | Body                                    |
|--------|----------------|----------------------|-----------------------------------------|
| GET    | /tasks         | List all tasks       | —                                       |
| POST   | /tasks         | Create a task        | `{ "title": "..." }`                    |
| PATCH  | /tasks/:id     | Update title/status  | `{ "completed": true, "title": "..." }` |
| DELETE | /tasks/:id     | Delete a task        | —                                       |

All responses follow the envelope:
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

---

## Running Tests

```bash
cd backend
mvn test
```

---

## Features

- **Core**: Create, view, complete, and delete tasks
- **Bonus**: Edit task titles inline, filter by All / Active / Done, progress bar
- Loading skeletons and per-action error handling
- Optimistic UI updates (state updated immediately on action)

---

## Assumptions & Trade-offs

- **In-memory storage**: Tasks are lost on server restart. This satisfies the assignment requirement and avoids the overhead of a database setup. Swapping to JPA + H2/Postgres would require only a repository change.
- **No auth**: Out of scope for this exercise.
- **Single module**: Both frontend and backend live in one repo for submission simplicity. In production these would be separate repos/services.
- **Sorting**: Tasks are displayed newest-first using `createdAt` timestamp on the client side.
- **CORS**: `@CrossOrigin(origins = "*")` is used for simplicity. In production this would be locked to specific origins via a `CorsConfigurationSource` bean.
