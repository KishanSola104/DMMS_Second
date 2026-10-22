
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please log in.",
            });
        }

        // Employee routes must not accept school login tokens.
        if (req.user.type !== "employee") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Employee login is required.",
            });
        }

        const userRole = req.user.roleCode || req.user.roleId;

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action.",
            });
        }

        // Employee must be associated with a school.
        if (!req.user.schoolId) {
            return res.status(403).json({
                success: false,
                message: "Your account is not associated with a school.",
            });
        }

        next();
    };
};

module.exports = authorize;
