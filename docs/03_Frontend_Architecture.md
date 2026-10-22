# Frontend Architecture

---

# 1. Introduction

The frontend of the **Digital Marksheet Management System (DMMS)** is developed using **React.js** and follows a modern **Component-Based Architecture**. The application is designed to be modular, scalable, reusable, and maintainable by separating different responsibilities into dedicated folders such as components, layouts, pages, routes, services, hooks, context, and configuration.

The frontend communicates with the backend through REST APIs and uses **Role-Based Access Control (RBAC)** to provide different dashboards and functionalities for different users.

The architecture ensures that each module has a single responsibility, making the application easier to maintain and extend in the future.

---

# 2. Frontend Technology Stack

The frontend is built using the following technologies.

| Technology | Purpose |
|------------|---------|
| React.js | Build the User Interface using reusable components |
| Vite | Fast development server and optimized production build |
| Tailwind CSS | Responsive and utility-first CSS framework |
| React Router DOM | Client-side routing and navigation |
| Axios | Communication with backend REST APIs |
| Context API | Global state management |
| Lucide React | Icons used throughout the application |

---

# 3. Frontend Architecture Overview

The frontend follows a layered architecture where each layer has a specific responsibility.

```
                        Browser
                           │
                           ▼
                      main.jsx
                           │
                           ▼
                        App.jsx
                           │
                           ▼
                    AppRoutes.jsx
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
    PublicRoute                     ProtectedRoute
                                            │
                                            ▼
                                   DashboardLayout
                                            │
             ┌──────────────────────┬──────────────────────┐
             ▼                      ▼                      ▼
         Navbar                 Sidebar                Footer
                                            │
                                            ▼
                                         <Outlet />
                                            │
                                            ▼
                                    Dashboard Pages
                                            │
                                            ▼
                                  Reusable Components
                                            │
                                            ▼
                                       API Services
                                            │
                                            ▼
                                      Express Backend
```

---

# 4. Application Startup Flow

Whenever the application starts, the following sequence is executed.

```
User Opens Website
        │
        ▼
main.jsx
        │
        ▼
App.jsx
        │
        ▼
AuthContext Restores User Session
        │
        ▼
AppRoutes Loads Routes
        │
        ▼
Authentication Checked
        │
        ▼
PublicRoute or ProtectedRoute
        │
        ▼
DashboardLayout
        │
        ▼
Requested Page Rendered
```

### Explanation

1. The browser loads the React application.
2. `main.jsx` initializes React.
3. `App.jsx` renders the application's routing system.
4. `AuthContext` checks if a user is already logged in.
5. The JWT token and user information are restored from Local Storage.
6. `AppRoutes` loads all public and protected routes.
7. Authentication and role verification are performed.
8. If authorized, the corresponding dashboard is rendered.
9. Otherwise, the user is redirected to the Login page.

---

# 5. Frontend Folder Architecture

The frontend follows a modular folder structure where every folder has a dedicated responsibility.

```
src/
│
├── assets/
├── components/
├── config/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
│
├── App.jsx
└── main.jsx
```

---

## 5.1 assets/

The **assets** folder stores static resources used throughout the application.

Examples:

- Images
- Logos
- Icons
- Background Images
- Illustrations

---

## 5.2 components/

The **components** folder contains reusable UI components that can be used across multiple pages.

Examples:

- Navbar
- Sidebar
- Footer
- UserCard
- Dashboard Cards
- Buttons
- Forms
- Tables
- Loaders

Using reusable components reduces duplicate code and improves maintainability.

---

## 5.3 config/

The **config** folder contains application-wide configuration files.

Examples:

- roles.js
- paths.js
- adminMenu.js
- headTeacherMenu.js
- classTeacherMenu.js
- subjectTeacherMenu.js

Responsibilities:

- User Roles
- Sidebar Menu Configuration
- Route Paths
- Application Constants

---

## 5.4 context/

The **context** folder manages global application state using the React Context API.

Current Context:

- AuthContext

Responsibilities:

- Store Logged-in User
- Store JWT Token
- Login
- Logout
- Session Restoration
- Authentication State

---

## 5.5 hooks/

The **hooks** folder contains reusable custom React hooks.

Examples:

- useAuth()
- useRole()

Purpose:

- Reduce duplicate logic
- Simplify component code
- Improve reusability

