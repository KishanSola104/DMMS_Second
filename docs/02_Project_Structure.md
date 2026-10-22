# Project Structure

---

# 1. Introduction

The Digital Marksheet Management System (DMMS) follows a modular and scalable project structure.

The project is divided into three major parts:

- Client (Frontend)
- Server (Backend)
- Documentation

This separation improves maintainability, scalability, and code organization.

---

# 2. Root Folder Structure

```
Digital-Marksheet-Management-System/

│
├── client/
├── server/
├── docs/
├── README.md
├── .gitignore
└── package.json
```

---

# 3. Client Structure

```
client/

src/

assets/

components/

config/

context/

hooks/

layouts/

pages/

routes/

services/

utils/

App.jsx

main.jsx
```

---

# 4. Client Folder Explanation

---

## assets/

Contains all static resources.

Examples

- Images
- Icons
- Logos
- Backgrounds

---

## components/

Contains reusable UI components used throughout the application.

Example

```
components/

auth/

common/

dashboard/

layout/

ui/
```

### auth/

Authentication related components.

Examples

- LoginForm
- PasswordInput
- RoleSelect

---

### common/

Common reusable components.

Examples

- Loader
- NotFound
- Footer
- EmptyState

---

### dashboard/

Dashboard specific reusable components.

Examples

- DashboardCard
- StatisticsCard
- ChartCard
- ActivityCard

---

### layout/

Layout components.

Examples

- Navbar
- Sidebar
- SidebarItem
- UserCard

---

### ui/

Reusable UI controls.

Examples

- Button
- Input
- Modal
- Table
- SearchInput

---

## config/

Application configuration.

Examples

```
roles.js

paths.js

menus/
```

Responsibilities

- User roles
- Sidebar menus
- Route paths
- Constants

---

## context/

Global application state.

Current Contexts

- AuthContext
- ThemeContext

Responsibilities

- Authentication
- User Session
- Theme Management

---

## hooks/

Custom React hooks.

Examples

```
useAuth()

useRole()
```

Purpose

To reuse application logic.

---

## layouts/

Application layouts.

Current Layouts

```
DashboardLayout

AuthLayout
```

Responsibilities

- Navbar
- Sidebar
- Footer
- Page Layout

---

## pages/

Contains all application pages.

Structure

```
pages/

admin/

headTeacher/

classTeacher/

subjectTeacher/

auth/

common/
```

Each role has its own pages.

---

## routes/

Application routing.

Current Files

```
AppRoutes.jsx

ProtectedRoute.jsx

PublicRoute.jsx

adminRoutes.js

headTeacherRoutes.js

classTeacherRoutes.js

subjectTeacherRoutes.js
```

Responsibilities

- Navigation
- Route Protection
- Role Routing

---

## services/

Handles API communication.

Examples

```
api.js

authService.js
```

Responsibilities

- HTTP Requests
- Authentication APIs
- CRUD APIs

---

## utils/

Contains helper functions.

Examples

```
formatRole.js

dateFormatter.js

validators.js
```

Responsibilities

Reusable helper logic.

---

# 5. Server Structure

```
server/

config/

controllers/

middleware/

models/

routes/

services/

utils/

server.js
```

---

# 6. Server Folder Explanation

---

## config/

Configuration files.

Examples

- Database Connection
- Environment Configuration

---

## controllers/

Contains business logic.

Example

```
loginController

studentController

teacherController
```

Controllers receive requests and return responses.

---

## middleware/

Request middleware.

Examples

- Authentication
- Authorization
- Error Handling

---

## models/

MongoDB models.

Examples

- Employee
- Student
- Subject
- Class
- Exam

---

## routes/

REST API endpoints.

Example

```
/login

/students

/teachers

/exams
```

---

## services/

Business logic shared across controllers.

Examples

- Result Calculation
- Marksheet Generation

---

## utils/

Reusable backend utilities.

Examples

- JWT Helpers
- Validators
- PDF Generator

---

# 7. Documentation Structure

```
docs/

00_Project_Overview.md

01_System_Architecture.md

02_Project_Structure.md

...

assets/
```

The docs folder contains complete developer documentation.

---

# 8. Coding Principles

The project follows the following principles.

- Component Reusability
- Separation of Concerns
- Modular Architecture
- Role-Based Design
- Clean Folder Structure
- Consistent Naming Conventions

---

# 9. Benefits of Current Structure

- Easy to understand
- Easy to maintain
- Scalable
- Role separation
- Reusable components
- Clean architecture
- Professional folder organization

---

# 10. Summary

The project structure has been designed to keep frontend, backend, and documentation independent while allowing future expansion.

Each folder has a single responsibility, making the project easier to maintain and suitable for real-world development.





# 11. Important Frontend Files

This section explains the purpose and responsibilities of the most important frontend files in the project. Every developer working on the project should understand these files before implementing new features.

Then divide it by folders.

11.1 Entry Point
main.jsx
Location
client/src/main.jsx
Purpose

