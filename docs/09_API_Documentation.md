1. Employees -> http://localhost:8000/employees -> post
-> need token
->adding a employee
request
{
  "employeeId": "EMP001",
  "firstName": "Admin",
  "lastName": "Admin",
  "gender": "Male",
  "dob": "1990-01-01",
  "email": "admin@dmms.com",
  "mobileNumber": "1111111111",
  "address": "School Office, Ahmedabad",
  "qualification": "M.Ed",
  "experience": "10 Years",
  "joiningDate": "2026-07-15",
  "designation": "ADMIN",
  "department": "Administration",
  "salary": 100000,
  "status": true,
  "role": [1, 2, 3]
}
response
{
    "success": true,
    "data": {
        "message": "Employee created successfully",
        "employee": {
            "employeeId": "EMP001",
            "firstName": "Admin",
            "lastName": "Admin",
            "gender": "Male",
            "dob": "1990-01-01T00:00:00.000Z",
            "email": "admin@dmms.com",
            "mobileNumber": "1111111111",
            "address": "School Office, Ahmedabad",
            "qualification": "M.Ed",
            "experience": "10 Years",
            "joiningDate": "2026-07-15T00:00:00.000Z",
            "role": [
                1,
                2,
                3
            ],
            "designation": "ADMIN",
            "department": "Administration",
            "salary": 100000,
            "status": true,
            "_id": "6a5fa984635c40e70a81c434",
            "createdAt": "2026-07-21T17:16:52.522Z",
            "updatedAt": "2026-07-21T17:16:52.522Z",
            "__v": 0
        }
    }
}

-> http://localhost:8000/employees -> get
->authenticated(need token)
->return all employess

-> http://localhost:8000/employees/get/(EMP001) -> get
(EMP001)->will be id of the employee
->authenticated

->http://localhost:8000/employees/getByName/(Admin) -> get
(Admin)->name of the employee
->authenticated

->http://localhost:8000/employees/role/1 -> get
(1)->roles
->authenticated

2. login -> http://localhost:8000/login -> post

login if pass match and user is in user collection
-> if not in user collection password will be updated in employee collection
request
{
    "id":"dum01",
    "password":"admin",
    "cnfPass":"admin",
    "role":1
}
response
{
    "success": true,
    "message": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiZHVtMDEiLCJpZCI6IjZhNTdjN2ViM2E0MzRkYTE4MjZmNjZkYiIsInJvbGVJZHMiOlsxLDJdLCJpYXQiOjE3ODQ2NTQzNTUsImV4cCI6MTc4NDY4MzE1NX0.MhurBMpthLHlXXJfZPLb4tPK08Ga37Od9PfM2CycWdM",
    "user": {
        "id": "6a5fa8db3963caf7bd871c37",
        "userId": "dum01",
        "userName": "Admin",
        "role": "SUPER_ADMIN",
        "designation": "ADMIN",
        "department": "Administration",
        "status": "Active"
    }
}

3. roles -> http://localhost:8000/roles -> post
->for adding roles
request:
    {
        "roleId": 1,
        "roleName": "SUPER_ADMIN"
    }
response:
    {
    "success": true,
    "message": "Role added successfully.",
    "role": {
        "roleId": 1,
        "roleName": "SUPER_ADMIN",
        "_id": "6a64f3f39ea5b190bab29de2",
        "createdAt": "2026-07-25T17:35:47.116Z",
        "updatedAt": "2026-07-25T17:35:47.116Z",
        "__v": 0
    }
}

-> get All Roles :  http://localhost:8000/roles -> get

-> get Role By id:  http://localhost:8000/roles/1  ->get  (1 is the roleId)




// Kishan's API's 

Authentication API Documentation

Base URL

http://localhost:8000/api/auth
1. Register School
URL
POST /register-school
Purpose

Registers a new school along with the School Admin, User Account, and sends login credentials via email.

Request Body
{
    "schoolName": "Knowledge Bright Public School",
    "email": "school@gmail.com",
    "phone": "9876543210",
    "address": "Vadodara, Gujarat",
    "establishedYear": 2020,
    "website": "https://kbps.com",

    "firstName": "Kishan",
    "lastName": "Solanki",
    "gender": "Male",
    "dateOfBirth": "2005-05-20",
    "mobileNumber": "9876543210",
    "alternateMobileNumber": "9876543211",
    "employeeEmail": "admin@gmail.com"
}
Success Response
{
    "success": true,
    "message": "School registered successfully."
}
2. School Login
URL
POST /school-login
Purpose

Authenticates the school and returns a JWT token.

Request Body
{
    "schoolId": "KBPSVLG005",
    "password": "SchoolPassword"
}
Success Response
{
    "success": true,
    "message": "School login successful.",
    "token": "JWT_TOKEN",
    "school": {
        "id": "...",
        "schoolId": "KBPSVLG005",
        "schoolName": "Knowledge Bright Public School",
        "email": "school@gmail.com",
        "phone": "9876543210",
        "status": "Active"
    }
}
3. Verify School
URL
GET /verify-school
Purpose

Verifies the logged-in school using the JWT token.

Authorization
Bearer <School JWT Token>
Success Response
{
    "success": true,
    "message": "School verified successfully.",
    "school": {
        "id": "...",
        "schoolId": "KBPSVLG005",
        "schoolName": "Knowledge Bright Public School",
        "email": "school@gmail.com",
        "phone": "9876543210",
        "status": "Active"
    }
}
4. Employee Login
URL
POST /employee-login
Purpose

Authenticates Admin, Head Teacher, Class Teacher, Subject Teacher, and Clerk.

Request Body
{
    "userId": "KBPSKSOYX005",
    "password": "Password"
}
Success Response
{
    "success": true,
    "message": "Login successful.",
    "token": "JWT_TOKEN",
    "user": {
        "userId": "KBPSKSOYX005",
        "userName": "Kishan Solanki",
        "roleIds": [1],
        "status": "Active"
    },
    "employee": {
        "employeeId": "KBPSKSOYX005",
        "designation": "Admin",
        "department": "Administration"
    }
}
5. Forgot Password
URL
POST /forgot-password
Purpose

Generates a temporary password and sends it to the employee's registered email.

Request Body
{
    "userId": "KBPSKSOYX005"
}
Success Response
{
    "success": true,
    "message": "A temporary password has been sent to your registered email."
}
6. Change Password
URL
POST /change-password
Purpose

Allows a logged-in employee to change their password.

Authorization
Bearer <Employee JWT Token>
Request Body
{
    "currentPassword": "OldPassword",
    "newPassword": "NewPassword123"
}
Success Response
{
    "success": true,
    "message": "Password changed successfully."
}
7. Logout
URL
POST /logout
Purpose

Logs out the current user. Since JWT authentication is stateless, the frontend should remove the stored token and user information after receiving this response.

Authorization
Bearer <JWT Token>
Request Body
{}
Success Response
{
    "success": true,
    "message": "Logged out successfully."
}