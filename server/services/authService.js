const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const School = require("../models/schoolModel");
const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

const generateSchoolId = require("../helpers/generateSchoolId");
const generateUserId = require("../helpers/generateUserId");
const generatePassword = require("../helpers/generatePassword");

const {
  generateEmployeeToken,
  generateSchoolToken,
} = require("../config/jwt");

const { sendEmail } = require("./emailService");

const schoolRegistrationTemplate = require(
  "./emailTemplates/schoolRegistrationTemplate"
);
const employeeCredentialsTemplate = require(
  "./emailTemplates/employeeCredentialsTemplate"
);
const forgotPasswordTemplate = require(
  "./emailTemplates/forgotPasswordTemplate"
);

// ==========================================
// AUTH SERVICE CLASS
// ==========================================

class AuthService {
  // ==========================================
  // REGISTER SCHOOL
  // ==========================================


  async registerSchool(data) {
    // 1. Validate request body
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Invalid registration data.");
    }
  
    const {
      schoolName,
      email,
      phone,
      address,
      establishedYear,
      website,
  
      firstName,
      lastName,
      gender,
      dob,
      mobileNumber,
      qualification,
      experience,
      joiningDate,
      department,
      salary,
      designation,
    } = data;
  
    // 2. Validate required fields
    const requiredFields = {
      schoolName,
      email,
      phone,
      address,
      establishedYear,
      firstName,
      lastName,
      mobileNumber,
      designation,
    };
  