---

## 5.6 layouts/

The **layouts** folder defines common page layouts shared across multiple pages.

Current Layouts:

- DashboardLayout

Responsibilities:

- Navbar
- Sidebar
- Footer
- Page Layout
- Responsive Sidebar

Layouts help maintain a consistent user interface throughout the application.

---

## 5.7 pages/

The **pages** folder contains all page-level components.

Current Structure:

```
pages/

admin/

headTeacher/

classTeacher/

subjectTeacher/

auth/

common/
```

Each role has its own independent pages and dashboard.

---

## 5.8 routes/

The **routes** folder contains the application's routing configuration.

Important Files:

- AppRoutes.jsx
- PublicRoute.jsx
- ProtectedRoute.jsx
- adminRoutes.js
- headTeacherRoutes.js
- classTeacherRoutes.js
- subjectTeacherRoutes.js

Responsibilities:

- Route Registration
- Route Protection
- Nested Routing
- Role-Based Routing

---

## 5.9 services/

The **services** folder manages communication with the backend APIs.

Current Files:

- api.js
- authService.js

Responsibilities:

- Axios Configuration
- API Calls
- Authentication Requests
- CRUD Operations

---

## 5.10 utils/

The **utils** folder contains reusable helper functions.

Examples:

- formatRole.js
- validators.js
- dateFormatter.js

Purpose:

- Reduce duplicate utility logic
- Improve code organization

---

# 6. Frontend Design Principles

The frontend has been developed using the following software engineering principles.

- Component-Based Development
- Reusability
- Separation of Concerns
- Single Responsibility Principle
- Modular Architecture
- Role-Based UI Rendering
- Configuration-Based Routing
- Responsive Design
- Clean Code Practices

Following these principles makes the application easier to maintain, test, and extend as new features are added.

---
# 7. Component Architecture

The frontend follows a **Component-Based Architecture**, where the user interface is divided into small, reusable, and independent components. Each component has a specific responsibility and can be reused across multiple pages, reducing code duplication and improving maintainability.

The component hierarchy of the application is illustrated below.

```
Pages
   │
   ▼
Dashboard Layout
   │
   ├───────────────┐
   ▼               ▼
Navbar          Sidebar
   │
   ▼
Page Content (<Outlet />)
   │
   ▼
Reusable Components
   │
   ▼
UI Components
```

### Types of Components

The frontend consists of the following types of components:

- Layout Components
- Navigation Components
- Authentication Components
- Dashboard Components
- Reusable UI Components
- Form Components

Each component performs only one specific task, following the **Single Responsibility Principle (SRP)**.

---

# 8. Routing Architecture

Routing is managed using **React Router DOM**. The application implements a combination of public and protected routes to ensure secure navigation.

The routing flow is illustrated below.

```
Browser
   │
   ▼
AppRoutes.jsx
   │
   ├────────────────────────────┐
   ▼                            ▼
PublicRoute               ProtectedRoute
                                 │
                                 ▼
                        DashboardLayout
                                 │
                                 ▼
                           Nested Routes
                                 │
                                 ▼
                           Requested Page
```

## Routing Strategy

The routing system is divided into two categories.

### Public Routes

Public routes are accessible without authentication.

Examples:

- Login
- Unauthorized Page (Future)

These routes are wrapped using the `PublicRoute` component.

---

### Protected Routes

Protected routes require authentication.

Responsibilities:

- Verify JWT session
- Verify user authentication
- Verify user role
- Prevent unauthorized access
- Render the requested dashboard

Protected routes are wrapped using the `ProtectedRoute` component.

---

## Nested Routing

The application uses **Nested Routing** provided by React Router.

Instead of repeating the Navbar, Sidebar, and Footer for every page, all dashboard pages are rendered inside a common layout.

```
DashboardLayout
        │
        ▼
     <Outlet />
        │
        ▼
Requested Dashboard Page
```

This keeps the application organized and avoids duplicated layout code.

---

# 9. Authentication Flow

Authentication is implemented using **JWT (JSON Web Token)** and managed globally using the React Context API.

The authentication process is illustrated below.

```
User
   │
   ▼
Login Form
   │
   ▼
authService.js
   │
   ▼
Axios Request
   │
   ▼
Backend API
   │
   ▼
JWT Generated
   │
   ▼
Response Returned
   │
   ▼
AuthContext
   │
   ▼
Local Storage
   │
   ▼
Dashboard
```

