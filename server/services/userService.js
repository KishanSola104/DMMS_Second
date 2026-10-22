const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const employeeService = require("./employeeService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getRole } = require("./roleService");

const login = async (loginData) => {
  try {
    let { userId, password, role } = loginData;
    role = Number(role);
    const emp = await Employee.findOne({
      employeeId: userId.toUpperCase(),
    });
    // console.log(emp);

    const data = await employeeService.getEmployeeById(userId);

    if (!data || !data.employee) {
      return {
        success: false,
        message: "Invalid Employee ID",
      };
    }

    const employee = data.employee;

    // Check selected role
    if (!employee.role.includes(role)) {
      return {
        success: false,
        message: "Please select Valid Role",
      };
    }

    const roleName = await getRole(role);

    let user = await User.findOne({
      employeeId: employee._id,
    });

    // ==========================
    // USER ALREADY EXISTS
    // ==========================
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return {
          success: false,
          message: "Invalid Password",
        };
      }

      const token = jwt.sign(
        {
          employeeId: employee.employeeId,
          id: employee._id,
          roleIds: role,
          schoolId: emp.schoolId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );

      return {
        success: true,
        message: "Login Successful",
        token,
        user: {
          id: user._id,
          userId: user.userId,
          userName: user.userName,
          role: roleName.message,
          designation: employee.designation,
          department: employee.department,
          status: user.accountStatus,
        },
      };
    }

    // ==========================
    // FIRST TIME LOGIN
    // ==========================

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      userId: employee.employeeId,
      userName: employee.firstName,
      password: hashedPassword,
      roleIds: employee.role,
      employeeId: employee._id,
      status: "Active",
    });

    const token = jwt.sign(
      {
        employeeId: employee.employeeId,
        id: employee._id,
        roleIds: role,
        schoolId: emp.schoolId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return {
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        userId: user.userId,
        userName: user.userName,
        role: roleName.message,
        designation: employee.designation,
        department: employee.department,
        status: user.accountStatus,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
};