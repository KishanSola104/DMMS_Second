# Digital Marksheet Management System (DMMS)

> A modern, secure, and role-based School ERP System for managing academic records, examinations, and digital marksheets.

---

# 1. Project Overview

The **Digital Marksheet Management System (DMMS)** is a comprehensive School Enterprise Resource Planning (ERP) system developed to digitize and automate the academic and administrative operations of educational institutions.

The system eliminates traditional paper-based record management by providing a centralized platform for managing students, teachers, examinations, results, attendance, and digital marksheets.

DMMS follows a **Role-Based Access Control (RBAC)** architecture where every user accesses only the modules and information permitted by their role, ensuring data security and efficient management.

---

# 2. Objectives

The primary objectives of this project are:

- Digitize the complete examination and marksheet generation process.
- Reduce manual paperwork and administrative workload.
- Maintain accurate and secure academic records.
- Provide role-specific dashboards for different users.
- Improve transparency in result processing.
- Generate digital marksheets efficiently.
- Create a scalable and maintainable School ERP system.

---

# 3. Key Features

### Authentication & Security

- Secure JWT Authentication
- Role-Based Authorization
- Protected Routes
- Session Persistence
- Secure Password Storage
- User Profile Management

---

### Academic Management

- Academic Year Management
- Class Management
- Section Management
- Subject Management
- Student Management
- Teacher Management

---

### Examination Management

- Exam Creation
- Marks Entry
- Result Processing
- Digital Marksheet Generation
- Result Analysis

---

### Dashboard & Analytics

- Role-Based Dashboards
- Statistical Cards
- Charts & Reports
- Quick Actions
- Recent Activities

---

### Administration

- Employee Management
- School Information
- System Settings
- Backup & Restore
- Audit Logs

---

# 4. User Roles

The system currently supports four user roles.

## Administrator

Responsible for complete system administration.

Responsibilities:

- Manage Teachers
- Manage Students
- Manage Classes
- Manage Sections
- Manage Subjects
- Manage Academic Years
- Manage Employees
- Manage School Information
- System Configuration
- View Reports
- Backup & Restore

---

## Head Teacher

Responsible for monitoring academic activities.

Responsibilities:

- View Teachers
- Manage Students
- Manage Classes
- Manage Sections
- Manage Subjects
- Manage Exams
- View Results
- Academic Monitoring

---

## Class Teacher

Responsible for managing a specific class.

Responsibilities:

- View Assigned Students
- Manage Attendance
- Enter Student Marks
- View Results
- Class Performance Monitoring

---

## Subject Teacher

Responsible for subject-specific academic work.

Responsibilities:

- View Assigned Subjects
- Enter Marks
- Manage Subject Attendance
- View Results
- Student Performance Analysis

---

# 5. Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

---

## Database

- MongoDB
- Mongoose ODM

---

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Compass

---

# 6. Project Architecture

The project follows a Client-Server Architecture.

```
                    User

                     │

                     ▼

            React Frontend (Client)

                     │

          Axios REST API Requests

                     │

                     ▼

         Express.js Backend (Server)

                     │

     Controllers → Services → Models

                     │

                     ▼

               MongoDB Database
```

---

# 7. Frontend Architecture

The frontend is built using reusable components and a modular folder structure.

Major modules include:

- Authentication
- Dashboard
- Layout
- Routing
- Context API
- Custom Hooks
- API Services
- UI Components

The application follows role-based routing to provide different dashboards and features based on the logged-in user's role.

---

# 8. Backend Architecture

The backend follows a layered architecture consisting of:

- Routes
- Controllers
- Middleware
- Models
- Services
- Database

This separation improves maintainability and scalability.

---

# 9. Current Development Status

## Completed

- Project Setup
- Authentication
- JWT Authorization
- Protected Routing
- Public Routing
- Role-Based Access Control
- Admin Dashboard UI
- Responsive Sidebar
- Responsive Navbar
- Footer
- Dashboard Layout
- User Profile Card

---

## In Progress

- Head Teacher Dashboard
- Class Teacher Dashboard
- Subject Teacher Dashboard
- CRUD Operations
- Charts
- Reports

---

## Planned

- Attendance Module
- Result Processing
- Digital Marksheet Generation
- PDF Export
- Notifications
- Parent Portal
- Student Portal
- AI-Based Analytics

---

# 10. Project Folder Structure

```
client/
server/
docs/
```

Detailed folder explanations are available in:

**02_Project_Structure.md**

---

# 11. Documentation Structure

This project contains detailed technical documentation inside the `docs` directory.

The documentation includes:

- System Architecture
- Folder Structure
- Routing
- Authentication
- Backend
- Frontend
- API Documentation
- Database Design
- Components
- Deployment Guide
- Future Enhancements

---

# 12. Future Scope

The project is designed to be scalable and can be extended with:

- Parent Portal
- Student Portal
- Mobile Application
- SMS Integration
- Email Notifications
- AI Performance Prediction
- Timetable Management
- Fee Management
- Library Management
- Hostel Management
- Transport Management
- Multi-School Support

---

# 13. Developed By

**Shreeji IT Solutions PVT. LTD.**

Development Team

- Kishan Solanki
- Krunal
- Vansh

---

# 14. Version

Current Version

**v1.0.0**

Status

**Under Active Development**