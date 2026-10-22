const employeeService = require("../services/employeeService");

class EmployeeController {

    // Create Employee
    async createEmployee(req, res) {
        try {
            const schoolId = req.user.schoolId;

            console.log("Authenticated user:", req.user);
            
            const employee = await employeeService.createEmployee(
                req.body,
                schoolId
            );

            return res.status(201).json(employee);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get All Employees of Logged-in School
    async getEmployee(req, res) {
        try {
            const employees = await employeeService.getEmployee(
                req.user.schoolId
            );

            return res.status(200).json(employees);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get Employee by ID
    async getEmployeeById(req, res) {
        try {
            const employee = await employeeService.getEmployeeById(
                req.params.id,
                req.user.schoolId
            );

            return res.status(200).json(employee);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get Employees by Name
    async getEmployeeByName(req, res) {
        try {
            const employees = await employeeService.getEmployeeByName(
                req.params.name,
                req.user.schoolId
            );

            return res.status(200).json(employees);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update Employee
    async updateEmployeeById(req, res) {
        try {
            const employee = await employeeService.updateEmployeeById(
                req.params.id,
                req.body,
                req.user.schoolId
            );

            return res.status(200).json(employee);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete Employee
    async deleteById(req, res) {
        try {
            const result = await employeeService.deleteById(
                req.params.id,
                req.user.schoolId
            );

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Change Employee Status
    async statusChangeById(req, res) {
        try {
            const employee = await employeeService.statusChangeById(
                req.params.id,
                req.user.schoolId
            );

            return res.status(200).json(employee);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get Employees by Email
    async getEmployeesByEmail(req, res) {
        try {
            const employees = await employeeService.getEmployeesByEmail(
                req.params.email,
                req.user.schoolId
            );

            return res.status(200).json(employees);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get Employees by Role
    async getEmployeesByRole(req, res) {
        try {
            const result = await employeeService.getEmployeesByRole(
                req.params.roleId,
                req.user.schoolId
            );

            if (!result.success) {
                return res.status(404).json(result);
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new EmployeeController();