const express = require('express');
const router = express.Router();

const adminDashboardController = require('../controllers/adminDashboardController');

const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');

// Get Dashboard Statistics
router.get(
    '/:academicYearId',
    authenticate,
    authorize("ADMIN"),
    adminDashboardController.getDashboardStats
);

// Get Students Per Class
router.get(
    '/:academicYearId/class-strength',
    authenticate,
    authorize("ADMIN"),
    adminDashboardController.getClassStrength
);

module.exports = router;