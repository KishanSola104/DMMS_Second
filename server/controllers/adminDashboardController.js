const adminDashboardService = require('../services/adminDashboardService');

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
    try {

        const stats = await adminDashboardService.getDashboardStats(req.params.academicYearId,req.user.schoolId);

        res.status(200).json(stats);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get Students Per Class
const getClassStrength = async (req, res) => {
    try {

        const classStrength = await adminDashboardService.getClassStrength(
            req.params.academicYearId
        );

        res.status(200).json(classStrength);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getDashboardStats,
    getClassStrength
};