const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");

// School Authentication
router.post("/register-school", authController.registerSchool);
router.post("/school-login", authController.schoolLogin);
router.get("/verify-school", authenticate, authController.verifySchool);

// Employee Authentication
router.post("/employee-login", authController.employeeLogin);

// Password Management
router.post("/forgot-password", authController.forgotPassword);
router.post("/change-password", authenticate, authController.changePassword);

// Logout
router.post("/logout", authenticate, authController.logout);

module.exports = router;
