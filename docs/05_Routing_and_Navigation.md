# Routing and Navigation

---

# 1. Introduction

Routing is the mechanism that determines which page should be displayed when a user navigates to a specific URL. In the Digital Marksheet Management System (DMMS), routing is implemented using **React Router DOM**, enabling seamless client-side navigation without requiring a full page reload.

The routing architecture is designed to provide secure, scalable, and role-based navigation. It separates public pages from authenticated pages and ensures that each user can only access the pages and features assigned to their role.

The navigation system works closely with the authentication mechanism and layout components to provide a consistent user experience across the application.

---

# 2. Objectives

The routing and navigation system has been designed with the following objectives:

- Provide smooth client-side navigation.
- Protect sensitive routes from unauthorized access.
- Support Role-Based Access Control (RBAC).
- Maintain a clean and scalable routing structure.
- Eliminate duplicate route definitions.
- Support nested layouts using React Router.
- Improve maintainability through configuration-based routing.

---

# 3. Routing Architecture Overview

The routing architecture consists of multiple layers that work together to determine which page should be rendered.

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
    ├───────────────┐
    ▼               ▼
PublicRoute   ProtectedRoute
                     │
                     ▼
             DashboardLayout
                     │
                     ▼
                 <Outlet />
                     │
                     ▼
             Requested Page
```

### Architecture Description

| Component | Responsibility |
|-----------|----------------|
| Browser | Sends the requested URL |
| main.jsx | Initializes the React application |
| App.jsx | Loads the application's routing system |
| AppRoutes.jsx | Registers all application routes |
| PublicRoute | Protects public pages such as Login |
| ProtectedRoute | Protects authenticated pages |
| DashboardLayout | Displays the common layout |
| Outlet | Renders the active page |
| Requested Page | Displays the requested screen |

---

# 4. Route Categories

The application divides routes into multiple categories based on authentication and user permissions.

---

## 4.1 Public Routes

Public routes can be accessed without authentication.

Current public routes include:

| Route | Description |
|--------|-------------|
| /login | User Login |

Characteristics:

- Accessible by everyone.
- No authentication required.
- Used only for login and future public pages.

---

## 4.2 Protected Routes

Protected routes require authentication before they can be accessed.

Examples:

```
/admin
/head-teacher
/class-teacher
/subject-teacher
```

Characteristics:

- JWT authentication required.
- User session validated.
- Role verification performed.
- Unauthorized users redirected.

---

## 4.3 Role-Based Routes

Each authenticated user has access only to the pages assigned to their role.

Current roles include:

- Administrator
- Head Teacher
- Class Teacher
- Subject Teacher

Example:

| User Role | Accessible Dashboard |
|------------|----------------------|
| Administrator | /admin |
| Head Teacher | /head-teacher |
| Class Teacher | /class-teacher |
| Subject Teacher | /subject-teacher |

Attempting to access another role's routes will result in redirection.

---

# 5. Routing Folder Structure

The routing system is organized inside the `routes` folder.

```
src/
└── routes/
    │
    ├── AppRoutes.jsx
    ├── PublicRoute.jsx
    ├── ProtectedRoute.jsx
    ├── adminRoutes.js
    ├── headTeacherRoutes.js
    ├── classTeacherRoutes.js
    └── subjectTeacherRoutes.js
```

Each file has a specific responsibility.

| File | Responsibility |
|------|----------------|
| AppRoutes.jsx | Registers all application routes |
| PublicRoute.jsx | Protects public pages |
| ProtectedRoute.jsx | Protects authenticated pages |
| adminRoutes.js | Admin route configuration |
| headTeacherRoutes.js | Head Teacher routes |
| classTeacherRoutes.js | Class Teacher routes |
| subjectTeacherRoutes.js | Subject Teacher routes |

This modular approach makes it easy to add new pages and user roles.

---

# 6. AppRoutes.jsx

`AppRoutes.jsx` serves as the central routing configuration of the application.

Responsibilities include:

- Registering all routes.
- Connecting layouts with pages.
- Loading role-specific route files.
- Defining public and protected routes.
- Managing nested routing.

Application routing flow:

```
App
 │
 ▼
