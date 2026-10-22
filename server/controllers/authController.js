const authService = require("../services/authService");

class AuthController {
  /**
   * Register School
   */
  async registerSchool(req, res) {
    try {
      const result = await authService.registerSchool(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * School Login
   */
  async schoolLogin(req, res) {
    try {
      const result = await authService.schoolLogin(req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Verify School Session
   */
  async verifySchool(req, res) {
    try {
      const result = await authService.verifySchool(req.user);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Employee Login
   */
  async employeeLogin(req, res) {
    try {
      const result = await authService.employeeLogin(req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Logout
   */
  async logout(req, res) {
    try {
      const result = await authService.logout();

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword(req, res) {
    try {
      const result = await authService.forgotPassword(req.body);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Change Password
   */
  async changePassword(req, res) {
    try {
      const result = await authService.changePassword(
        req.user,
        req.body
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

// Create controller instance
const authController = new AuthController();

// Export controller methods
module.exports = {
  registerSchool: authController.registerSchool.bind(authController),
  schoolLogin: authController.schoolLogin.bind(authController),
  verifySchool: authController.verifySchool.bind(authController),
  employeeLogin: authController.employeeLogin.bind(authController),
  logout: authController.logout.bind(authController),
  forgotPassword: authController.forgotPassword.bind(authController),
  changePassword: authController.changePassword.bind(authController),
};