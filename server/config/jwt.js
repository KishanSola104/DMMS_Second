const jwt = require("jsonwebtoken");

/**
 * Generate JWT for School
 */
const generateSchoolToken = (school) => {
    return jwt.sign(
        {
            _id: school._id,
            schoolId: school.schoolId,
            type: "school",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h",
        }
    );
};

/**
 * Generate JWT for Employee
 */

const generateEmployeeToken = (employee) => {
    return jwt.sign(
        {
            _id: employee._id,
            employeeId: employee.employeeId,
            schoolId: employee.schoolId,

            // Preserve both fields for compatibility
            roleId: employee.roleId,
            roleCode: employee.roleCode || employee.roleId,

            type: "employee",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "8h",
        }
    );
};

/**
 * Verify JWT
 */
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateSchoolToken,
    generateEmployeeToken,
    verifyToken,
};