const roleService = require("../services/roleService");

// Create Role
const addRole = async (req, res) => {
  try {
    const result = await roleService.addRole(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Roles
const getAllRole = async (req, res) => {
  try {
    const result = await roleService.getAllRole();

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 
/* const getAllRole = async (req, res) => {
  console.log("GET ALL ROLE CONTROLLER HIT");

  return res.status(200).json({
    kishan: "controller",
  });
}; */

// Get Role By Id
const getRole = async (req, res) => {
  try {
    const result = await roleService.getRole(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addRole,
  getAllRole,
  getRole,
};