main.jsx is the entry point of the React application. It initializes the application and renders the root component into the browser.

Responsibilities
Creates the React application.
Wraps the application with required providers.
Loads global styles.
Mounts the application into the DOM.
Used By
Browser
App.jsx
App.jsx
Location
client/src/App.jsx
Purpose

Acts as the root component of the application.

Responsibilities
Loads the application's routing system.
Renders the AppRoutes component.
Acts as the top-level React component.
Used By
main.jsx
11.2 Routing
AppRoutes.jsx
Location
client/src/routes/AppRoutes.jsx
Purpose

Defines the complete routing structure of the application.

Responsibilities
Registers all application routes.
Separates public and protected routes.
Connects dashboards for different user roles.
Maps route configuration files to React Router.
Important Because

This is the central routing file. Every page in the application is ultimately connected through this file.

ProtectedRoute.jsx
Location
client/src/routes/ProtectedRoute.jsx
Purpose

Protects private routes from unauthorized access.

Responsibilities
Checks if the user is logged in.
Waits until authentication is restored.
Verifies user roles.
Redirects unauthorized users.
Renders nested routes using <Outlet />.
Used By
AppRoutes.jsx
PublicRoute.jsx
Location
client/src/routes/PublicRoute.jsx
Purpose

Prevents authenticated users from accessing public pages.

Responsibilities
Allows guests to access Login.
Redirects logged-in users to their dashboard.
Prevents unnecessary access to authentication pages.
adminRoutes.js
Purpose

Contains all Admin dashboard routes.

headTeacherRoutes.js
Purpose

Contains all Head Teacher routes.

classTeacherRoutes.js
Purpose

Contains all Class Teacher routes.

subjectTeacherRoutes.js
Purpose

Contains all Subject Teacher routes.

11.3 Authentication
AuthContext.jsx
Location
client/src/context/AuthContext.jsx
Purpose

Manages authentication and user session across the application.

Responsibilities
Stores logged-in user.
Stores JWT token.
Restores session from Local Storage.
Handles Login.
Handles Logout.
Exposes authentication state to the application.
Why Important

This is the heart of the authentication system.

11.4 Layout
DashboardLayout.jsx
Location
client/src/layouts/DashboardLayout.jsx
Purpose

Provides a common layout for all dashboard pages.

Responsibilities
Displays Navbar.
Displays Sidebar.
Displays Footer.
Renders page content using <Outlet />.
Handles responsive sidebar behavior.
Used By

All protected dashboard routes.

11.5 Navigation Components
Sidebar.jsx
Purpose

Displays role-specific navigation menus.

Responsibilities
Shows menu items.
Handles navigation.
Supports responsive sidebar.
Highlights active page.
Navbar.jsx
Purpose

Displays the top navigation bar.

Responsibilities
Shows current page title.
Displays logged-in user.
Sidebar toggle.
Notifications (future).
UserCard.jsx
Purpose

Displays currently logged-in user's information.

Responsibilities
Shows Name.
Shows Employee ID.
Shows Role.
Shows Profile Image.
Footer.jsx
Purpose

Displays application footer.

Responsibilities
Copyright
Developer Information
Company Information
11.6 Configuration
roles.js
Purpose

Defines all user roles used throughout the application.

Current Roles

ADMIN
HEAD_TEACHER
CLASS_TEACHER
SUBJECT_TEACHER
paths.js
Purpose

Stores application route constants.

Responsibilities
Prevent hardcoded URLs.
Centralize route management.
Improve maintainability.
menus
Purpose

Contains sidebar menu configuration for every role.

Files

adminMenu.js
headTeacherMenu.js
classTeacherMenu.js
subjectTeacherMenu.js
11.7 Services
api.js
Purpose

Creates the common Axios instance.

Responsibilities
Base URL
Default headers
Request configuration
Future interceptors
authService.js
Purpose

Handles authentication API requests.

Responsibilities
Login
Logout
Future Password Reset
11.8 Custom Hooks
useAuth.js
Purpose

Provides easy access to authentication context.

useRole.js
Purpose

Provides helper functions related to user roles.

11.9 Utility Files
formatRole.js
Purpose

Converts backend role values into human-readable text.

Example

ADMIN

↓

Administrator
11.10 Page Structure

Only document major pages.

For example:

Admin
Dashboard
Employees
Students
Teachers
Subjects
Settings

Each page represents one module of the ERP.


---

# I have one more suggestion (this will make the documentation exceptional)

After explaining all the important files, add a **"File Dependency Flow"** section that shows how they connect.

```text
main.jsx
      │
      ▼
App.jsx
      │
      ▼
AppRoutes.jsx
      │
      ▼
ProtectedRoute.jsx
      │
      ▼
DashboardLayout.jsx
      │
 ┌────┴─────┐
 ▼          ▼
Navbar   Sidebar
      │
      ▼
     Outlet
      │
      ▼
 Dashboard Pages