## Authentication Process

1. User enters Employee ID and Password.
2. Login request is sent to the backend.
3. Backend validates the credentials.
4. JWT Token is generated.
5. User information is returned.
6. Token and user details are stored in Local Storage.
7. AuthContext updates the global authentication state.
8. User is redirected to the appropriate dashboard.

---

## Session Restoration

Whenever the application starts:

- AuthContext checks Local Storage.
- Existing token is restored.
- User session is restored.
- Protected routes become accessible.

This prevents users from logging in again after refreshing the browser.

---

## Logout Process

When the user logs out:

- JWT token is removed.
- User information is cleared.
- Authentication state is reset.
- User is redirected to the Login page.

---

# 10. Role-Based Access Control (RBAC)

The Digital Marksheet Management System follows a **Role-Based Access Control (RBAC)** architecture.

Every authenticated user is assigned a role by the backend.

Current supported roles are:

- Administrator
- Head Teacher
- Class Teacher
- Subject Teacher

The frontend uses this role to determine:

- Dashboard
- Sidebar Menu
- Available Pages
- Route Access
- User Permissions

---

## Role Resolution Flow

```
Backend
   │
Returns User Object
   │
   ▼
AuthContext
   │
   ▼
Read User Role
   │
   ▼
ROLE_BASE_PATHS
   │
   ▼
Dashboard
   │
   ▼
Sidebar Menu
   │
   ▼
Allowed Pages
```

---

## Role-Based Dashboard Navigation

After successful login, the user is redirected according to their role.

| Role | Dashboard |
|-------|-----------|
| Administrator | `/admin` |
| Head Teacher | `/head-teacher` |
| Class Teacher | `/class-teacher` |
| Subject Teacher | `/subject-teacher` |

This mapping is maintained centrally using the `ROLE_BASE_PATHS` configuration.

---

## Role-Based Sidebar

Each role has its own sidebar menu configuration.

Examples:

- adminMenu.js
- headTeacherMenu.js
- classTeacherMenu.js
- subjectTeacherMenu.js

The Sidebar component dynamically renders the appropriate menu based on the logged-in user's role.

---

## Role-Based Route Protection

ProtectedRoute ensures that users cannot access pages outside their assigned role.

For example:

- A Class Teacher cannot access Admin routes.
- A Subject Teacher cannot access Head Teacher pages.
- Unauthorized users are automatically redirected.

This improves application security and prevents unauthorized navigation.

---

# 11. Layout Architecture

The application uses a common dashboard layout shared across all user roles.

```
DashboardLayout
│
├── Navbar
├── Sidebar
├── Outlet
└── Footer
```

## Responsibilities

The DashboardLayout is responsible for:

- Displaying the common navigation bar.
- Displaying the role-based sidebar.
- Rendering the active page using `<Outlet />`.
- Displaying the application footer.
- Managing responsive sidebar behavior.

Using a common layout eliminates duplicate code and ensures a consistent user experience across all dashboards.

---
# 12. State Management

The frontend uses the **React Context API** for global state management.

Currently, the application maintains authentication-related information using the `AuthContext`.

```
AuthContext
    │
    ├── User
    ├── Token
    ├── Loading State
    ├── Login()
    ├── Logout()
    └── Session Restoration
```

## Responsibilities

The `AuthContext` is responsible for:

- Managing the logged-in user.
- Storing the authentication token.
- Restoring the user session after page refresh.
- Providing authentication methods to all components.
- Managing login and logout functionality.

Using Context API eliminates the need for prop drilling and provides a centralized authentication state across the application.

---

# 13. API Communication

The frontend communicates with the backend using **Axios**.

All HTTP requests are managed inside the `services` folder.

```
React Component
        │
        ▼
Service Layer
        │
        ▼
Axios Instance
        │
        ▼
REST API
        │
        ▼
Express Server
        │
        ▼
Database
```

## API Structure

The application separates API communication into two layers.

### api.js

Responsibilities:

- Configure Axios instance.
- Store the backend Base URL.
- Configure default request headers.
- Handle future request and response interceptors.

---

### authService.js

Responsibilities:

- User Login
- User Logout
- Authentication-related API requests

