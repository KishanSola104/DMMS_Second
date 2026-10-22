const userService = require("../services/userService");

const login = async (req, res) => {
    try {

        const data = await userService.login(req.body);

        res.status(200).json({
            success: data.success,
            message: data.message,
            token: data.token,
            user: data.user
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};
 

module.exports = { login };