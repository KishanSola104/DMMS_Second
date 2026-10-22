const Role = require("../models/roleModel");

// Create Role
const addRole = async (roleData) => {
  try {
    const { roleId, roleName } = roleData;

    const existingRole = await Role.findOne({
      $or: [
        { roleId },
        { roleName }
      ],
    });

    if (existingRole) {
      return {
        success: false,
        message: "Role already exists.",
      };
    }

    const role = await Role.create({
      roleId,
      roleName,
    });

    return {
      success: true,
      message: "Role added successfully.",
      role,
    };
  } catch (error) {
    throw error;
  }
};

// Get All Roles
const getAllRole = async () => {
  try {
    const roles = await Role.find().sort({ roleId: 1 });

    return {
      success: true,
      roles,
    };
  } catch (error) {
    throw error;
  }
};

// Get Role By Id
const getRole = async (id) => {
  try {
    const role = await Role.findOne({
      roleId: Number(id),
    });

    if (!role) {
      return {
        success: false,
        message: "Role not found.",
      };
    }

    return {
      success: true,
      role,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRole,
  getAllRole,
  getRole,
};