As the project grows, additional service files such as `studentService.js`, `teacherService.js`, and `examService.js` can be added to keep API communication modular and maintainable.

---

# 14. Navigation Flow

Navigation within the application is handled using **React Router DOM**.

The navigation flow is illustrated below.

```
User Clicks Menu
        │
        ▼
Sidebar Component
        │
        ▼
React Router
        │
        ▼
URL Updated
        │
        ▼
Route Matched
        │
        ▼
Requested Page Rendered
```

## Navigation Responsibilities

The routing system is responsible for:

- URL Management
- Page Navigation
- Route Protection
- Role-Based Routing
- Nested Route Rendering

This approach provides a smooth Single Page Application (SPA) experience without full page reloads.

---

# 15. Rendering Flow

Whenever a page is opened, React follows the rendering process shown below.

```
User Request
        │
        ▼
React Component
        │
        ▼
Custom Hooks
        │
        ▼
Context State
        │
        ▼
JSX Generated
        │
        ▼
Virtual DOM
        │
        ▼
Real DOM Updated
        │
        ▼
Updated UI Displayed
```

React efficiently updates only the changed parts of the user interface, improving application performance.

---

# 16. Error Handling

The frontend includes multiple mechanisms to improve user experience during unexpected situations.

## Authentication Errors

Examples:

- Invalid Employee ID
- Incorrect Password
- Expired Session

---

## Authorization Errors

Examples:

- Accessing pages without login.
- Accessing pages outside the assigned role.

Unauthorized users are redirected to the Login page or an appropriate dashboard.

---

## API Errors

Examples:

- Server unavailable.
- Internal Server Error.
- Network failure.
- Invalid request.

Appropriate error messages should be displayed to inform the user.

---

## Loading States

While data is being fetched from the backend, loading indicators should be displayed to improve user experience.

---

# 17. Responsive Design

The frontend is fully responsive and adapts to different screen sizes.

Supported devices include:

- Desktop
- Laptop
- Tablet
- Mobile

## Responsive Features

- Responsive Sidebar
- Mobile Navigation Toggle
- Flexible Layout
- Adaptive Cards
- Responsive Tables
- Mobile-Friendly Forms

Tailwind CSS utility classes are used extensively to build a responsive user interface.

---

# 18. Frontend Execution Flow

The following diagram illustrates the complete execution flow of the frontend application.

```
User Opens Website
        │
        ▼
main.jsx
        │
        ▼
App.jsx
        │
        ▼
AuthContext
        │
        ▼
AppRoutes
        │
        ▼
ProtectedRoute / PublicRoute
        │
        ▼
DashboardLayout
        │
 ┌──────┴─────────┐
 ▼                ▼
Navbar         Sidebar
        │
        ▼
      Outlet
        │
        ▼
Requested Page
        │
        ▼
Reusable Components
        │
        ▼
Service Layer
        │
        ▼
Axios
        │
        ▼
Backend API
        │
        ▼
Database
        │
        ▼
Response Returned
        │
        ▼
React Updates UI
```

This execution flow represents the lifecycle of a typical request, from the moment the user opens the application until the requested data is displayed on the screen.

---

# 19. Frontend Best Practices

The frontend has been developed by following modern software engineering principles.

## Component Reusability

Reusable components reduce code duplication and simplify maintenance.

---

## Separation of Concerns

Each folder and component has a clearly defined responsibility.

---

## Single Responsibility Principle

Every component and utility performs only one specific task.

---

## Modular Development

Features are organized into independent modules, making future enhancements easier.

---

## Role-Based Design

Every user interacts only with the pages and features assigned to their role.

---

## Configuration-Based Routing

Routes, paths, roles, and sidebar menus are managed through configuration files instead of hardcoded values.

---

## Clean Code

The project follows consistent naming conventions, folder organization, and readable code practices to improve maintainability.

---

# 20. Summary

The frontend architecture of the Digital Marksheet Management System (DMMS) is designed to be scalable, modular, and maintainable. By adopting a component-based architecture, role-based routing, centralized authentication, reusable layouts, and service-oriented API communication, the application provides a clean separation of concerns and a consistent user experience.

The modular design allows new features and user roles to be integrated with minimal changes to the existing codebase, making the system suitable for long-term maintenance and future expansion.