const employeeModel = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const generateUserId = require("../helpers/generateUserId");
const schoolModel = require("../models/schoolModel");
const employeeCredentialsTemplate = require("./emailTemplates/employeeCredentialsTemplate");
const { sendEmail } = require("./emailService");
const generatePassword = require("../helpers/generatePassword");
const userModel = require("../models/userModel");

class EmployeeService {

    // Create Employee
    async createEmployee(employeeData, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const school = await schoolModel.findById(schoolId);

            if (!school) {
                throw new Error("School not found.");
            }

            const password = generatePassword(employeeData.firstName);
            const hashedPassword = await bcrypt.hash(password, 10);

            const employeeId = await generateUserId(
                school.schoolName,
                employeeData.firstName,
                employeeData.lastName
            );

            const employee = new employeeModel({
                ...employeeData,
                employeeId,
                schoolId
            });

            await employee.save();

            try {
                await userModel.create({
                    userId: employee.employeeId,
                    userName: employee.firstName,
                    password: hashedPassword,
                    roleIds: employeeData.role,
                    employeeId: employee._id,
                    accountStatus: "Active"
                });

                await sendEmail({
                    to: employee.email,
                    subject: "Account Created",
                    html: employeeCredentialsTemplate({
                        employeeName: `${employee.firstName} ${employee.lastName}`,
                        employeeId: employee.employeeId,
                        userId: employee.employeeId,
                        designation: employee.designation,
                        password,
                        loginUrl: `${process.env.CLIENT_URL}/login`
                    })
                });
            } catch (error) {
                await userModel.deleteOne({ employeeId: employee._id });
                await employeeModel.deleteOne({ _id: employee._id });
                throw error;
            }

            return {
                success: true,
                message: "Employee created successfully.",
                employee
            };
        } catch (error) {
            throw new Error(`Error creating employee: ${error.message}`);
        }
    }

    // Get All Employees by School ID
    async getEmployee(schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employees = await employeeModel
                .find({ schoolId })
                .populate("schoolId", "schoolName email phone");

            return {
                success: true,
                message: "Employees fetched successfully.",
                employees
            };
        } catch (error) {
            throw new Error(`Error fetching employees: ${error.message}`);
        }
    }

    // Get Employee by Employee ID
    async getEmployeeById(employeeId, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employee = await employeeModel.findOne({
                employeeId,
                schoolId
            });

            if (!employee) {
                throw new Error("Employee not found.");
            }

            return {
                success: true,
                message: "Employee fetched successfully.",
                employee
            };
        } catch (error) {
            throw new Error(`Error fetching employee: ${error.message}`);
        }
    }

    // Get Employee by Name
    async getEmployeeByName(name, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employee = await employeeModel.findOne({
                firstName: name,
                schoolId
            });

            if (!employee) {
                throw new Error("Employee not found.");
            }

            return {
                success: true,
                message: "Employee fetched successfully.",
                employee
            };
        } catch (error) {
            throw new Error(`Error fetching employee by name: ${error.message}`);
        }
    }

    // Update Employee by Employee ID
    async updateEmployeeById(employeeId, updateData, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            // Prevent changing ownership or system-managed fields
            const {
                _id,
                employeeId: ignoredEmployeeId,
                schoolId: ignoredSchoolId,
                ...safeUpdateData
            } = updateData;

            const employee = await employeeModel.findOneAndUpdate(
                { employeeId, schoolId },
                { $set: safeUpdateData },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!employee) {
                throw new Error("Employee not found.");
            }

            return {
                success: true,
                message: "Employee updated successfully.",
                data: employee
            };
        } catch (error) {
            throw new Error(`Error updating employee: ${error.message}`);
        }
    }

    // Delete Employee by Employee ID
    async deleteById(employeeId, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employee = await employeeModel.findOneAndDelete({
                employeeId,
                schoolId
            });

            if (!employee) {
                throw new Error("Employee not found.");
            }

            await userModel.deleteOne({
                employeeId: employee._id
            });

            return {
                success: true,
                message: "Employee deleted successfully."
            };
        } catch (error) {
            throw new Error(`Error deleting employee: ${error.message}`);
        }
    }

    // Toggle Employee Status
    async statusChangeById(employeeId, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employee = await employeeModel.findOne({
                employeeId,
                schoolId
            });

            if (!employee) {
                throw new Error("Employee not found.");
            }

            employee.status =
                employee.status === "Active" ? "Inactive" : "Active";

            await employee.save();

            await userModel.updateOne(
                { employeeId: employee._id },
                { $set: { accountStatus: employee.status } }
            );

            return {
                success: true,
                message: "Employee status changed successfully.",
                data: employee
            };
        } catch (error) {
            throw new Error(`Error changing employee status: ${error.message}`);
        }
    }

    // Get Employee by Email
    async getEmployeesByEmail(email, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const employee = await employeeModel.findOne({
                email: email.toLowerCase(),
                schoolId
            });

            if (!employee) {
                throw new Error("Employee not found.");
            }

            return {
                success: true,
                message: "Employee fetched successfully.",
                employee
            };
        } catch (error) {
            throw new Error(`Error fetching employee by email: ${error.message}`);
        }
    }

    // Get Employees by Role
    async getEmployeesByRole(roleId, schoolId) {
        try {
            if (!schoolId) {
                throw new Error("School Id is required.");
            }

            const users = await userModel
                .find({ roleIds: roleId })
                .select("employeeId");

            if (users.length === 0) {
                return {
                    success: false,
                    message: "No employees found for this role."
                };
            }

            const employeeIds = users.map(user => user.employeeId);

            const employees = await employeeModel.find({
                _id: { $in: employeeIds },
                schoolId
            });

            if (employees.length === 0) {
                return {
                    success: false,
                    message: "No employees found for this role in this school."
                };
            }

            return {
                success: true,
                message: "Employees fetched successfully.",
                employees
            };
        } catch (error) {
            throw new Error(`Error fetching employees by role: ${error.message}`);
        }
    }
}

module.exports = new EmployeeService();