    for (const [field, value] of Object.entries(requiredFields)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        throw new Error(`${field} is required.`);
      }
    }
  
    // 3. Normalize values
    const normalizedSchoolName = schoolName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedSchoolPhone = String(phone).trim();
    const normalizedAdminMobile = String(mobileNumber).trim();
  
    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Please enter a valid email address.");
    }
  
    // 5. Validate Indian mobile numbers
    // Accepts 10 digits beginning with 6, 7, 8, or 9.
    const mobileRegex = /^[6-9]\d{9}$/;
  
    if (!mobileRegex.test(normalizedSchoolPhone)) {
      throw new Error(
        "School phone must be a valid 10-digit Indian mobile number."
      );
    }
  
    if (!mobileRegex.test(normalizedAdminMobile)) {
      throw new Error(
        "Administrator mobile must be a valid 10-digit Indian mobile number."
      );
    }
  
    // 6. Validate established year
    const year = Number(establishedYear);
    const currentYear = new Date().getFullYear();
  
    if (
      !Number.isInteger(year) ||
      year < 1800 ||
      year > currentYear
    ) {
      throw new Error(
        `Established year must be between 1800 and ${currentYear}.`
      );
    }
  
    // 7. Check existing school email
    const existingSchoolEmail = await School.findOne({
      email: normalizedEmail,
    });
  
    if (existingSchoolEmail) {
      throw new Error("School already registered with this email.");
    }
  
    // 8. Check existing school phone
    const existingSchoolPhone = await School.findOne({
      phone: normalizedSchoolPhone,
    });
  
    if (existingSchoolPhone) {
      throw new Error("School already registered with this phone number.");
    }
  
    // 9. Check existing employee email
    const existingEmployeeEmail = await Employee.findOne({
      email: normalizedEmail,
    });
  
    if (existingEmployeeEmail) {
      throw new Error("Employee already exists with this email.");
    }
  
    // 10. Check existing employee mobile
    const existingEmployeeMobile = await Employee.findOne({
      mobileNumber: normalizedAdminMobile,
    });
  
    if (existingEmployeeMobile) {
      throw new Error(
        "Employee already exists with this mobile number."
      );
    }
  
    // 11. Generate IDs
    const schoolId = await generateSchoolId(normalizedSchoolName);
  
    const employeeId = await generateUserId(
      normalizedSchoolName,
      firstName.trim(),
      lastName.trim()
    );
  
    const userId = employeeId;
  
    // 12. Generate and hash passwords
    const schoolPassword = generatePassword(normalizedSchoolName);
    const adminPassword = generatePassword(firstName.trim());
  
    const hashedSchoolPassword = await bcrypt.hash(schoolPassword, 10);
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
  
    // 13. Find ADMIN role before creating records
    const adminRole = await Role.findOne({ roleCode: "ADMIN" });
  
    if (!adminRole) {
      throw new Error("Administrator role not found.");
    }
  
    // 14. Create school
    const school = await School.create({
      schoolId,
      schoolName: normalizedSchoolName,
      email: normalizedEmail,
      password: hashedSchoolPassword,
      phone: normalizedSchoolPhone,
      address: address.trim(),
      establishedYear: year,
      website: website?.trim() || null,
    });
  
    try {
      // 15. Create administrator employee
      const employee = await Employee.create({
        employeeId,
        schoolId: school._id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender,
        dob,
        email: normalizedEmail,
        mobileNumber: normalizedAdminMobile,
        qualification,
        experience,
        joiningDate,
        department,
        salary,
        designation: designation.trim(),
        status: "Active",
      });
  
      // 16. Create administrator user account
      const user = await User.create({
        employeeId: employee._id,
        userId,
        userName: `${firstName.trim()} ${lastName.trim()}`,
        roleIds: [adminRole._id],
        password: hashedAdminPassword,
        accountStatus: "Active",
      });
  
      // 17. Send school credentials
      await sendEmail({
        to: school.email,
        subject: "School Registration Successful",
        html: schoolRegistrationTemplate({
          schoolName: school.schoolName,
          schoolId: school.schoolId,
          password: schoolPassword,
          loginUrl: `${process.env.CLIENT_URL}/school-login`,
        }),
      });
  
      // 18. Send administrator credentials
      await sendEmail({
        to: employee.email,
        subject: "Administrator Account Created",
        html: employeeCredentialsTemplate({
          employeeName: `${employee.firstName} ${employee.lastName}`,
          employeeId: employee.employeeId,
          userId: user.userId,
          password: adminPassword,
          designation: employee.designation,
          loginUrl: `${process.env.CLIENT_URL}/login`,
        }),
      });
  
      return {
        success: true,
        message: "School registered successfully.",
        school: {
          schoolId: school.schoolId,
          schoolName: school.schoolName,
          email: school.email,
        },
        admin: {
          userId: user.userId,
          employeeId: employee.employeeId,
          name: user.userName,
          email: employee.email,
        },
      };
    } catch (error) {
      // Basic cleanup if employee/user creation or email delivery fails.
      // This is not fully atomic; a MongoDB transaction is safer.
      await School.findByIdAndDelete(school._id);
      throw error;
    }
  }
  
  // ==========================================
  // SCHOOL LOGIN
  // ==========================================

  async schoolLogin(data) {
    try {
      const { schoolId, password } = data;

      // ==========================
      // Find School
      // ==========================

      const school = await School.findOne({
        schoolId: schoolId.toUpperCase(),
      });

      if (!school) {
        throw new Error("Invalid School ID or Password.");
      }

      // ==========================
      // Check School Status
      // ==========================

      if (school.status !== "Active") {
        throw new Error("School account is inactive.");
      }

      // ==========================
      // Compare Password
      // ==========================

      const isPasswordCorrect = await bcrypt.compare(
        password,
        school.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Invalid School ID or Password.");
      }

      // ==========================
      // Generate JWT
      // ==========================

      const token = generateSchoolToken({
        _id: school._id,
        schoolId: school.schoolId,
      });

      // ==========================
      // Return Response
      // ==========================

      return {
        success: true,

        message: "School login successful.",

        token,

        school: {
          id: school._id,

          schoolId: school.schoolId,

          schoolName: school.schoolName,

          email: school.email,

          phone: school.phone,

          address: school.address,

          establishedYear: school.establishedYear,

          website: school.website,

          status: school.status,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ==========================================
  // VERIFY SCHOOL SESSION
  // ==========================================

  async verifySchool(user) {
    try {
      // ==========================
      // Find School
      // ==========================

      const school = await School.findById(user._id);

      if (!school) {
        throw new Error("School not found.");
      }

      // ==========================
      // Check School Status
      // ==========================

      if (school.status !== "Active") {
        throw new Error("School account is inactive.");
      }

      // ==========================
      // Return Response
      // ==========================

      return {
        success: true,

        message: "School verified successfully.",

        school: {
          id: school._id,

          schoolId: school.schoolId,

          schoolName: school.schoolName,

          email: school.email,

          phone: school.phone,

          address: school.address,

          establishedYear: school.establishedYear,

          website: school.website,

          status: school.status,

          createdAt: school.createdAt,

          updatedAt: school.updatedAt,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ==========================================
  // EMPLOYEE LOGIN
  // ==========================================


  async employeeLogin(data) {
    // 1. Validate request data
    if (!data || typeof data !== "object") {
      throw new Error("Invalid login request.");
    }
  
    const { userId, password, role } = data;
  
    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("User ID or email is required.");
    }
  
    if (typeof password !== "string" || !password) {
      throw new Error("Password is required.");
    }
  
    if (typeof role !== "string" || !role.trim()) {
      throw new Error("Please select a role.");
    }
  
    const identifier = userId.trim();
    const selectedRoleCode = role.trim().toUpperCase();
  
    // 2. Find the user by User ID or email
    let user;
  
    if (identifier.includes("@")) {
      const employee = await Employee.findOne({
        email: identifier.toLowerCase(),
      });
  
      if (employee) {
        user = await User.findOne({
          employeeId: employee._id,
        })
          .populate("employeeId")
          .populate("roleIds");
      }
    } else {
      user = await User.findOne({
        userId: identifier.toUpperCase(),
      })
        .populate("employeeId")
        .populate("roleIds");
    }
  
    // Use a generic message for invalid credentials
    if (!user || !user.employeeId) {
      throw new Error("Invalid User ID/email or password.");
    }
  
    // 3. Verify password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
  
    if (!isPasswordCorrect) {
      throw new Error("Invalid User ID/email or password.");
    }
  
    // 4. Check account status
    if (user.accountStatus !== "Active") {
      throw new Error("Your account is inactive. Please contact your administrator.");
    }
  
    // 5. Verify selected role is assigned to the user
    const selectedRole = user.roleIds.find(
      (r) => r.roleCode.toUpperCase() === selectedRoleCode
    );
  
    if (!selectedRole) {
      throw new Error(
        "You are not authorized to log in with the selected role."
      );
    }
  
    // 6. Ensure employee has a school association
    const employee = user.employeeId;
  
    if (!employee.schoolId) {
      throw new Error(
        "Your account is not associated with a school. Please contact your administrator."
      );
    }
  
    // 7. Generate JWT using the existing token helper
    const token = generateEmployeeToken({
      _id: employee._id,
      employeeId: employee.employeeId,
      schoolId: employee.schoolId,
      roleId: selectedRole.roleCode,
      roleCode: selectedRole.roleCode,
    });
  
    // 8. Return the existing response structure
    return {
      success: true,
      message: "Login successful.",
      token,
  
      user: {
        id: user._id,
        userId: user.userId,
        userName: user.userName,
        accountStatus: user.accountStatus,
        role: {
          id: selectedRole._id,
          code: selectedRole.roleCode,
          name: selectedRole.roleName,
        },
      },
  
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
        designation: employee.designation,
        department: employee.department,
        schoolId: employee.schoolId,
        email: employee.email,
      },
    };
  }
  

  // ==========================================
  // LOGOUT
  // ==========================================

  async logout() {
    return {
      success: true,

      message: "Logged out successfully.",
    };
  }

  // ==========================================
  // FORGOT PASSWORD
  // ==========================================

  async forgotPassword(data) {
    try {
      const { userId } = data;

      // ==========================
      // Find User
      // ==========================

      const user = await User.findOne({
        userId: userId.toUpperCase(),
      }).populate("employeeId");

      if (!user) {
        throw new Error("User not found.");
      }

      // ==========================
      // Generate Temporary Password
      // ==========================

      const temporaryPassword = generatePassword(
        user.employeeId.firstName
      );

      // ==========================
      // Hash Password
      // ==========================

      const hashedPassword = await bcrypt.hash(
        temporaryPassword,
        10
      );

      // ==========================
      // Update Password
      // ==========================

      user.password = hashedPassword;

      await user.save();

      // ==========================
      // Send Email
      // ==========================

      await sendEmail({
        to: user.employeeId.email,

        subject: "DMMS - Temporary Password for Your Account",

        html: forgotPasswordTemplate({
          employeeName: `${user.employeeId.firstName} ${user.employeeId.lastName}`,

          password: temporaryPassword,
        }),
      });

      // ==========================
      // Response
      // ==========================

      return {
        success: true,

        message:
          "A temporary password has been sent to your registered email.",
      };
    } catch (error) {
      throw error;
    }
  }

  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  async changePassword(user, data) {
    try {
      const { currentPassword, newPassword } = data;

      // ==========================
      // Find User
      // ==========================

      const existingUser = await User.findOne({
        employeeId: user.id,
      });

      if (!existingUser) {
        throw new Error("User not found.");
      }

      // ==========================
      // Compare Current Password
      // ==========================

      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        throw new Error("Current password is incorrect.");
      }

      // ==========================
      // Prevent Same Password
      // ==========================

      const isSamePassword = await bcrypt.compare(
        newPassword,
        existingUser.password
      );

      if (isSamePassword) {
        throw new Error(
          "New password cannot be the same as the current password."
        );
      }

      // ==========================
      // Hash New Password
      // ==========================

      existingUser.password = await bcrypt.hash(
        newPassword,
        10
      );

      await existingUser.save();

      // ==========================
      // Response
      // ==========================

      return {
        success: true,

        message: "Password changed successfully.",
      };
    } catch (error) {
      throw error;
    }
  }
}

// ==========================================
// EXPORT SERVICE INSTANCE
// ==========================================

module.exports = new AuthService();