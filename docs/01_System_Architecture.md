# System Architecture

---

# 1. Introduction

The Digital Marksheet Management System (DMMS) follows a modern **Client-Server Architecture** based on REST APIs.

The application is divided into two independent parts:

- Client (Frontend)
- Server (Backend)

Both communicate using secure HTTP requests over REST APIs.

---

# 2. High Level Architecture

```
                        User
                          │
                          ▼
               React Frontend (Client)
                          │
                    Axios HTTP Requests
                          │
                          ▼
             Express.js Backend (Server)
                          │
      ┌──────────────┬───────────────┐
      ▼              ▼               ▼
 Middleware      Controllers      Services
                          │
                          ▼
                      Mongoose
                          │
                          ▼
                      MongoDB
```

---

# 3. Architecture Layers

The system follows a layered architecture.

```
Presentation Layer
        │
        ▼
Business Logic Layer
        │
        ▼
Data Access Layer
        │
        ▼
Database Layer
```

---

# 4. Client Architecture

The frontend is developed using React and follows a component-based architecture.

Responsibilities include:

- User Interface
- Navigation
- Authentication
- Dashboard
- Forms
- API Communication
- State Management

Major technologies:

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API

---

# 5. Server Architecture

The backend follows a modular architecture.

Responsibilities include:

- Authentication
- Authorization
- Business Logic
- Validation
- Database Operations
- REST API

Technologies:

- Node.js
- Express.js
- JWT
- bcrypt
- Mongoose

---

# 6. Database Architecture

MongoDB is used as the primary database.

The database stores:

- Employees
- Students
- Teachers
- Classes
- Sections
- Subjects
- Attendance
- Exams
- Results
- Academic Years

Database access is handled using Mongoose ODM.

---

# 7. Authentication Flow

```
User

│

▼

Login Page

│

▼

POST /login

│

▼

Server validates credentials

│

▼

JWT Token Generated

│

▼

Token returned to Frontend

│

▼

Stored in Local Storage

│

▼

Protected Routes Accessible
```

---

# 8. Request Lifecycle

Whenever the user performs an operation, the following sequence occurs.

```
User Action

↓

React Component

↓

API Service

↓

Axios Request

↓

Express Route

↓

Controller

↓

Service

↓

Database

↓

Response

↓

React UI Update
```

---

# 9. Authorization Flow

Every authenticated request passes through authorization middleware.

```
Request

↓

JWT Middleware

↓

Token Validation

↓

User Extraction

↓

Role Verification

↓

Authorized

↓

Controller
```

Only users with sufficient permissions can access protected resources.

---

# 10. Role-Based Access Control (RBAC)

The system implements Role-Based Access Control.

Current Roles:

- Administrator
- Head Teacher
- Class Teacher
- Subject Teacher

Each role has:

- Separate Dashboard
- Separate Sidebar
- Separate Route Access
- Separate Permissions

Unauthorized users are automatically redirected.

---

# 11. Frontend Folder Architecture

```
src

components/

layouts/

pages/

routes/

services/

hooks/

context/

config/
```

Each module is independent and reusable.

Detailed explanation is available in:

**03_Frontend_Architecture.md**

---

# 12. Backend Folder Architecture

```
server

controllers/

models/

routes/

middleware/

config/

utils/
```

Each folder has a single responsibility.

Detailed explanation is available in:

**04_Backend_Architecture.md**

---

# 13. Data Flow

The following illustrates the complete data flow inside the application.

```
User

↓

React Component

↓

Auth Context

↓

API Service

↓

Express API

↓

Controller

↓

Database

↓

Controller

↓

Response

↓

React Component

↓

User Interface
```

---

# 14. Security Architecture

The system implements several security mechanisms.

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Password Hashing (bcrypt)
- Secure REST APIs
- Session Persistence
- Route Guards

Future enhancements include:

- Refresh Tokens
- Rate Limiting
- HTTPS
- Audit Logging
- Multi-Factor Authentication (MFA)

---

# 15. Scalability

The architecture has been designed to support future expansion.

Possible future modules include:

- Parent Portal
- Student Portal
- Fee Management
- Library Management
- Transport Management
- Hostel Management
- Mobile Application
- Multi-School Support

The modular architecture allows new features to be added without affecting existing modules.

---

# 16. Summary

DMMS follows a clean and scalable architecture based on modern web development practices.

The separation of frontend, backend, authentication, routing, business logic, and database layers ensures the system is maintainable, secure, and suitable for future expansion.