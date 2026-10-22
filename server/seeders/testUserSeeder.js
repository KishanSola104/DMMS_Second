const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const connectDB = require("../config/db");

const School = require("../models/schoolModel");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const PASSWORD = "Password@123";

async function createEmployeeUser({
  school,
  roleCode,
  employeeId,
  firstName,
  lastName,
  email,
  mobileNumber,
}) {
  const role = await Role.findOne({
    roleCode,
    isActive: true,
  });

  if (!role) {
    console.log(`Role ${roleCode} not found.`);
    return;
  }

  let employee = await Employee.findOne({ employeeId });

  if (!employee) {
    employee = await Employee.create({
      employeeId,
      schoolId: school._id,

      firstName,
      lastName,

      gender: "Male",

      email,
      mobileNumber,

      designation: roleCode,

      status: "Active",
    });

    console.log(`Employee Created : ${employeeId}`);
  } else {
    console.log(`Employee Exists  : ${employeeId}`);
  }

  let user = await User.findOne({
    employeeId: employee._id,
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    user = await User.create({
      employeeId: employee._id,

      userId: employee.employeeId,

      userName: `${firstName} ${lastName}`,

      roleIds: [role._id],

      password: hashedPassword,

      accountStatus: "Active",
    });

    console.log(`User Created     : ${employeeId}`);
  } else {
    console.log(`User Exists      : ${employeeId}`);
  }
}

async function seedTestUsers() {
  try {
    await connectDB();

    //--------------------------------------------------------
    // Find School
    //--------------------------------------------------------

    //--------------------------------------------------------
    // Find First School
    //--------------------------------------------------------

    const school = await School.findOne();

    if (!school) {
      console.log("No school found.");
      console.log("Please register a school first.");
      process.exit(0);
    }

    console.log(`Using School : ${school.schoolName}`);

    //--------------------------------------------------------
    // Administrator
    //--------------------------------------------------------

    await createEmployeeUser({
      school,

      roleCode: "ADMIN",

      employeeId: "KBPSADM001",

      firstName: "Kishan",

      lastName: "Solanki",

      email: "admin@kbps.com",

      mobileNumber: "9000000001",
    });

    //--------------------------------------------------------
    // Head Teacher
    //--------------------------------------------------------

    await createEmployeeUser({
      school,

      roleCode: "HEAD_TEACHER",

      employeeId: "KBPSHD001",

      firstName: "Rajesh",

      lastName: "Patel",

      email: "head@kbps.com",

      mobileNumber: "9000000002",
    });

    //--------------------------------------------------------
    // Class Teacher
    //--------------------------------------------------------

    await createEmployeeUser({
      school,

      roleCode: "CLASS_TEACHER",

      employeeId: "KBPSCT001",

      firstName: "Meena",

      lastName: "Shah",

      email: "class@kbps.com",

      mobileNumber: "9000000003",
    });

    //--------------------------------------------------------
    // Subject Teacher
    //--------------------------------------------------------

    await createEmployeeUser({
      school,

      roleCode: "SUBJECT_TEACHER",

      employeeId: "KBPSST001",

      firstName: "Amit",

      lastName: "Joshi",

      email: "subject@kbps.com",

      mobileNumber: "9000000004",
    });

    //--------------------------------------------------------
    // Office Staff
    //--------------------------------------------------------

    await createEmployeeUser({
      school,

      roleCode: "OFFICE_STAFF",

      employeeId: "KBPSOS001",

      firstName: "Neha",

      lastName: "Patel",

      email: "office@kbps.com",

      mobileNumber: "9000000005",
    });

    console.log("\n--------------------------------");
    console.log("Test Users Seeded Successfully");
    console.log("--------------------------------");

    console.log("\nLogin Credentials\n");

    console.table([
      {
        Role: "Administrator",
        UserID: "KBPSADM001",
        Password: PASSWORD,
      },
      {
        Role: "Head Teacher",
        UserID: "KBPSHD001",
        Password: PASSWORD,
      },
      {
        Role: "Class Teacher",
        UserID: "KBPSCT001",
        Password: PASSWORD,
      },
      {
        Role: "Subject Teacher",
        UserID: "KBPSST001",
        Password: PASSWORD,
      },
      {
        Role: "Office Staff",
        UserID: "KBPSOS001",
        Password: PASSWORD,
      },
    ]);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedTestUsers();