AppRoutes
 │
 ├──────────────┐
 ▼              ▼
Public      Protected
 │              │
 ▼              ▼
Login      Dashboard Layout
                   │
                   ▼
               Dashboard Pages
```

Instead of declaring every route directly, the application imports route configuration files for each role and dynamically generates routes. This approach improves maintainability and scalability.

---

# 7. PublicRoute

The `PublicRoute` component manages pages that should only be visible to users who are **not authenticated**.

Typical examples include:

- Login
- Forgot Password (Future)
- Reset Password (Future)

The routing flow is illustrated below.

```
User Opens Login Page
        │
        ▼
Already Logged In?
        │
   ┌────┴────┐
   │         │
 Yes        No
   │         │
   ▼         ▼
Dashboard  Login Page
```

Responsibilities:

- Prevent authenticated users from returning to the login page.
- Redirect authenticated users to their respective dashboard.
- Allow unauthenticated users to access public pages.

---

# 8. ProtectedRoute

The `ProtectedRoute` component is responsible for securing authenticated pages.

Every protected route passes through this component before rendering.

```
User Requests URL
        │
        ▼
Check Authentication
        │
   ┌────┴────┐
   │         │
 No         Yes
   │         │
   ▼         ▼
Login    Check Role
               │
         ┌─────┴─────┐
         │           │
      Allowed     Not Allowed
         │           │
         ▼           ▼
 Dashboard     Redirect
```

Responsibilities:

- Verify authentication status.
- Validate the user session.
- Check the user's role.
- Prevent unauthorized page access.
- Redirect unauthorized users appropriately.

This component serves as the primary security layer on the frontend.

---
# 9. Nested Routing

The Digital Marksheet Management System uses **Nested Routing** to avoid repeating common user interface components such as the Navbar, Sidebar, and Footer on every page.

Instead of creating these components individually for each page, they are placed inside a common layout (`DashboardLayout`), and React Router's `<Outlet />` component renders the requested page within that layout.

## Nested Routing Flow

```
DashboardLayout
        │
        ├── Navbar
        ├── Sidebar
        ├── Footer
        │
        ▼
      <Outlet />
        │
        ▼
 Requested Dashboard Page
```

### Advantages

- Eliminates duplicate layout code.
- Ensures a consistent user interface.
- Simplifies maintenance.
- Makes adding new pages easier.
- Supports scalable application architecture.

---

# 10. Route Configuration Files

Instead of defining all routes directly inside `AppRoutes.jsx`, the application organizes routes into separate configuration files for each user role.

Current route configuration files include:

```
adminRoutes.js

headTeacherRoutes.js

classTeacherRoutes.js

subjectTeacherRoutes.js
```

Each configuration file exports an array of route objects.

Example structure:

```
[
    {
        path: "",
        element: <Dashboard />
    },
    {
        path: "employees",
        element: <Employees />
    }
]
```

These arrays are dynamically rendered using JavaScript's `map()` function.

```
Routes
      │
      ▼
Route Configuration Array
      │
      ▼
map()
      │
      ▼
<Route />
```

### Benefits

- Centralized route management.
- Easy to add new pages.
- Cleaner `AppRoutes.jsx`.
- Improved scalability.
- Reduced code duplication.

---

# 11. Navigation System

Navigation within the application is handled entirely by **React Router DOM**.

Whenever a user selects an option from the Sidebar or Navbar, React Router updates the URL and renders the corresponding page without refreshing the browser.

```
User Clicks Menu
        │
        ▼
Sidebar / Navbar
        │
        ▼
React Router
        │
        ▼
URL Updated
        │
        ▼
Matching Route Found
        │
        ▼
Page Rendered
```

This behavior provides a smooth **Single Page Application (SPA)** experience.

---

# 12. Sidebar Navigation

The Sidebar serves as the primary navigation component for authenticated users.

Each user role has its own menu configuration, ensuring that users only see the pages relevant to their responsibilities.

## Sidebar Flow

```
Logged-in User
        │
        ▼
Read User Role
        │
        ▼
Load Menu Configuration
        │
        ▼
