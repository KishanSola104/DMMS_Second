const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

// Create Employee
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    employeeController.createEmployee.bind(employeeController)
);

// Get All Employees By School ID
router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    employeeController.getEmployee.bind(employeeController)
);

// Get Employee By Employee ID
router.get(
    "/get/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.getEmployeeById.bind(employeeController)
);

// Get Employee By Name
router.get(
    "/getByName/:name",
    authenticate,
    authorize("ADMIN"),
    employeeController.getEmployeeByName.bind(employeeController)
);

// Update Employee
router.put(
    "/update/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.updateEmployeeById.bind(employeeController)
);

// Delete Employee
router.delete(
    "/delete/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.deleteById.bind(employeeController)
);

// Activate / Deactivate Employee
router.patch(
    "/status/:id",
    authenticate,
    authorize("ADMIN"),
    employeeController.statusChangeById.bind(employeeController)
);

// Get Employee By Email
router.get(
    "/email/:email",
    authenticate,
    authorize("ADMIN"),
    employeeController.getEmployeesByEmail.bind(employeeController)
);

// Get Employee By Role
router.get(
    "/role/:roleId",
    authenticate,
    authorize("ADMIN"),
    employeeController.getEmployeesByRole.bind(employeeController)
);

module.exports = router;