Render Sidebar Menu
        │
        ▼
User Selects Menu
        │
        ▼
Navigate to Route
```

### Responsibilities

- Display role-specific navigation.
- Highlight the active page.
- Organize dashboard pages.
- Improve accessibility.
- Provide quick navigation between modules.

---

# 13. Navbar Navigation

The Navbar provides global navigation features that remain available regardless of the currently displayed page.

Typical Navbar features include:

- Application Title
- User Information
- Profile Menu
- Logout Button
- Sidebar Toggle (Mobile Devices)
- Current Date or Notifications (Future)

## Navbar Flow

```
Navbar
    │
    ├── User Information
    ├── Sidebar Toggle
    ├── Profile Menu
    └── Logout
```

Unlike the Sidebar, the Navbar provides application-wide functionality instead of page navigation.

---

# 14. Navigation Lifecycle

The complete navigation lifecycle is shown below.

```
User Clicks Sidebar Menu
          │
          ▼
React Router
          │
          ▼
URL Changes
          │
          ▼
AppRoutes.jsx
          │
          ▼
ProtectedRoute
          │
          ▼
DashboardLayout
          │
          ▼
<Outlet />
          │
          ▼
Requested Page Rendered
```

Each navigation request follows this sequence, ensuring that authentication, authorization, and layout rendering occur before the requested page is displayed.

---

# 15. Role-Based Navigation

Navigation is dynamically generated based on the authenticated user's role.

The frontend determines the appropriate dashboard and menu configuration using the user's role returned by the backend.

```
Backend Login Response
          │
          ▼
User Object
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

Current dashboard mappings include:

| Role | Dashboard Path |
|------|----------------|
| Administrator | `/admin` |
| Head Teacher | `/head-teacher` |
| Class Teacher | `/class-teacher` |
| Subject Teacher | `/subject-teacher` |

This design ensures that each user is automatically directed to the correct dashboard after successful authentication.

---

# 16. Navigation Error Handling

The routing system gracefully handles invalid navigation attempts.

## Unauthorized Access

If an unauthenticated user attempts to access a protected route, they are redirected to the Login page.

```
Protected Route
        │
        ▼
Authenticated?
        │
   ┌────┴────┐
   │         │
 No         Yes
   │         │
   ▼         ▼
Login      Continue
```

---

## Role Mismatch

If a user attempts to access another role's dashboard, access is denied and the user is redirected to an authorized page.

---

## Invalid Routes

Future enhancements may include a dedicated **404 Not Found** page for invalid URLs.

---

# 17. Routing Best Practices

The routing architecture follows several best practices to ensure scalability and maintainability.

- Use nested routing to reduce duplicated layouts.
- Separate public and protected routes.
- Implement role-based route protection.
- Organize routes using configuration files.
- Keep routing logic centralized.
- Use reusable layouts.
- Follow clean and meaningful URL structures.
- Prevent unauthorized access using ProtectedRoute.
- Keep navigation components independent of page components.

Following these practices simplifies future development and improves overall application quality.

---

# 18. Complete Routing and Navigation Flow

The complete routing lifecycle is illustrated below.

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
    ▼
PublicRoute / ProtectedRoute
    │
    ▼
Authentication Check
    │
    ▼
Role Verification
    │
    ▼
DashboardLayout
    │
 ┌──┴───────────────┐
 ▼                  ▼
Navbar          Sidebar
                     │
                     ▼
                  <Outlet />
                     │
                     ▼
             Requested Page
                     │
                     ▼
           React Component Rendered
```

This flow demonstrates how the application processes every navigation request while ensuring authentication, authorization, and consistent layout rendering.

---

# 19. Summary

The routing and navigation architecture of the Digital Marksheet Management System is designed to be secure, modular, and scalable. By combining React Router DOM, nested routing, role-based access control, protected routes, and configuration-based route management, the application delivers a seamless navigation experience while maintaining a clear separation of responsibilities.

The modular routing approach allows developers to add new pages, dashboards, and user roles with minimal changes to the existing codebase. This architecture improves maintainability, enhances security, and provides a consistent user experience across all modules of the system.

---
